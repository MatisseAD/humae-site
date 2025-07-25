import crypto from 'crypto'
import { supabase } from './supabaseClient'

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
  const passwordHash = crypto.createHash('sha256').update(user.password).digest('hex')
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
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  const { data, error } = await supabase.from('users').select('*').eq('username', username).eq('passwordHash', hash).single()
  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }
  return data as User | null
}

export async function getUser(id: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
  if (error && error.code !== 'PGRST116') throw new Error(error.message)
  return data as User | null
}
