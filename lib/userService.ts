import crypto from 'crypto'
import { promisify } from 'util'
import { getSupabase } from './supabaseClient'

const scryptAsync = promisify(crypto.scrypt)

const SCRYPT_KEYLEN = 64
const SEPARATOR = ':'

function safeHexEqual(left: string, right: string): boolean {
  const isHex = (value: string) =>
    value.length > 0 && value.length % 2 === 0 && /^[a-f\d]+$/i.test(value)

  if (!isHex(left) || !isHex(right)) return false

  const leftBuffer = Buffer.from(left, 'hex')
  const rightBuffer = Buffer.from(right, 'hex')

  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  )
}

/** Hash a password with scrypt. Returns "salt:hash" */
async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = (await scryptAsync(password, salt, SCRYPT_KEYLEN)) as Buffer
  return `${salt}${SEPARATOR}${derivedKey.toString('hex')}`
}

/**
 * Verify a password against a stored value.
 * Supports both legacy SHA-256 (plain hex) and new scrypt ("salt:hash") format.
 * Returns the new scrypt hash when the legacy format is detected so callers can
 * trigger a transparent rehash.
 */
async function verifyPassword(
  password: string,
  stored: string
): Promise<{ valid: boolean; needsRehash: boolean; newHash?: string }> {
  if (stored.includes(SEPARATOR)) {
    // New scrypt format
    const parts = stored.split(SEPARATOR)
    if (
      parts.length !== 2 ||
      !/^[a-f\d]{32}$/i.test(parts[0]) ||
      !/^[a-f\d]{128}$/i.test(parts[1])
    ) {
      return { valid: false, needsRehash: false }
    }

    const [salt, hash] = parts
    const derivedKey = (await scryptAsync(password, salt, SCRYPT_KEYLEN)) as Buffer
    const valid = safeHexEqual(hash, derivedKey.toString('hex'))
    return { valid, needsRehash: false }
  } else {
    // Legacy SHA-256 format — compare and schedule rehash on success
    const legacyHash = crypto.createHash('sha256').update(password).digest('hex')
    const valid = safeHexEqual(legacyHash, stored)
    if (valid) {
      const newHash = await hashPassword(password)
      return { valid: true, needsRehash: true, newHash }
    }
    return { valid: false, needsRehash: false }
  }
}

interface UserRecord {
  id: string
  memberId: string
  username: string
  passwordHash: string
}

export type User = Omit<UserRecord, 'passwordHash'>

export async function getUsers(): Promise<User[]> {
  const { data, error } = await getSupabase()
    .from('users')
    .select('id, memberId, username')
    .order('id')
  if (error) throw new Error(error.message)
  return data as User[]
}

export async function addUser(user: Omit<User, 'id'> & { password: string }) {
  const passwordHash = await hashPassword(user.password)
  const { data, error } = await getSupabase().from('users').insert({
    username: user.username,
    memberId: user.memberId,
    passwordHash,
  }).select('id, memberId, username').single()
  if (error) throw new Error(error.message)
  return data as User
}

export async function deleteUser(id: string) {
  const { error } = await getSupabase().from('users').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function authenticate(username: string, password: string): Promise<User | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }

  const user = data as UserRecord
  const { valid, needsRehash, newHash } = await verifyPassword(password, user.passwordHash)

  if (!valid) return null

  // Transparently upgrade legacy SHA-256 hash to scrypt on login
  if (needsRehash && newHash) {
    await supabase.from('users').update({ passwordHash: newHash }).eq('id', user.id)
  }

  return {
    id: user.id,
    memberId: user.memberId,
    username: user.username,
  }
}

export async function getUser(id: string): Promise<User | null> {
  const { data, error } = await getSupabase()
    .from('users')
    .select('id, memberId, username')
    .eq('id', id)
    .single()
  if (error && error.code !== 'PGRST116') throw new Error(error.message)
  return data as User | null
}

