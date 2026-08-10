import type { NextRequest } from 'next/server'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const entries = new Map<string, RateLimitEntry>()
const MAX_TRACKED_KEYS = 10_000

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now()
  const current = entries.get(key)

  if (!current || current.resetAt <= now) {
    if (entries.size >= MAX_TRACKED_KEYS) {
      for (const [storedKey, entry] of entries) {
        if (entry.resetAt <= now) entries.delete(storedKey)
      }
      if (entries.size >= MAX_TRACKED_KEYS) {
        let oldestKey: string | null = null
        let oldestReset = Number.POSITIVE_INFINITY
        for (const [storedKey, entry] of entries) {
          if (entry.resetAt < oldestReset) {
            oldestKey = storedKey
            oldestReset = entry.resetAt
          }
        }
        if (oldestKey) entries.delete(oldestKey)
      }
    }

    entries.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterSeconds: Math.ceil(windowMs / 1000) }
  }

  current.count += 1
  entries.set(key, current)

  return {
    allowed: current.count <= limit,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  }
}

export function resetRateLimit(key: string): void {
  entries.delete(key)
}
