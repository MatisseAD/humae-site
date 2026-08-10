import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Gestion Comptable & Fiscale - Humae',
  description: 'Confiez votre comptabilité et vos déclarations fiscales à Humae et concentrez-vous sur la croissance de votre entreprise.',
  path: '/nos-solutions/gestion-comptable',
})

export default function GestionComptableLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
