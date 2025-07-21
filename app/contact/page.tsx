// app/contact/page.tsx

import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm'; // Importe ton nouveau formulaire
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Contact - Humae',
    description: 'Contactez Humae pour toute question ou demande de devis.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-humae-violet">Contactez-nous</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Une question ? Un projet ? N'hésitez pas à nous contacter.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Partie gauche : Informations de contact */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Nos coordonnées</h2>
                    <div className="flex items-start space-x-4">
                        <MapPinIcon className="w-6 h-6 mt-1 text-humae-orange" />
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
                        <PhoneIcon className="w-6 h-6 mt-1 text-humae-orange" />
                        <div>
                            <h3 className="font-semibold">Téléphone</h3>
                            <a href="tel:+33472492190" className="text-gray-600 hover:text-humae-violet">04 72 49 21 90</a>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <EnvelopeIcon className="w-6 h-6 mt-1 text-humae-orange" />
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <a href="mailto:contact@humae.fr" className="text-gray-600 hover:text-humae-violet">contact@humae.fr</a>
                        </div>
                    </div>
                </div>

                {/* Partie droite : Formulaire */}
                <div>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}