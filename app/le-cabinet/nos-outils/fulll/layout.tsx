import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Fulll.io - Votre Outil de Pilotage - Humae',
  description: 'Découvrez Fulll, l’outil tout-en-un pour gérer vos factures, vos dépenses et piloter votre activité en temps réel, en collaboration avec votre expert Humae.',
  path: '/le-cabinet/nos-outils/fulll',
})

export default function FulllLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
