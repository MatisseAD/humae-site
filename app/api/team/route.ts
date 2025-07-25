import { NextRequest, NextResponse } from 'next/server'
import { getTeam, addMember } from '@/lib/teamService'

export async function GET() {
  const team = await getTeam()
  return NextResponse.json(team)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    const newMember = await addMember(body)
    return NextResponse.json(newMember, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
