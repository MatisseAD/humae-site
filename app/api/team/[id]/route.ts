import { NextRequest, NextResponse } from 'next/server'
import { updateMember, deleteMember, getTeam } from '@/lib/teamService'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  try {
    const updated = await updateMember(params.id, body)
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteMember(params.id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const team = await getTeam()
  const member = team.find(m => m.id === params.id)
  if (member) return NextResponse.json(member)
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
