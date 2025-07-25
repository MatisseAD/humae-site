import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  const { file, filename, folder = 'team' } = await req.json()
  if (!file || !filename) {
    return NextResponse.json({ error: 'No file' }, { status: 400 })
  }
  const data = file.split(',')[1]
  const buffer = Buffer.from(data, 'base64')
  const path = `${folder}/${filename}`
  const { error } = await supabase.storage.from('uploads').upload(path, buffer, {
    upsert: true,
    contentType: 'image/jpeg'
  })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  const { data: publicData } = supabase.storage.from('uploads').getPublicUrl(path)
  return NextResponse.json({ path: publicData.publicUrl })
}
