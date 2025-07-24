// app/gestion-comptable/page.tsx
'use client';

import {motion} from 'framer-motion';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {
    BookOpenIcon,
    ChatBubbleLeftRightIcon,
    CheckBadgeIcon,
    ScaleIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import SectionSeparator from '@/components/SectionSeparator';

const commitments = [
    { name: "Conformité Garantie", icon: CheckBadgeIcon },
    { name: "Optimisation Active", icon: SparklesIcon },
    { name: "Sérénité d'Esprit", icon: ChatBubbleLeftRightIcon },
];

const accountingFeatures = ["Tenue et révision de votre comptabilité", "Établissement du bilan et du compte de résultat", "Déclarations de TVA", "Tableaux de bord personnalisés"];
const fiscalFeatures = ["Déclaration de l'impôt sur les sociétés (IS)", "Optimisation de la rémunération du dirigeant", "Conseils en fiscalité personnelle (IFI, etc.)", "Assistance en cas de contrôle fiscal"];


export default function GestionComptablePage() {
    return (
        <div className="bg-white">
            {/* Section Héros */}
            <section className="py-24 text-center bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold text-[var(--humae-violet)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Votre gestion comptable et fiscale, <br/> en toute confiance.
                    </motion.h1>
                    <motion.p
                        className="mt-6 max-w-3xl mx-auto text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Nous prenons en charge la complexité pour que vous puissiez vous concentrer sur ce que vous faites de mieux : diriger votre entreprise.
                    </motion.p>

                    <motion.div
                        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        {commitments.map((commitment) => (
                            <div key={commitment.name} className="flex items-center justify-center gap-3 p-4 bg-white border rounded-lg shadow-sm">
                                <commitment.icon className="w-6 h-6 text-[var(--humae-orange)]" />
                                <span className="font-semibold text-gray-700">{commitment.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Section avec Onglets */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Tabs defaultValue="comptable" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="comptable">Gestion Comptable</TabsTrigger>
                            <TabsTrigger value="fiscale">Gestion Fiscale</TabsTrigger>
                        </TabsList>
                        <TabsContent value="comptable" className="pt-8">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Une comptabilité claire et précise</h3>
                                    <p className="text-gray-600 mb-6">La tenue de votre comptabilité est le socle de votre gestion. Nous la rendons fiable, lisible et utile pour votre pilotage.</p>
                                    <ul className="space-y-3">
                                        {accountingFeatures.map(feature => (
                                            <li key={feature} className="flex items-start"><CheckBadgeIcon className="w-6 h-6 text-[var(--humae-orange)] mr-3 flex-shrink-0 mt-1" />{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-8 bg-gray-50 rounded-lg text-center">
                                    <BookOpenIcon className="w-16 h-16 mx-auto text-[var(--humae-violet)]"/>
                                    <p className="mt-4 font-semibold">Votre bilan annuel est plus qu'une obligation, c'est une source d'information stratégique que nous vous aidons à interpréter.</p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="fiscale" className="pt-8">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Une fiscalité optimisée et sécurisée</h3>
                                    <p className="text-gray-600 mb-6">Notre expertise fiscale vous aide à respecter vos obligations tout en profitant des leviers disponibles pour alléger votre imposition.</p>
                                    <ul className="space-y-3">
                                        {fiscalFeatures.map(feature => (
                                            <li key={feature} className="flex items-start"><CheckBadgeIcon className="w-6 h-6 text-[var(--humae-orange)] mr-3 flex-shrink-0 mt-1" />{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-8 bg-gray-50 rounded-lg text-center">
                                    <ScaleIcon className="w-16 h-16 mx-auto text-[var(--humae-violet)]"/>
                                    <p className="mt-4 font-semibold">Chaque décision a un impact fiscal. Nous sommes là pour vous conseiller avant, pendant et après.</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Section CTA */}
            <section className="relative bg-gray-800 text-white py-24">
                <SectionSeparator color="#FFFFFF" variant="wave"/>
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold">Concentrez-vous sur votre croissance, on s'occupe des chiffres.</h2>
                    <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">Discutons de la manière dont Humae peut devenir le partenaire de votre sérénité administrative.</p>
                    <Button asChild size="lg" className="mt-8 bg-[var(--humae-orange)] hover:bg-[var(--humae-orange)] hover:bg-opacity-90 text-white">
                        <Link href="/contact?subject=Gestion Comptable et Fiscale">Demander une consultation</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}