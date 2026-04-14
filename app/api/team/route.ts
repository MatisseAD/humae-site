import { NextRequest, NextResponse } from 'next/server'
import { getTeam, addMember } from '@/lib/teamService'
import { requireAdmin } from '@/lib/authGuard'

export async function GET() {
  const team = await getTeam()
  return NextResponse.json(team)
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await req.json()
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 1) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }
  if (!body.role || typeof body.role !== 'string' || body.role.trim().length < 1) {
    return NextResponse.json({ error: 'role is required' }, { status: 400 })
  }

  try {
    const newMember = await addMember({ ...body, name: body.name.trim(), role: body.role.trim() })
    return NextResponse.json(newMember, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
