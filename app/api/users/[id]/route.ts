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

  const user = await getUser(id)
  if (user) return NextResponse.json(user)
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await params
  try {
    await deleteUser(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
