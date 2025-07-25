import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/lib/userService'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  const user = await authenticate(username, password)
  if (user) {
    const res = NextResponse.json({ success: true })
    res.cookies.set('userAuth', user.id, { httpOnly: true })
    return res
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
