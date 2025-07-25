import { NextRequest, NextResponse } from 'next/server'
import { getNews, addNews } from '@/lib/newsService'

export async function GET() {
  const news = await getNews()
  return NextResponse.json(news)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    const newItem = await addNews(body)
    return NextResponse.json(newItem, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
