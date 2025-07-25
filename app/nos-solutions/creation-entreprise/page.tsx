// app/creer-mon-entreprise/page.tsx
'use client';

import Image from 'next/image';
import {motion} from 'framer-motion';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import { 
    LightBulbIcon, 
    DocumentTextIcon, 
    BanknotesIcon, 
    RocketLaunchIcon 
} from '@heroicons/react/24/outline';
import SectionSeparator from '@/components/SectionSeparator';

const benefits = [
    { name: "Le bon statut, sans stress", text: "Nous analysons votre projet pour choisir la forme juridique (SASU, EURL...) la plus avantageuse pour vous.", icon: LightBulbIcon },
    { name: "Un business plan solide", text: "Nous vous aidons à structurer votre prévisionnel financier pour convaincre les banques et les investisseurs.", icon: DocumentTextIcon },
    { name: "Optimisation des aides", text: "ACRE, ARCE, subventions... Nous nous assurons que vous ne passez à côté d'aucune aide à la création.", icon: BanknotesIcon },
    { name: "Lancement rapide", text: "Nous gérons toutes les formalités administratives pour une immatriculation rapide et sans erreur.", icon: RocketLaunchIcon },
];

const processSteps = [
    { name: "RDV Découverte", description: "Nous échangeons sur votre projet, vos ambitions et vos contraintes." },
    { name: "Phase de Conseil", description: "Nous vous présentons les options et validons ensemble la meilleure stratégie." },
    { name: "Gestion Administrative", description: "Nous rédigeons les statuts et nous occupons de toutes les formalités." },
    { name: "Immatriculation", description: "Félicitations, votre entreprise est officiellement créée !" },
];

export default function CreerMonEntreprisePage() {
    return (
        <div className="bg-white">
            {/* Section Héros */}
            <section className="relative h-[60vh] flex items-center justify-center text-white text-center px-4">
                <Image
                    src="/assets/creation-hero.jpg" // IMAGE DE FOND
                    alt="Personne dessinant un plan d'entreprise"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold">Donnez vie à votre projet.</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
                        L&apos;aventure entrepreneuriale commence ici. Nous sommes là pour la rendre plus simple.
                    </p>
                </motion.div>
            </section>

            {/* Section Bénéfices */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Un départ sur des bases saines</h2>
                        <p className="mt-4 text-lg text-gray-600">Nous sécurisons chaque aspect de votre lancement.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {benefits.map((benefit) => (
    <div key={benefit.name} className="flex flex-col items-start gap-4">
        <div className="p-2 bg-[var(--humae-orange)]/10 rounded-lg">
            <benefit.icon className="h-6 w-6 text-[var(--humae-orange)]" />
        </div>
        <h3 className="text-lg font-semibold">{benefit.name}</h3>
        <p className="text-gray-600">{benefit.text}</p>
    </div>
))}
                    </div>
                </div>
            </section>

            {/* Section Processus */}
            <section className="relative bg-gray-50 py-24">
                <SectionSeparator color="#ffffff" variant="wave" />
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Notre accompagnement, étape par étape</h2>
                    </div>
                    <div className="relative max-w-2xl mx-auto">
                        {/* Remplacement de bg-humae-violet/20 */}
                        <div className="absolute left-4 top-4 h-full w-0.5 bg-[var(--humae-violet)] bg-opacity-20" />
                        <div className="space-y-12">
                            {processSteps.map((step, index) => (
                                <motion.div
                                    key={step.name}
                                    className="relative pl-12"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {/* Remplacement de bg-humae-violet */}
                                    <div className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--humae-violet)]">
                                        <span className="font-bold text-white">{index + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold">{step.name}</h3>
                                    <p className="mt-2 text-gray-600">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section CTA */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold">Prêt à lancer votre entreprise ?</h2>
                    <p className="mt-4 text-lg text-gray-600">Le premier pas, c&apos;est d&apos;en discuter. Prenons rendez-vous.</p>
                    {/* Remplacement de bg-humae-orange et du hover */}
                    <Button asChild size="lg" className="mt-8 bg-[var(--humae-orange)] hover:bg-[var(--humae-orange)] hover:bg-opacity-90">
                        <Link href="/contact?subject=Création d'entreprise">Planifier un appel</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}