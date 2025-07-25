import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import MemberDashboard from '@/components/MemberDashboard'

export default async function MemberPage() {
  const userId = cookies().get('userAuth')?.value
  if (!userId) redirect('/member/login')
  return <MemberDashboard userId={userId} />
}
