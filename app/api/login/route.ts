import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password === 'Humae2017*') {
    const res = NextResponse.json({ success: true })
    res.cookies.set('adminAuth', 'true', { httpOnly: true })
    return res
  }
  return NextResponse.json({ success: false }, { status: 401 })
}
