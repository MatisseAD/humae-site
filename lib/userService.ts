import crypto from 'crypto'
import { promisify } from 'util'
import { supabase } from './supabaseClient'

const scryptAsync = promisify(crypto.scrypt)

const SCRYPT_KEYLEN = 64
const SEPARATOR = ':'

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
    const [salt, hash] = stored.split(SEPARATOR)
    const derivedKey = (await scryptAsync(password, salt, SCRYPT_KEYLEN)) as Buffer
    const valid = crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      derivedKey
    )
    return { valid, needsRehash: false }
  } else {
    // Legacy SHA-256 format — compare and schedule rehash on success
    const legacyHash = crypto.createHash('sha256').update(password).digest('hex')
    const valid = crypto.timingSafeEqual(
      Buffer.from(legacyHash, 'hex'),
      Buffer.from(stored, 'hex')
    )
    if (valid) {
      const newHash = await hashPassword(password)
      return { valid: true, needsRehash: true, newHash }
    }
    return { valid: false, needsRehash: false }
  }
}

export interface User {
  id: string
  memberId: string
  username: string
  passwordHash: string
}

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*').order('id')
  if (error) throw new Error(error.message)
  return data as User[]
}

export async function addUser(user: Omit<User, 'id' | 'passwordHash'> & { password: string }) {
  const passwordHash = await hashPassword(user.password)
  const { data, error } = await supabase.from('users').insert({
    username: user.username,
    memberId: user.memberId,
    passwordHash,
  }).select().single()
  if (error) throw new Error(error.message)
  return data as User
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from('users').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function authenticate(username: string, password: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }

  const user = data as User
  const { valid, needsRehash, newHash } = await verifyPassword(password, user.passwordHash)

  if (!valid) return null

  // Transparently upgrade legacy SHA-256 hash to scrypt on login
  if (needsRehash && newHash) {
    await supabase.from('users').update({ passwordHash: newHash }).eq('id', user.id)
  }

  return user
}

export async function getUser(id: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
  if (error && error.code !== 'PGRST116') throw new Error(error.message)
  return data as User | null
}

