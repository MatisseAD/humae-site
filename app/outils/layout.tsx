import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Outils et simulateurs - Humae',
  description: 'Les outils et simulateurs Humae sont en cours de préparation.',
  path: '/outils',
  noIndex: true,
})

export default function OutilsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
