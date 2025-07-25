import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  const { file, filename, folder = 'team' } = await req.json()
  if (!file || !filename) {
    return NextResponse.json({ error: 'No file' }, { status: 400 })
  }
  const data = file.split(',')[1]
  const buffer = Buffer.from(data, 'base64')
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)
  await fs.mkdir(uploadDir, { recursive: true })
  const filePath = path.join(uploadDir, filename)
  await fs.writeFile(filePath, buffer)
  const publicPath = `/uploads/${folder}/${filename}`
  return NextResponse.json({ path: publicPath })
}
