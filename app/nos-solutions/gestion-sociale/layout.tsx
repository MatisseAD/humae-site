import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Gestion Sociale & Paie - Humae',
  description: "Simplifiez la gestion de vos salariés, de l'embauche à la paie. Humae sécurise vos obligations sociales et vous fait gagner du temps.",
  path: '/nos-solutions/gestion-sociale',
})

export default function GestionSocialeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
