import { NextRequest, NextResponse } from 'next/server'
import {
  updateMember,
  deleteMember,
  getMember,
  getTeam,
  removePreviousMemberImage,
} from '@/lib/teamService'
import { requireAdmin, requireUser } from '@/lib/authGuard'
import { getUser } from '@/lib/userService'
import {
  isOwnedMemberImageUrl,
  memberProfileUpdateSchema,
  teamMemberUpdateSchema,
} from '@/lib/validation'

type RouteParams = {
  params: Promise<{ id: string }>
}

export async function GET(
    req: NextRequest,
    { params }: RouteParams
) {
  const { id } = await params
  const team = await getTeam()
  const member = team.find((m) => m.id === id)

  if (member) {
    return NextResponse.json(member)
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PUT(
    req: NextRequest,
    { params }: RouteParams
) {
  const { id } = await params

  // Admins can update any field; members can only update their own linkedinUrl/imageSrc
  const adminDenied = await requireAdmin()
  const isAdmin = adminDenied === null

  if (!isAdmin) {
    // Not an admin — check if it's the member whose profile this is
    const userIdOrResponse = await requireUser()
    if (userIdOrResponse instanceof NextResponse) {
      // Not authenticated at all
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Authenticated members may only update the team record tied to their account.
    let user
    try {
      user = await getUser(userIdOrResponse)
    } catch (error) {
      console.error('Unable to verify team profile ownership.', error)
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (user.memberId !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json().catch(() => null)
    const parsed = memberProfileUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid profile data' }, { status: 400 })
    }

    if (parsed.data.imageSrc) {
      if (!isOwnedMemberImageUrl(parsed.data.imageSrc, id)) {
        return NextResponse.json({ error: 'Invalid profile image' }, { status: 400 })
      }
    }

    try {
      const previous = await getMember(id)
      if (!previous) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
      }
      const updated = await updateMember(id, parsed.data)

      if (
        parsed.data.imageSrc &&
        previous.imageSrc &&
        previous.imageSrc !== updated.imageSrc
      ) {
        try {
          await removePreviousMemberImage(previous.imageSrc, id)
        } catch (cleanupError) {
          console.error('Unable to remove the previous profile image.', cleanupError)
        }
      }

      return NextResponse.json(updated)
    } catch (err) {
      console.error('Unable to update a member profile.', err)
      return NextResponse.json({ error: 'Unable to update profile' }, { status: 503 })
    }
  }

  const body = await req.json().catch(() => null)
  const parsed = teamMemberUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid member data' }, { status: 400 })
  }

  try {
    const previous = await getMember(id)
    if (!previous) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const updated = await updateMember(id, parsed.data)

    if (
      parsed.data.imageSrc &&
      previous.imageSrc &&
      previous.imageSrc !== updated.imageSrc
    ) {
      try {
        await removePreviousMemberImage(previous.imageSrc, id)
      } catch (cleanupError) {
        console.error('Unable to remove the previous team image.', cleanupError)
      }
    }

    return NextResponse.json(updated)
  } catch (err) {
    console.error('Unable to update a team member.', err)
    return NextResponse.json({ error: 'Unable to update member' }, { status: 503 })
  }
}

export async function DELETE(
    req: NextRequest,
    { params }: RouteParams
) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await params

  try {
    await deleteMember(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unable to delete a team member.', err)
    return NextResponse.json({ error: 'Unable to delete member' }, { status: 503 })
  }
}
