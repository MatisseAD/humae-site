// app/nos-outils/fulll/page.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    CloudArrowUpIcon,
    ChartBarIcon,
    DocumentTextIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import SectionSeparator from '@/components/SectionSeparator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const features = [
    {
        name: "Centralisez vos documents",
        description: "Fini la course aux papiers. Déposez vos factures et notes de frais en quelques clics via l'app mobile ou web.",
        icon: CloudArrowUpIcon,
    },
    {
        name: "Pilotez en temps réel",
        description: "Accédez à votre tableau de bord financier, suivez votre chiffre d'affaires et votre trésorerie quand vous le voulez.",
        icon: ChartBarIcon,
    },
    {
        name: "Créez vos factures simplement",
        description: "Éditez et envoyez des devis et factures professionnels conformes en quelques minutes.",
        icon: DocumentTextIcon,
    },
    {
        name: "Collaborez avec votre comptable",
        description: "Communiquez et partagez des documents de manière sécurisée directement avec votre conseiller Humae.",
        icon: ChatBubbleLeftRightIcon,
    },
];

export default function FulllPage() {
    return (
        <div className="bg-white text-gray-800">

            <section className="container mx-auto px-4 pt-24 pb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-base font-semibold text-humae-violet">L&apos;OUTIL PARTENAIRE DE VOTRE RÉUSSITE</span>
                        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                            Votre entreprise, dans votre poche.
                        </h1>
                        <p className="mt-6 text-lg text-gray-600">
                            Avec Humae, vous bénéficiez de Fulll, la plateforme tout-en-un qui simplifie votre gestion administrative et vous donne une vision claire de vos finances, 24h/24.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Image
                            src="/assets/outils/img.png"
                            alt="Tableau de bord de l'application Fulll.io sur une tablette"
                            width={600}
                            height={500}
                            className="rounded-lg shadow-2xl"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="relative bg-gray-50 py-24">
                <SectionSeparator color="#ffffff" variant="wave" />
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">Tout ce dont vous avez besoin, au même endroit.</h2>
                        <p className="mt-4 text-lg text-gray-600">Gagnez du temps et de la sérénité.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature) => (
                            <div key={feature.name}>
                                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                                    <feature.icon className="w-10 h-10 text-humae-orange mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 relative ">
                <SectionSeparator color="#f9fafb" variant="rounded" />
                <div className="container mx-auto max-w-3xl px-4 text-center">
                    <h2 className="text-3xl font-bold">Un outil puissant, <span className="text-humae-violet">un conseil humain</span></h2>
                    <p className="mt-6 text-lg text-gray-600">
                        Fulll.io est un copilote exceptionnel, mais il ne remplace pas l&apos;expertise. Chez Humae, nous utilisons les données de l&apos;outil pour vous fournir des conseils proactifs et personnalisés. Nous analysons vos chiffres pour vous aider à prendre les meilleures décisions stratégiques.
                    </p>
                    <Button asChild size="lg" className="mt-8 bg-humae-violet hover:bg-humae-violet/90">
                        <Link href="/contact">Discutons de votre projet</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
