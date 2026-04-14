import { NextRequest, NextResponse } from 'next/server'
import { getNews, addNews } from '@/lib/newsService'
import { requireAdmin } from '@/lib/authGuard'

export async function GET() {
  const news = await getNews()
  return NextResponse.json(news)
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await req.json()
  if (!body.title || typeof body.title !== 'string' || body.title.trim().length < 1) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }
  if (!body.content || typeof body.content !== 'string' || body.content.trim().length < 1) {
    return NextResponse.json({ error: 'content is required' }, { status: 400 })
  }

  try {
    const newItem = await addNews({ ...body, title: body.title.trim(), content: body.content.trim() })
    return NextResponse.json(newItem, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
