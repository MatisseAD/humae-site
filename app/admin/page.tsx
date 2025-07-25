import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'
import jwt from 'jsonwebtoken'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('adminAuth')?.value
  if (!token) {
    redirect('/admin/login')
  }
  try {
    jwt.verify(token, process.env.ADMIN_JWT_SECRET!)
  } catch {
    redirect('/admin/login')
  }
  return <AdminDashboard />
}
