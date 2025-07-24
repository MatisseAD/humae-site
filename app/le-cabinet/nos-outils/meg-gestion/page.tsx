'use client';

import {motion} from 'framer-motion';
import {
    BanknotesIcon,
    CheckBadgeIcon,
    CircleStackIcon,
    CurrencyEuroIcon,
    DocumentChartBarIcon
} from '@heroicons/react/24/outline';
import SectionSeparator from '@/components/SectionSeparator';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

const benefits = [
    {
        name: "Gagnez du temps au quotidien",
        description: "Automatisez votre facturation et la collecte de vos factures d'achat pour vous concentrer sur votre cœur de métier.",
        icon: DocumentChartBarIcon,
    },
    {
        name: "Anticipez votre trésorerie",
        description: "Suivez vos encaissements et décaissements en temps réel et prenez des décisions éclairées grâce à des prévisionnels clairs.",
        icon: CurrencyEuroIcon,
    },
    {
        name: "Simplifiez vos notes de frais",
        description: "Prenez en photo vos justificatifs avec votre mobile. MEG s'occupe de la saisie et de l'archivage à valeur probante.",
        icon: BanknotesIcon,
    },
];

export default function MegPage() {
    return (
        <div className="bg-white text-gray-800">

            <section className="container mx-auto px-4 pt-24 pb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-base font-semibold text-[var(--humae-violet)]">MON EXPERT EN GESTION</span>
                        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                            La gestion d'entreprise, enfin intuitive.
                        </h1>
                        <p className="mt-6 text-lg text-gray-600">
                            Avec Humae, pilotez votre activité grâce à **MEG**, l'outil complet qui connecte votre entreprise à votre expert-comptable pour une gestion fluide et sans effort.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="bg-gray-50 p-8 rounded-lg border"
                    >
                        <h3 className="text-lg font-semibold mb-4">Fonctionnalités principales :</h3>
                        <ul className="space-y-3">
                            {['Devis & Facturation', 'Gestion des achats', 'Suivi de trésorerie', 'Tableaux de bord', 'Archivage sécurisé'].map(item => (
                                <li key={item} className="flex items-center">
                                    <CheckBadgeIcon className="w-5 h-5 text-[var(--humae-orange)] mr-3 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Section 2: Bénéfices Clés */}
            <section className="relative bg-gray-50 py-24">
                <SectionSeparator color="#ffffff" variant="rounded" />
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.name}
                                className="text-center p-6"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--humae-violet)]/10 mb-6">
                                    <benefit.icon className="w-10 h-10 text-[var(--humae-violet)]" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{benefit.name}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 relative">
                <SectionSeparator color="#f9fafb" variant="rounded" />
                <div className="container mx-auto max-w-3xl px-4 text-center">
                    <CircleStackIcon className="w-12 h-12 mx-auto text-[var(--humae-orange)] mb-4" />
                    <h2 className="text-3xl font-bold">L'outil ne fait pas tout. L'expert fait la différence.</h2>
                    <p className="mt-6 text-lg text-gray-600">
                        MEG est une plateforme performante pour collecter et organiser vos données. Notre rôle chez Humae est de transformer ces données en stratégies gagnantes pour votre entreprise. Nous interprétons vos chiffres pour vous guider vers la croissance.
                    </p>
                    <Button asChild size="lg" className="mt-8 bg-[var(--humae-violet)] hover:bg-[var(--humae-violet)]/90">
                        <Link href="/contact">Échanger avec un conseiller</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}