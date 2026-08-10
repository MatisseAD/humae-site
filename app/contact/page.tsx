// app/contact/page.tsx

import { ContactForm } from '@/components/ContactForm';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import { createPageMetadata } from '@/lib/siteMetadata';
// Les imports de toast et sendEmail ont été retirés car non utilisés ici

export const metadata = createPageMetadata({
    title: 'Contact - Humae',
    description: 'Contactez Humae pour toute question ou demande de devis.',
    path: '/contact',
});

export default async function ContactPage({
    searchParams,
}: {
    searchParams: Promise<{ subject?: string | string[] }>;
}) {
    const params = await searchParams;
    const requestedSubject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
    const defaultSubject = typeof requestedSubject === 'string'
        ? requestedSubject.trim().slice(0, 200)
        : '';

    return (
        <div className="container mx-auto max-w-6xl px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[var(--humae-violet)]">Contactez-nous</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Une question ? Un projet ? N&apos;hésitez pas à nous contacter.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Partie gauche : Informations de contact */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Nos coordonnées</h2>
                    <div className="flex items-start space-x-4">
                        <MapPinIcon className="w-6 h-6 mt-1 text-[var(--humae-orange)]" />
                        <div>
                            <h3 className="font-semibold">Adresse</h3>
                            <p className="text-gray-600">
                                <Link target="_blank" href="https://maps.app.goo.gl/GLPqcFK9WbbPAWLo7">
                                    50 rue du Pré Magné, 69126 BRINDAS
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <PhoneIcon className="w-6 h-6 mt-1 text-[var(--humae-orange)]" />
                        <div>
                            <h3 className="font-semibold">Téléphone</h3>
                            <a href="tel:+33472492190" className="text-gray-600 hover:text-[var(--humae-violet)]">04 72 49 21 90</a>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <EnvelopeIcon className="w-6 h-6 mt-1 text-[var(--humae-orange)]" />
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <a href="mailto:contact@humae.fr" className="text-gray-600 hover:text-[var(--humae-violet)]">contact@humae.fr</a>
                        </div>
                    </div>
                </div>

                {/* Partie droite : Formulaire */}
                <div>
                    <ContactForm defaultSubject={defaultSubject} />
                </div>
            </div>
        </div>
    );
}
