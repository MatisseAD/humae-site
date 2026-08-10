import { NextRequest, NextResponse } from 'next/server'
import { getNewsItem, updateNews, deleteNews } from '@/lib/newsService'
import { requireAdmin } from '@/lib/authGuard'
import { newsUpdateSchema } from '@/lib/validation'

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
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await params
  const body = await req.json().catch(() => null)
  const parsed = newsUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid news data' }, { status: 400 })
  }
  try {
    const updated = await updateNews(id, parsed.data)
    return NextResponse.json(updated)
  } catch (err) {
    console.error('Unable to update news.', err)
    return NextResponse.json({ error: 'Unable to update news' }, { status: 503 })
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await params
  try {
    await deleteNews(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unable to delete news.', err)
    return NextResponse.json({ error: 'Unable to delete news' }, { status: 503 })
  }
}
