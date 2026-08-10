import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Nos Valeurs - Le Cabinet Humae',
  description: 'Découvrez les valeurs qui animent notre cabinet au quotidien : Équilibre, Proximité et Clarté.',
  path: '/le-cabinet/nos-valeurs',
})

export default function ValeursLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
