import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/authTokens'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token) {
    redirect('/admin/login')
  }
  try {
    verifyAdminToken(token)
  } catch {
    redirect('/admin/login')
  }
  return <AdminDashboard />
}
