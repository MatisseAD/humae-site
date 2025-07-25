import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'

export default function AdminPage() {
  const auth = cookies().get('adminAuth')?.value
  if (!auth) {
    redirect('/admin/login')
  }
  return <AdminDashboard />
}
