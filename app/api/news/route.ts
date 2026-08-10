import { NextRequest, NextResponse } from 'next/server'
import { getNews, addNews } from '@/lib/newsService'
import { requireAdmin } from '@/lib/authGuard'
import { newsSchema } from '@/lib/validation'

export async function GET() {
  const news = await getNews()
  return NextResponse.json(news)
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const parsed = newsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid news data' }, { status: 400 })
  }

  try {
    const newItem = await addNews(parsed.data)
    return NextResponse.json(newItem, { status: 201 })
  } catch (err) {
    console.error('Unable to add news.', err)
    return NextResponse.json({ error: 'Unable to save news' }, { status: 503 })
  }
}
