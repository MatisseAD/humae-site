import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/lib/userService'
import {
  AuthConfigurationError,
  MEMBER_COOKIE_NAME,
  signMemberToken,
} from '@/lib/authTokens'
import { consumeRateLimit, getClientIp, resetRateLimit } from '@/lib/rateLimit'

const LOGIN_WINDOW_MS = 15 * 60 * 1000
const LOGIN_ATTEMPTS = 10
const GLOBAL_LOGIN_ATTEMPTS = 40

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req)
  const globalKey = `member-login-ip:${clientIp}`
  const globalLimit = consumeRateLimit(globalKey, GLOBAL_LOGIN_ATTEMPTS, LOGIN_WINDOW_MS)

  if (!globalLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts' },
      {
        status: 429,
        headers: { 'Retry-After': String(globalLimit.retryAfterSeconds) },
      }
    )
  }

  const body = await req.json().catch(() => null)
  const username = body?.username
  const password = body?.password
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    username.length < 2 ||
    username.length > 100 ||
    password.length < 8 ||
    password.length > 256
  ) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const normalizedUsername = username.trim()
  const accountKey = `member-login-account:${clientIp}:${normalizedUsername.toLocaleLowerCase('fr')}`
  const accountLimit = consumeRateLimit(accountKey, LOGIN_ATTEMPTS, LOGIN_WINDOW_MS)
  if (!accountLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts' },
      {
        status: 429,
        headers: { 'Retry-After': String(accountLimit.retryAfterSeconds) },
      }
    )
  }

  try {
    const user = await authenticate(normalizedUsername, password)
    if (user) {
      const token = signMemberToken(user.id)
      resetRateLimit(accountKey)

      const res = NextResponse.json({ success: true })
      res.cookies.set(MEMBER_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      res.headers.set('Cache-Control', 'no-store')
      return res
    }
  } catch (error) {
    if (error instanceof AuthConfigurationError) {
      console.error(error.message)
    } else {
      console.error('Member login failed because a dependency is unavailable.', error)
    }
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
