import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Nos Solutions - Humae',
  description: "Découvrez nos solutions complètes pour la création d'entreprise, la gestion comptable, le statut de freelance et la gestion sociale.",
  path: '/nos-solutions',
})

export default function SolutionsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
