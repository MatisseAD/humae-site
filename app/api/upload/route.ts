import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import sharp from 'sharp'
import { getSupabase } from '@/lib/supabaseClient'
import { requireAdmin, requireUser } from '@/lib/authGuard'
import { getUser } from '@/lib/userService'
import { consumeRateLimit, getClientIp } from '@/lib/rateLimit'

const ALLOWED_FOLDERS = ['team', 'news']
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
// Base64 adds ~33%; 3 MiB stays below Vercel's 4.5 MB request-body limit.
const MAX_FILE_SIZE = 3 * 1024 * 1024
const MAX_BASE64_LENGTH = Math.ceil(MAX_FILE_SIZE / 3) * 4 + 16
const UPLOAD_WINDOW_MS = 24 * 60 * 60 * 1000

function hasValidSignature(buffer: Buffer, mimeType: string): boolean {
  if (mimeType === 'image/jpeg') {
    return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  }
  if (mimeType === 'image/png') {
    return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  }
  if (mimeType === 'image/gif') {
    const signature = buffer.subarray(0, 6).toString('ascii')
    return signature === 'GIF87a' || signature === 'GIF89a'
  }
  if (mimeType === 'image/webp') {
    return (
      buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP'
    )
  }
  return false
}

function uniqueFilename(): string {
  return `${crypto.randomUUID()}.webp`
}

async function cleanImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer, {
    animated: false,
    failOn: 'error',
    limitInputPixels: 25_000_000,
  })
    .rotate()
    .resize({
      width: 2400,
      height: 2400,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 84 })
    .toBuffer()
}

export async function POST(req: NextRequest) {
  const adminDenied = await requireAdmin()
  const isAdmin = adminDenied === null

  let authenticatedMemberId: string | null = null
  if (!isAdmin) {
    const userIdOrResponse = await requireUser()
    if (userIdOrResponse instanceof NextResponse) return userIdOrResponse

    try {
      const user = await getUser(userIdOrResponse)
      if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      authenticatedMemberId = user.memberId
    } catch (error) {
      console.error('Unable to verify upload ownership.', error)
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }
  }

  const uploadLimit = consumeRateLimit(
    `upload:${isAdmin ? `admin:${getClientIp(req)}` : `member:${authenticatedMemberId}`}`,
    isAdmin ? 50 : 5,
    UPLOAD_WINDOW_MS
  )
  if (!uploadLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many uploads' },
      {
        status: 429,
        headers: { 'Retry-After': String(uploadLimit.retryAfterSeconds) },
      }
    )
  }

  const body = await req.json().catch(() => null)
  const { file, folder = 'team', memberId } = body || {}

  if (!file || typeof file !== 'string') {
    return NextResponse.json({ error: 'No file' }, { status: 400 })
  }

  // Validate folder
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: 400 })
  }

  if (!isAdmin && (folder !== 'team' || memberId !== authenticatedMemberId)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
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

  if (base64Data.length > MAX_BASE64_LENGTH) {
    return NextResponse.json({ error: 'File too large (max 3 MB)' }, { status: 400 })
  }

  const buffer = Buffer.from(base64Data, 'base64')

  // Validate file size
  if (buffer.byteLength > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large (max 3 MB)' }, { status: 400 })
  }

  if (!hasValidSignature(buffer, mimeType)) {
    return NextResponse.json({ error: 'File content does not match its image type' }, { status: 400 })
  }

  let cleanBuffer: Buffer
  try {
    cleanBuffer = await cleanImage(buffer)
  } catch {
    return NextResponse.json({ error: 'Invalid or excessively large image' }, { status: 400 })
  }

  const safeName = uniqueFilename()
  const storagePath = !isAdmin && authenticatedMemberId
    ? `team/${authenticatedMemberId}/${safeName}`
    : `${folder}/${safeName}`

  let supabase
  try {
    supabase = getSupabase()
  } catch (error) {
    console.error('Upload storage is not configured.', error)
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const storage = supabase.storage.from('uploads')
  const { error } = await storage.upload(
    storagePath,
    cleanBuffer,
    { upsert: false, contentType: 'image/webp' }
  )

  if (error) {
    console.error('Unable to upload image.', error)
    return NextResponse.json({ error: 'Unable to upload image' }, { status: 503 })
  }

  const { data: publicData } = storage.getPublicUrl(storagePath)
  return NextResponse.json({ path: publicData.publicUrl })
}
