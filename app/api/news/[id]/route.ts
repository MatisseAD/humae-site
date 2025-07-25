import { NextRequest, NextResponse } from 'next/server'
import { getNewsItem, updateNews, deleteNews } from '@/lib/newsService'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params
  const item = await getNewsItem(id)
  if (item) return NextResponse.json(item)
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params
  const body = await req.json()
  try {
    const updated = await updateNews(id, body)
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    await deleteNews(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
