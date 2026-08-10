import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import MemberDashboard from '@/components/MemberDashboard'
import { MEMBER_COOKIE_NAME, verifyMemberToken } from '@/lib/authTokens'

export default async function MemberPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(MEMBER_COOKIE_NAME)?.value

  if (!token) redirect('/member/login')

  let userId: string
  try {
    const payload = verifyMemberToken(token)
    userId = payload.userId
  } catch {
    redirect('/member/login')
  }

  return <MemberDashboard userId={userId} />
}
