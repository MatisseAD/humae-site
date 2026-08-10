import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Espace membre - Humae',
  description: 'Espace membre privé de Humae.',
  path: '/member',
  noIndex: true,
})

export default function MemberLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
