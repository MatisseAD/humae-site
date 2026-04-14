import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { authenticate } from '@/lib/userService'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (!username || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const user = await authenticate(username, password)
  if (user) {
    const token = jwt.sign({ userId: user.id }, process.env.ADMIN_JWT_SECRET!, {
      expiresIn: '30d',
    })
    const res = NextResponse.json({ success: true })
    res.cookies.set('userAuth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    return res
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
