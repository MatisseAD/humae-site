import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'MEG - Mon Expert en Gestion - Humae',
  description: 'Gérez vos devis, factures, notes de frais et votre trésorerie avec MEG, l’outil de gestion connecté à votre expert-comptable Humae.',
  path: '/le-cabinet/nos-outils/meg-gestion',
})

export default function MegLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
