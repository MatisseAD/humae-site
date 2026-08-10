import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Gestion de Patrimoine - Selenita Patrimoine par Humae',
  description: 'Construisez, valorisez et transmettez votre patrimoine. Des stratégies sur mesure pour votre avenir financier.',
  path: '/nos-solutions/gestion-patrimoine',
})

export default function GestionPatrimoineLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
