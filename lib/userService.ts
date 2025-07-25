import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

const dataFile = path.join(process.cwd(), 'lib', 'userData.json')

export interface User {
  id: string
  memberId: string
  username: string
  passwordHash: string
}

async function readData(): Promise<User[]> {
  try {
    const data = await fs.readFile(dataFile, 'utf-8')
    return JSON.parse(data) as User[]
  } catch {
    return []
  }
}

async function writeData(data: User[]) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2))
}

export async function getUsers(): Promise<User[]> {
  return readData()
}

export async function addUser(user: Omit<User, 'id' | 'passwordHash'> & { password: string }) {
  const data = await readData()
  const passwordHash = crypto.createHash('sha256').update(user.password).digest('hex')
  const newUser: User = { id: crypto.randomUUID(), username: user.username, memberId: user.memberId, passwordHash }
  data.push(newUser)
  await writeData(data)
  return newUser
}

export async function deleteUser(id: string) {
  const data = await readData()
  await writeData(data.filter(u => u.id !== id))
}

export async function authenticate(username: string, password: string): Promise<User | null> {
  const data = await readData()
  const user = data.find(u => u.username === username)
  if (!user) return null
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  if (hash === user.passwordHash) return user
  return null
}

export async function getUser(id: string): Promise<User | null> {
  const data = await readData()
  return data.find(u => u.id === id) || null
}
