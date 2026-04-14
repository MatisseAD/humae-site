import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
  if (password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, process.env.ADMIN_JWT_SECRET!, {
      expiresIn: '7d',
    })
    const res = NextResponse.json({ success: true })
    res.cookies.set('adminAuth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return res
  }
  return NextResponse.json({ success: false }, { status: 401 })
}
