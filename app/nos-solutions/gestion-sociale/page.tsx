// app/gestion-sociale/page.tsx
'use client';

import {motion} from 'framer-motion';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {
    ArrowLeftOnRectangleIcon,
    ChartBarIcon,
    DocumentTextIcon,
    PuzzlePieceIcon,
    ShieldCheckIcon,
    UserPlusIcon
} from '@heroicons/react/24/outline';
import SectionSeparator from '@/components/SectionSeparator';

const timelineSteps = [
    { title: "L'Embauche", text: "Rédaction du contrat de travail, déclaration d'embauche (DPAE), affiliation aux caisses : nous sécurisons l'arrivée de vos nouveaux talents.", icon: UserPlusIcon },
    { title: "La Vie du Contrat", text: "Nous établissons les bulletins de paie chaque mois et gérons les déclarations sociales (DSN), les congés et les absences.", icon: DocumentTextIcon },
    { title: "La Fin du Contrat", text: "Calcul du solde de tout compte, documents de fin de contrat (certificat de travail, attestation Pôle Emploi)... Nous gérons les départs en toute conformité.", icon: ArrowLeftOnRectangleIcon },
];

const expertiseAreas = [
    { name: "Conformité Légale", text: "Nous assurons une veille constante pour appliquer les bonnes conventions collectives et respecter le droit du travail.", icon: ShieldCheckIcon },
    { name: "Aides à l'embauche", text: "Nous identifions et mettons en place les aides auxquelles vous avez droit pour optimiser vos coûts.", icon: PuzzlePieceIcon },
    { name: "Tableaux de Bord Sociaux", text: "Suivez votre masse salariale et vos indicateurs RH clés grâce à des reportings clairs.", icon: ChartBarIcon },
];


export default function GestionSocialePage() {
    return (
        <div className="bg-white">
            {/* Section Héros */}
            <section className="relative overflow-hidden bg-gray-50 py-24">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold text-[var(--humae-violet)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Votre capital humain, notre expertise.
                    </motion.h1>
                    <motion.p
                        className="mt-6 max-w-3xl mx-auto text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Déléguez la complexité de la gestion sociale et de la paie pour vous consacrer à l&apos;essentiel : vos équipes.
                    </motion.p>
                </div>
                {/* Formes abstraites en fond */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--humae-violet)]/10 rounded-full filter blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--humae-orange)]/10 rounded-full filter blur-3xl opacity-50"></div>
            </section>

            {/* Section Timeline */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">Un accompagnement sur tout le cycle de vie du salarié</h2>
                    </div>
                    <div className="relative">
                        {/* Ligne verticale de la timeline */}
                        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-200" />
                        <div className="space-y-16">
                            {timelineSteps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    className="relative flex items-center"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                >
                                    <div className={`w-1/2 pr-8 text-right ${index % 2 !== 0 ? 'order-2 pl-8 pr-0 text-left' : ''}`}>
                                        <h3 className="text-2xl font-bold text-[var(--humae-violet)]">{step.title}</h3>
                                        <p className="mt-2 text-gray-600">{step.text}</p>
                                    </div>
                                    <div className="w-1/2 flex justify-center">
                                        <div className={`absolute bg-white flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 ${index % 2 !== 0 ? '-ml-8' : 'ml-8'}`}>
                                            <step.icon className="w-8 h-8 text-[var(--humae-orange)]" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Expertise */}
            <section className="relative bg-gray-50 py-24">
                <SectionSeparator color="#ffffff" variant="wave" />
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold">Plus qu&apos;une simple gestion de paie</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {expertiseAreas.map((area, index) => (
                            <motion.div
                                key={area.name}
                                className="text-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--humae-violet)]/10 mb-6">
                                    <area.icon className="w-10 h-10 text-[var(--humae-violet)]" />
                                </div>
                                <h3 className="text-xl font-semibold">{area.name}</h3>
                                <p className="mt-2 text-gray-600">{area.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section CTA */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold">Libérez-vous du temps, sécurisez vos obligations.</h2>
                    <p className="mt-4 text-lg text-gray-600">Déléguez-nous votre gestion sociale et concentrez-vous sur vos équipes.</p>
                    <Button asChild size="lg" className="mt-8 bg-[var(--humae-violet)] hover:bg-[var(--humae-violet)] hover:bg-opacity-90">
                        <Link href="/contact?subject=Gestion Sociale et Paie">Obtenir une proposition</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}