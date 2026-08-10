import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Administration - Humae',
  description: 'Espace d’administration privé de Humae.',
  path: '/admin',
  noIndex: true,
})

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
