import { NextRequest, NextResponse } from 'next/server'
import { updateMember, deleteMember, getTeam } from '@/lib/teamService'
import { requireAdmin, requireUser } from '@/lib/authGuard'

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
  const userIdOrResponse = await requireUser()
  const isAdmin = !(userIdOrResponse instanceof NextResponse)
  if (!isAdmin) {
    const denied = await requireAdmin()
    if (denied) return denied
  }

  const body = await req.json()

  // Non-admin members may only mutate linkedinUrl and imageSrc of their own record
  if (!isAdmin) {
    const allowed: Record<string, unknown> = {}
    if ('linkedinUrl' in body) allowed.linkedinUrl = body.linkedinUrl
    if ('imageSrc' in body) allowed.imageSrc = body.imageSrc
    try {
      const updated = await updateMember(id, allowed)
      return NextResponse.json(updated)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal error'
      return NextResponse.json({ error: message }, { status: 400 })
    }
  }

  try {
    const updated = await updateMember(id, body)
    return NextResponse.json(updated)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 400 })
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
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
