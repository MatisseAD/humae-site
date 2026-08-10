import { NextRequest, NextResponse } from 'next/server'
import { deleteUser, getUser } from '@/lib/userService'
import { requireAdmin, requireUser } from '@/lib/authGuard'

type RouteParams = {
  params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  // Allow the authenticated member to fetch their own record, or an admin to fetch any
  const { id } = await params

  const userIdOrResponse = await requireUser()
  if (userIdOrResponse instanceof NextResponse) {
    // Not a logged-in member; check for admin
    const denied = await requireAdmin()
    if (denied) return denied
  } else {
    // Logged-in member may only fetch their own user record
    if (userIdOrResponse !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  try {
    const user = await getUser(id)
    if (user) {
      return NextResponse.json(user, { headers: { 'Cache-Control': 'no-store' } })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  } catch (error) {
    console.error('Unable to load a member account.', error)
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await params
  try {
    await deleteUser(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unable to delete a member account.', err)
    return NextResponse.json({ error: 'Unable to delete account' }, { status: 503 })
  }
}
