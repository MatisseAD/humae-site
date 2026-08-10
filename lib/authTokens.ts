import 'server-only'

import jwt, { type JwtPayload } from 'jsonwebtoken'

const JWT_ISSUER = 'humae.fr'
const ADMIN_AUDIENCE = 'humae-admin'
const MEMBER_AUDIENCE = 'humae-member'

export const ADMIN_COOKIE_NAME = 'adminAuth'
export const MEMBER_COOKIE_NAME = 'userAuth'

export class AuthConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthConfigurationError'
  }
}

function getSecret(name: 'ADMIN_JWT_SECRET' | 'MEMBER_JWT_SECRET'): string {
  const value = process.env[name]

  if (!value || value.length < 32) {
    throw new AuthConfigurationError(`${name} must contain at least 32 characters`)
  }

  return value
}

function isPayload(value: string | JwtPayload): value is JwtPayload {
  return typeof value !== 'string'
}

export function signAdminToken(): string {
  return jwt.sign({ role: 'admin' }, getSecret('ADMIN_JWT_SECRET'), {
    algorithm: 'HS256',
    audience: ADMIN_AUDIENCE,
    expiresIn: '7d',
    issuer: JWT_ISSUER,
  })
}

export function verifyAdminToken(token: string): JwtPayload {
  const payload = jwt.verify(token, getSecret('ADMIN_JWT_SECRET'), {
    algorithms: ['HS256'],
    audience: ADMIN_AUDIENCE,
    issuer: JWT_ISSUER,
  })

  if (!isPayload(payload) || payload.role !== 'admin') {
    throw new Error('Invalid admin token')
  }

  return payload
}

export function signMemberToken(userId: string): string {
  return jwt.sign({ role: 'member', userId }, getSecret('MEMBER_JWT_SECRET'), {
    algorithm: 'HS256',
    audience: MEMBER_AUDIENCE,
    expiresIn: '7d',
    issuer: JWT_ISSUER,
  })
}

export function verifyMemberToken(token: string): JwtPayload & { userId: string } {
  const payload = jwt.verify(token, getSecret('MEMBER_JWT_SECRET'), {
    algorithms: ['HS256'],
    audience: MEMBER_AUDIENCE,
    issuer: JWT_ISSUER,
  })

  if (
    !isPayload(payload) ||
    payload.role !== 'member' ||
    typeof payload.userId !== 'string' ||
    payload.userId.length === 0
  ) {
    throw new Error('Invalid member token')
  }

  return payload as JwtPayload & { userId: string }
}
