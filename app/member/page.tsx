import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import MemberDashboard from '@/components/MemberDashboard'
import jwt from 'jsonwebtoken'

export default async function MemberPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('userAuth')?.value

  if (!token) redirect('/member/login')

  let userId: string
  try {
    const payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET!) as { userId: string }
    userId = payload.userId
  } catch {
    redirect('/member/login')
  }

  return <MemberDashboard userId={userId} />
}
