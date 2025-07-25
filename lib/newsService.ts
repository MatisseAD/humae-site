import crypto from "crypto"
import { promises as fs } from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'lib', 'newsData.json')

export interface NewsItem {
  id: string
  title: string
  subject: string
  content: string
  imageSrc: string
}

async function readData(): Promise<NewsItem[]> {
  try {
    const data = await fs.readFile(dataFile, 'utf-8')
    return JSON.parse(data) as NewsItem[]
  } catch {
    return []
  }
}

async function writeData(data: NewsItem[]) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2))
}

export async function getNews(): Promise<NewsItem[]> {
  return readData()
}

export async function getNewsItem(id: string): Promise<NewsItem | null> {
  const data = await readData()
  return data.find(n => n.id === id) || null
}

export async function addNews(item: Omit<NewsItem, 'id'>) {
  const data = await readData()
  const newItem: NewsItem = { id: crypto.randomUUID(), ...item }
  data.push(newItem)
  await writeData(data)
  return newItem
}

export async function updateNews(id: string, updates: Partial<Omit<NewsItem, 'id'>>) {
  const data = await readData()
  const index = data.findIndex(n => n.id === id)
  if (index === -1) throw new Error('News not found')
  data[index] = { ...data[index], ...updates }
  await writeData(data)
  return data[index]
}

export async function deleteNews(id: string) {
  const data = await readData()
  await writeData(data.filter(n => n.id !== id))
}
