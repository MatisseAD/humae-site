import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import {
  ADMIN_COOKIE_NAME,
  AuthConfigurationError,
  signAdminToken,
} from '@/lib/authTokens'
import { consumeRateLimit, getClientIp, resetRateLimit } from '@/lib/rateLimit'

const LOGIN_WINDOW_MS = 15 * 60 * 1000
const LOGIN_ATTEMPTS = 5

function passwordsMatch(input: string, expected: string): boolean {
  const inputDigest = crypto.createHash('sha256').update(input).digest()
  const expectedDigest = crypto.createHash('sha256').update(expected).digest()
  return crypto.timingSafeEqual(inputDigest, expectedDigest)
}

export async function POST(req: NextRequest) {
  const key = `admin-login:${getClientIp(req)}`
  const limit = consumeRateLimit(key, LOGIN_ATTEMPTS, LOGIN_WINDOW_MS)

  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      }
    )
  }

  const body = await req.json().catch(() => null)
  const password = body?.password
  const adminPassword = process.env.ADMIN_PASSWORD

  if (
    !adminPassword ||
    adminPassword.length < 12 ||
    typeof password !== 'string' ||
    password.length > 256
  ) {
    return NextResponse.json({ success: false }, { status: adminPassword ? 400 : 503 })
  }

  if (passwordsMatch(password, adminPassword)) {
    try {
      const token = signAdminToken()
      resetRateLimit(key)

      const res = NextResponse.json({ success: true })
      res.cookies.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      res.headers.set('Cache-Control', 'no-store')
      return res
    } catch (error) {
      if (error instanceof AuthConfigurationError) {
        console.error(error.message)
        return NextResponse.json({ success: false }, { status: 503 })
      }
      throw error
    }
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
