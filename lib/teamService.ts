import { promises as fs } from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'lib', 'teamData.json')

export interface TeamMember {
  id: string
  name: string
  role: string
  imageSrc: string
  linkedinUrl?: string
}

async function readData(): Promise<TeamMember[]> {
  try {
    const data = await fs.readFile(dataFile, 'utf-8')
    return JSON.parse(data) as TeamMember[]
  } catch (err) {
    return []
  }
}

async function writeData(data: TeamMember[]) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2))
}

export async function getTeam(): Promise<TeamMember[]> {
  return readData()
}

export async function addMember(member: Omit<TeamMember, 'id'>) {
  const data = await readData()
  const newMember: TeamMember = { id: crypto.randomUUID(), ...member }
  data.push(newMember)
  await writeData(data)
  return newMember
}

export async function updateMember(id: string, updates: Partial<Omit<TeamMember, 'id'>>) {
  const data = await readData()
  const index = data.findIndex(m => m.id === id)
  if (index === -1) throw new Error('Member not found')
  data[index] = { ...data[index], ...updates }
  await writeData(data)
  return data[index]
}

export async function deleteMember(id: string) {
  const data = await readData()
  const filtered = data.filter(m => m.id !== id)
  await writeData(filtered)
}
