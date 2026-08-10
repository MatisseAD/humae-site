// app/nos-outils/page.tsx

import { createPageMetadata } from '@/lib/siteMetadata';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SectionSeparator from '@/components/SectionSeparator';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const metadata = createPageMetadata({
    title: 'Nos Outils - Humae',
    description: 'Découvrez les outils technologiques que Humae met à votre disposition pour simplifier votre gestion et piloter votre entreprise.',
    path: '/le-cabinet/nos-outils',
});

const tools = [
    {
        name: 'Fulll',
        logoSrc: '/assets/logos/fulll.png',
        description: 'La plateforme tout-en-un pour centraliser vos documents, créer vos factures et suivre votre trésorerie en temps réel, en parfaite collaboration avec nous.',
        link: '/le-cabinet/nos-outils/fulll',
    },
    {
     name: 'MEG - Mon Expert en Gestion',
     logoSrc: '/assets/logos/meg.jpg',
     description: 'Mon Expert en Gestion (MEG) nous offre une solution de gestion complète intégrée à notre cabinet.',
     link: '/le-cabinet/nos-outils/meg-gestion',
    }
];

export default function NosOutilsPage() {
    return (
        <>
            <section className="bg-white py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--humae-violet)]">
                        La Technologie au Service de Votre Entreprise
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
                        Nous sélectionnons les meilleurs outils du marché pour vous faire gagner du temps, vous donner de la visibilité et simplifier notre collaboration.
                    </p>
                </div>
            </section>

            <section className="relative bg-gray-50 py-24">
                <SectionSeparator color="#ffffff" variant="rounded" />
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {tools.map((tool) => (
                            <div key={tool.name} className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-start h-full">
                                <Image
                                    src={tool.logoSrc}
                                    alt={`Logo de ${tool.name}`}
                                    width={120}
                                    height={40}
                                    className="mb-6"
                                />
                                <p className="text-gray-600 mb-6 flex-grow">{tool.description}</p>
                                <Button asChild className="mt-auto bg-[var(--humae-violet)] hover:bg-[var(--humae-violet)]/90">
                                    <Link href={tool.link}>
                                        Découvrir {tool.name}
                                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
