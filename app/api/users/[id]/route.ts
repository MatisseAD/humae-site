import { NextRequest, NextResponse } from 'next/server'
import { deleteUser, getUser } from '@/lib/userService'

type RouteParams = {
  params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const user = await getUser(id)
  if (user) {
    return NextResponse.json(user)
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { id } = await params
  await deleteUser(id)
  return NextResponse.json({ success: true })
}
