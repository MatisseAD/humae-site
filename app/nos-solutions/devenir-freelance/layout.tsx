import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Devenir Freelance - Humae',
  description: 'Lancez votre carrière de freelance en toute sérénité. Humae vous guide dans le choix de votre statut et l’optimisation de vos revenus.',
  path: '/nos-solutions/devenir-freelance',
})

export default function FreelanceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
