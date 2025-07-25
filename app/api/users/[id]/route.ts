import { NextResponse } from 'next/server'
import { deleteUser, getUser } from '@/lib/userService'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await getUser(params.id)
  if (user) return NextResponse.json(user)
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteUser(params.id)
  return NextResponse.json({ success: true })
}
