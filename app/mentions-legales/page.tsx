// app/mentions-legales/page.tsx

import Link from 'next/link';
import { createPageMetadata } from '@/lib/siteMetadata';

export const metadata = createPageMetadata({
    title: 'Mentions Légales - Humae',
    description: 'Consultez les mentions légales du site Humae, cabinet d\'expertise comptable.',
    path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <h1 className="text-4xl font-bold text-[var(--humae-violet)] mb-2">Mentions Légales</h1>
            <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : 9 août 2026</p>

            <div className="space-y-8 text-gray-700">

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">1. Éditeur du Site</h2>
                    <p>
                        <strong>HUMAE SARL</strong><br />
                        Société à responsabilité limitée immatriculée au RCS de Lyon sous le n° 828 403 741 (SIRET 828 403 741 00014), au capital de 8 000 euros.
                    </p>
                    <ul className="mt-4 space-y-1 list-inside">
                        <li><strong>Siège social :</strong> 50 rue du Pré Magné, 69126 BRINDAS</li>
                        <li><strong>Responsable de la publication :</strong> Céline MONIN</li>
                        <li><strong>Téléphone :</strong> <a href="tel:+33472492190" className="text-[var(--humae-violet)] hover:underline">04 72 49 21 90</a></li>
                        <li><strong>Email :</strong> <a href="mailto:contact@humae.fr" className="text-[var(--humae-violet)] hover:underline">contact@humae.fr</a></li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">2. Hébergement du Site</h2>
                    <p>
                        Ce site est hébergé par :<br />
                        <strong>Vercel Inc.</strong><br />
                        Plateforme d&apos;hébergement et de diffusion du site.
                    </p>
                    <ul className="mt-4 space-y-1 list-inside">
                        <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
                        <li><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--humae-violet)] hover:underline">vercel.com</a></li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">3. Protection des Données Personnelles</h2>
                    <p>
                        Dans le cadre de l&apos;utilisation du site, notamment via notre formulaire de contact ou notre simulateur, nous pouvons collecter des données personnelles vous concernant (nom, prénom, adresse e-mail, numéro de téléphone, etc.). Ces données sont collectées sur la base de votre consentement afin de répondre à vos demandes.
                    </p>
                    <p className="mt-4">
                        Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi &quot;Informatique et Libertés&quot; du 6 janvier 1978 modifiée, vous disposez des droits suivants concernant vos données :
                    </p>
                    <ul className="mt-4 space-y-2 list-disc list-inside">
                        <li>Droit d&apos;accès</li>
                        <li>Droit de rectification</li>
                        <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
                        <li>Droit d&apos;opposition</li>
                        <li>Droit à la limitation du traitement</li>
                        <li>Droit à la portabilité</li>
                    </ul>
                    <p className="mt-4">
                        Ces données sont conservées pour une durée maximale de 3 ans après notre dernier contact. Elles peuvent être traitées par les prestataires techniques strictement nécessaires à l&apos;hébergement et à l&apos;envoi des messages. Pour exercer vos droits, veuillez contacter le responsable de traitement par e-mail à <a href="mailto:contact@humae.fr" className="text-[var(--humae-violet)] hover:underline">contact@humae.fr</a>.
                    </p>
                    <p className="mt-4">
                        En cas de réclamation, vous pouvez contacter la Commission Nationale de l’Informatique et des Libertés (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--humae-violet)] hover:underline">www.cnil.fr</a>).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">4. Propriété Intellectuelle</h2>
                    <p>
                        L&apos;ensemble de ce site (incluant, sans s&apos;y limiter, la charte graphique, les textes, les logos, les photographies et les icônes) constitue une œuvre protégée par le droit d&apos;auteur. Toute reproduction ou représentation, totale ou partielle, sans l&apos;autorisation expresse de HUMAE SARL est interdite et constituerait une contrefaçon.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">5. Cookies</h2>
                    <p>
                        Le site n&apos;utilise pas de cookies publicitaires. Des cookies strictement nécessaires peuvent être déposés pour sécuriser les espaces authentifiés. La mesure d&apos;audience et de performance est réalisée par les outils Vercel à partir de données techniques agrégées, sans cookie tiers de suivi inter-sites.
                    </p>
                    <ul className="mt-4 space-y-2 list-disc list-inside">
                        <li><strong>Cookies strictement nécessaires :</strong> ils sont indispensables au fonctionnement et à la sécurité des espaces concernés.</li>
                        <li><strong>Mesure d&apos;audience et de performance :</strong> elle sert à détecter les problèmes de navigation et à améliorer le site.</li>
                    </ul>
                    <p className="mt-4">
                        Si des traceurs non essentiels sont ajoutés ultérieurement, ils ne seront activés qu&apos;après recueil du consentement lorsqu&apos;il est requis.
                    </p>
                </section>

            </div>
        </div>
    );
}
