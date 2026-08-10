import { NextRequest, NextResponse } from 'next/server'
import { getTeam, addMember } from '@/lib/teamService'
import { requireAdmin } from '@/lib/authGuard'
import { teamMemberSchema } from '@/lib/validation'

export async function GET() {
  const team = await getTeam()
  return NextResponse.json(team)
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await req.json().catch(() => null)
  const parsed = teamMemberSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid member data' }, { status: 400 })
  }

  try {
    const newMember = await addMember(parsed.data)
    return NextResponse.json(newMember, { status: 201 })
  } catch (err) {
    console.error('Unable to add a team member.', err)
    return NextResponse.json({ error: 'Unable to save member' }, { status: 503 })
  }
}
