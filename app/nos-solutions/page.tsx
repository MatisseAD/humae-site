// app/nos-solutions/page.tsx
'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import SectionSeparator from '@/components/SectionSeparator';
import {BanknotesIcon, BriefcaseIcon, BuildingOffice2Icon, CheckIcon, UserIcon} from '@heroicons/react/24/outline';

const solutions = [
    {
        name: "Créer mon entreprise",
        description: "De l'idée à l'immatriculation, nous sommes à vos côtés pour lancer votre projet sur des bases solides.",
        Icon: BuildingOffice2Icon,
        features: ["Choix du statut juridique", "Rédaction des statuts", "Business plan", "Immatriculation"],
        href: "/nos-solutions/creation-entreprise",
    },
    {
        name: "Devenir Freelance",
        description: "Nous vous aidons à choisir le bon statut et à optimiser vos revenus pour une carrière d'indépendant sereine.",
        Icon: UserIcon,
        features: ["Comparatif des statuts", "Optimisation fiscale", "Gestion administrative", "Conseils personnalisés"],
        href: "/nos-solutions/devenir-freelance",
    },
    {
        name: "Gestion Comptable & Fiscale",
        description: "Déléguez-nous votre comptabilité et vos déclarations pour vous concentrer sur votre cœur de métier.",
        Icon: BanknotesIcon,
        features: ["Tenue comptable", "Déclarations de TVA", "Bilan annuel", "Optimisation des résultats"],
        href: "/nos-solutions/gestion-comptable",
    },
    {
        name: "Gestion Sociale & Paie",
        description: "Assurez la conformité de vos obligations sociales, de l'embauche à la gestion des bulletins de paie.",
        Icon: BriefcaseIcon,
        features: ["Établissement des paies", "Déclarations sociales (DSN)", "Contrats de travail", "Conseil social"],
        href: "/nos-solutions/gestion-sociale",
    },
];

export default function NosSolutionsPage() {
    return (
        <>
            {/* Section d'en-tête */}
            <section className="bg-white py-20 text-center">
                <div className="container mx-auto px-4">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-[var(--humae-violet)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Des Solutions Conçues pour Vous
                    </motion.h1>
                    <motion.p
                        className="mt-6 max-w-3xl mx-auto text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Que vous soyez créateur, freelance ou dirigeant, nous avons l'expertise pour vous accompagner à chaque étape de votre développement.
                    </motion.p>
                </div>
            </section>

            {/* Grille des solutions */}
            <section className="relative bg-gray-50 py-24">
                <SectionSeparator color="#ffffff" variant="rounded" />
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {solutions.map((solution, index) => (
                            <motion.div
                                key={solution.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="flex flex-col h-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    <CardHeader className="flex-row items-start gap-4">
                                        <div className="flex-shrink-0 bg-[var(--humae-violet)]/10 p-3 rounded-lg">
                                            <solution.Icon className="w-8 h-8 text-[var(--humae-violet)]" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl">{solution.name}</CardTitle>
                                            <CardDescription className="mt-1">{solution.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <ul className="space-y-3">
                                            {solution.features.map(feature => (
                                                <li key={feature} className="flex items-center">
                                                    <CheckIcon className="w-5 h-5 text-humae-orange mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="w-full bg-[var(--humae-violet)] hover:bg-[var(--humae-violet)]/90">
                                            <Link href={solution.href}>En savoir plus</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}