// app/mentions-legales/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Mentions Légales - Humae',
    description: 'Consultez les mentions légales du site Humae, cabinet d\'expertise comptable.',
};

export default function MentionsLegalesPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <h1 className="text-4xl font-bold text-[var(--humae-violet)] mb-2">Mentions Légales</h1>
            <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : 21 juillet 2025</p>

            <div className="space-y-8 text-gray-700">

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">1. Éditeur du Site</h2>
                    <p>
                        <strong>HUMAE SARL</strong><br />
                        Société à responsabilité limitée inscrite au RCS de LYON sous le n° 828 403 741 00014, au capital de 8 000 euros.
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
                        <strong>OVH</strong><br />
                        Une société française, dont les services sont conformes au RGPD (Règlement Général sur la Protection des Données).
                    </p>
                    <ul className="mt-4 space-y-1 list-inside">
                        <li><strong>Siège social :</strong> 2 rue Kellermann, 59100 Roubaix</li>
                        <li><strong>Site web :</strong> <a href="https://www.ovhcloud.com/fr/" target="_blank" rel="noopener noreferrer" className="text-[var(--humae-violet)] hover:underline">ovhcloud.com</a></li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">3. Protection des Données Personnelles</h2>
                    <p>
                        Dans le cadre de l'utilisation du site, notamment via notre formulaire de contact ou notre simulateur, nous pouvons collecter des données personnelles vous concernant (nom, prénom, adresse e-mail, numéro de téléphone, etc.). Ces données sont collectées sur la base de votre consentement afin de répondre à vos demandes.
                    </p>
                    <p className="mt-4">
                        Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée, vous disposez des droits suivants concernant vos données :
                    </p>
                    <ul className="mt-4 space-y-2 list-disc list-inside">
                        <li>Droit d'accès</li>
                        <li>Droit de rectification</li>
                        <li>Droit à l'effacement (droit à l'oubli)</li>
                        <li>Droit d'opposition</li>
                        <li>Droit à la limitation du traitement</li>
                        <li>Droit à la portabilité</li>
                    </ul>
                    <p className="mt-4">
                        Ces données sont conservées pour une durée de 3 ans après notre dernier contact et ne sont pas transférées à des tiers. Pour exercer vos droits, veuillez contacter le responsable de traitement par e-mail à <a href="mailto:contact@humae.fr" className="text-[var(--humae-violet)] hover:underline">contact@humae.fr</a>.
                    </p>
                    <p className="mt-4">
                        En cas de réclamation, vous pouvez contacter la Commission Nationale de l’Informatique et des Libertés (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--humae-violet)] hover:underline">www.cnil.fr</a>).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">4. Propriété Intellectuelle</h2>
                    <p>
                        L'ensemble de ce site (incluant, sans s'y limiter, la charte graphique, les textes, les logos, les photographies et les icônes) constitue une œuvre protégée par le droit d'auteur. Toute reproduction ou représentation, totale ou partielle, sans l'autorisation expresse de HUMAE SARL est interdite et constituerait une contrefaçon.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">5. Cookies</h2>
                    <p>
                        Notre site utilise des cookies pour améliorer votre expérience de navigation et pour mesurer l'audience de manière anonyme.
                    </p>
                    <ul className="mt-4 space-y-2 list-disc list-inside">
                        <li><strong>Cookies strictement nécessaires :</strong> Ils sont indispensables au bon fonctionnement du site et ne peuvent pas être désactivés.</li>
                        <li><strong>Cookies de performance et de mesure d'audience :</strong> Nous utilisons des outils d'analyse qui collectent des données de manière anonyme et respectueuse de la vie privée, sans stocker d'informations sur votre appareil.</li>
                    </ul>
                    <p className="mt-4">
                        Conformément à la législation, votre consentement est recueilli via un bandeau informatif lors de votre première visite pour tous les cookies non essentiels. Vous pouvez modifier vos préférences à tout moment depuis cette même interface.
                    </p>
                </section>

            </div>
        </div>
    );
}