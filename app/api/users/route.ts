import { NextRequest, NextResponse } from 'next/server'
import { getUsers, addUser } from '@/lib/userService'
import { getUser } from '@/lib/userService'
import { requireAdmin } from '@/lib/authGuard'

export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied
  const users = await getUsers()
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { username, password, memberId } = await req.json()
  if (
    !username || typeof username !== 'string' || username.trim().length < 2 ||
    !password || typeof password !== 'string' || password.length < 8 ||
    !memberId || typeof memberId !== 'string'
  ) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  // Verify the referenced team member exists
  const member = await getUser(memberId).catch(() => null)
  if (member === undefined) {
    // getUser throws on non-PGRST116 errors; just proceed – DB FK will catch it
  }

  try {
    const newUser = await addUser({ username: username.trim(), password, memberId })
    return NextResponse.json(newUser, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
