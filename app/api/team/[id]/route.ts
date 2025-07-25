import { NextRequest, NextResponse } from 'next/server'
import { updateMember, deleteMember, getTeam } from '@/lib/teamService'

// now params is a Promise
type RouteParams = {
  params: Promise<{ id: string }>
}

export async function PUT(
    req: NextRequest,
    { params }: RouteParams
) {
  const { id } = await params
  const body = await req.json()

  try {
    const updated = await updateMember(id, body)
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(
    req: NextRequest,
    { params }: RouteParams
) {
  const { id } = await params

  try {
    await deleteMember(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function GET(
    req: NextRequest,
    { params }: RouteParams
) {
  const { id } = await params
  const team = await getTeam()
  const member = team.find((m) => m.id === id)

  if (member) {
    return NextResponse.json(member)
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
