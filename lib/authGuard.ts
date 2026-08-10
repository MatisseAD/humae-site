import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  ADMIN_COOKIE_NAME,
  MEMBER_COOKIE_NAME,
  verifyAdminToken,
  verifyMemberToken,
} from './authTokens'

/**
 * Verifies the adminAuth cookie and returns null when valid.
 * Returns a 401 NextResponse when the token is missing or invalid.
 * Usage in route handlers:
 *   const denied = await requireAdmin()
 *   if (denied) return denied
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    verifyAdminToken(token)
    return null
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

/**
 * Verifies the userAuth cookie (signed JWT carrying { userId }).
 * Returns the userId string when valid, or a 401 NextResponse.
 */
export async function requireUser(): Promise<string | NextResponse> {
  const cookieStore = await cookies()
  const token = cookieStore.get(MEMBER_COOKIE_NAME)?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const payload = verifyMemberToken(token)
    return payload.userId
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
