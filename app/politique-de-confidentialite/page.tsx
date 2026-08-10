import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Politique de confidentialité - Humae',
  description: 'Informations sur les données personnelles traitées par le site Humae.',
  path: '/politique-de-confidentialite',
})

export default function PolitiqueDeConfidentialitePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-bold text-[var(--humae-violet)]">
        Politique de confidentialité
      </h1>
      <p className="mb-10 text-sm text-gray-500">Dernière mise à jour : 9 août 2026</p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="mb-3 text-2xl font-semibold">Responsable du traitement</h2>
          <p>
            HUMAE SARL, 50 rue du Pré Magné, 69126 Brindas. Pour toute question
            relative à vos données, écrivez à{' '}
            <a className="text-[var(--humae-violet)] underline" href="mailto:contact@humae.fr">
              contact@humae.fr
            </a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Données collectées et finalités</h2>
          <p>
            Lorsque vous utilisez le formulaire de contact, nous traitons votre nom,
            votre adresse e-mail, le sujet et le contenu de votre message afin de vous
            répondre. Les espaces réservés utilisent des identifiants de compte et un
            cookie de session strictement nécessaire à leur sécurité.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Destinataires et prestataires</h2>
          <p>
            Les données sont accessibles uniquement aux personnes habilitées chez Humae
            et aux prestataires techniques nécessaires au service : Vercel pour
            l&apos;hébergement, Resend pour l&apos;acheminement des formulaires et Supabase pour
            les données des espaces réservés. Elles ne sont pas vendues.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Durées de conservation</h2>
          <p>
            Les demandes de contact sont conservées au maximum trois ans après le dernier
            échange. Les données de compte sont conservées pendant la durée d&apos;utilisation
            de l&apos;espace réservé, puis supprimées lorsqu&apos;elles ne sont plus nécessaires.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Mesure d&apos;audience</h2>
          <p>
            Vercel Web Analytics et Speed Insights nous fournissent des statistiques
            agrégées et des mesures de performance. Le site n&apos;utilise pas de cookies
            publicitaires ni de cookie tiers destiné à vous suivre sur plusieurs sites.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Vos droits</h2>
          <p>
            Vous pouvez demander l&apos;accès, la rectification, l&apos;effacement, la limitation
            ou la portabilité de vos données, et vous opposer à certains traitements en
            écrivant à contact@humae.fr. Vous pouvez également adresser une réclamation à
            la{' '}
            <a
              className="text-[var(--humae-violet)] underline"
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              CNIL
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}
