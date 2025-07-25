import { NextRequest, NextResponse } from 'next/server'
import { getUsers, addUser } from '@/lib/userService'

export async function GET() {
  const users = await getUsers()
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const { username, password, memberId } = await req.json()
  if (!username || !password || !memberId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const newUser = await addUser({ username, password, memberId })
  return NextResponse.json(newUser, { status: 201 })
}
