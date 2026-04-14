import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { supabase } from '@/lib/supabaseClient'
import { requireAdmin } from '@/lib/authGuard'

const ALLOWED_FOLDERS = ['team', 'news']
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

/** Strip path traversal and non-alphanumeric characters from a filename */
function sanitizeFilename(name: string): string {
  const base = path.basename(name)
  return base.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase()
}

/** Generate a unique filename to avoid collisions and prevent overwrite-based attacks */
function uniqueFilename(original: string): string {
  const ext = path.extname(original)
  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 8)
  return `${timestamp}-${random}${ext}`
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { file, filename, folder = 'team' } = await req.json()

  if (!file || !filename || typeof file !== 'string' || typeof filename !== 'string') {
    return NextResponse.json({ error: 'No file' }, { status: 400 })
  }

  // Validate folder
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: 400 })
  }

  // Decode base64 data URL
  const match = file.match(/^data:([a-zA-Z0-9+/]+\/[a-zA-Z0-9+/]+);base64,(.+)$/)
  if (!match) {
    return NextResponse.json({ error: 'Invalid file format' }, { status: 400 })
  }
  const mimeType = match[1]
  const base64Data = match[2]

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
  }

  const buffer = Buffer.from(base64Data, 'base64')

  // Validate file size
  if (buffer.byteLength > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large (max 5 MB)' }, { status: 400 })
  }

  const safeName = uniqueFilename(sanitizeFilename(filename))
  const storagePath = `${folder}/${safeName}`

  const { error } = await supabase.storage.from('uploads').upload(storagePath, buffer, {
    upsert: false,
    contentType: mimeType,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  const { data: publicData } = supabase.storage.from('uploads').getPublicUrl(storagePath)
  return NextResponse.json({ path: publicData.publicUrl })
}
