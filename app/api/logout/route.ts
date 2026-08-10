import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, MEMBER_COOKIE_NAME } from '@/lib/authTokens'

export async function POST() {
  const response = NextResponse.json({ success: true })
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 0,
  }

  response.cookies.set(ADMIN_COOKIE_NAME, '', cookieOptions)
  response.cookies.set(MEMBER_COOKIE_NAME, '', cookieOptions)
  response.headers.set('Cache-Control', 'no-store')
  return response
}
