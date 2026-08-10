import { NextRequest, NextResponse } from 'next/server'
import { getUsers, addUser } from '@/lib/userService'
import { requireAdmin } from '@/lib/authGuard'

export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const users = await getUsers()
    return NextResponse.json(users, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Unable to load users.', error)
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const { username, password, memberId } = body || {}
  if (
    !username || typeof username !== 'string' || username.trim().length < 2 || username.length > 100 ||
    !password || typeof password !== 'string' || password.length < 12 || password.length > 256 ||
    !memberId || typeof memberId !== 'string' || memberId.length > 100
  ) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  try {
    const newUser = await addUser({ username: username.trim(), password, memberId })
    return NextResponse.json(newUser, { status: 201 })
  } catch (err) {
    console.error('Unable to create a member account.', err)
    return NextResponse.json({ error: 'Unable to create account' }, { status: 503 })
  }
}
