import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Créer mon Entreprise - Humae',
  description: "De l'idée à l'immatriculation, Humae vous accompagne pour lancer votre projet sur des bases solides et pérennes.",
  path: '/nos-solutions/creation-entreprise',
})

export default function CreationEntrepriseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
