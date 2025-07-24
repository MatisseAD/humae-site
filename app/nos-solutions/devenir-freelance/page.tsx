// app/devenir-freelance/page.tsx
'use client';

import Image from 'next/image';
import {motion} from 'framer-motion';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {
    CalculatorIcon,
    PresentationChartLineIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import SectionSeparator from '@/components/SectionSeparator';

const benefits = [
    { name: "Le bon statut, sans surprise", text: "Micro-entreprise, SASU, EURL... Nous comparons pour vous afin de maximiser votre net.", icon: ShieldCheckIcon },
    { name: "Une gestion simplifiée", text: "Notre outil partenaire MEG vous permet de facturer et suivre vos dépenses en quelques clics.", icon: PresentationChartLineIcon },
    { name: "Votre revenu optimisé", text: "Nous vous aidons à définir votre TJM et à anticiper vos charges pour une visibilité totale.", icon: CalculatorIcon },
];

const faqItems = [
    { question: "Dois-je choisir la micro-entreprise ou une société ?", answer: "Cela dépend de nombreux facteurs : votre prévisionnel de chiffre d'affaires, vos charges, votre souhait de protéger votre patrimoine... Nous analysons votre situation pour vous donner une recommandation claire." },
    { question: "Comment est calculé mon revenu net ?", answer: "Votre revenu net est votre chiffre d'affaires moins vos cotisations sociales, vos frais professionnels et vos impôts. Nous vous fournissons un simulateur et des prévisionnels pour l'anticiper." },
    { question: "Puis-je bénéficier d'aides comme l'ACRE ?", answer: "Oui, l'ACRE (Aide à la Création ou à la Reprise d'une Entreprise) peut vous exonérer d'une partie de vos cotisations sociales la première année. Nous vérifions votre éligibilité et nous occupons des démarches." },
];


export default function DevenirFreelancePage() {
    return (
        <div className="bg-white">
            {/* Section Héros */}
            <section className="container mx-auto px-4 py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Remplacement */}
                        <span className="text-base font-semibold text-[var(--humae-orange)]">POUR LES INDÉPENDANTS</span>
                        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                            La liberté de créer, la sérénité en plus.
                        </h1>
                        <p className="mt-6 text-lg text-gray-600">
                            Concentrez-vous sur votre talent. Humae s'occupe de la complexité administrative pour que votre aventure freelance soit un succès dès le premier jour.
                        </p>
                        {/* Remplacement */}
                        <Button asChild size="lg" className="mt-8 bg-[var(--humae-violet)] hover:bg-[var(--humae-violet)] hover:bg-opacity-90">
                            <Link href="/contact?subject=Devenir Freelance">Commencer mon projet</Link>
                        </Button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9 }}
                    >
                        <Image
                            src="/assets/freelance-hero.jpg"
                            alt="Freelance travaillant dans un bureau moderne et lumineux"
                            width={500}
                            height={500}
                            className="rounded-lg shadow-xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Section Bénéfices */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold">Un accompagnement pensé pour les freelances</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {benefits.map((benefit) => {
    const Icon = benefit.icon;  // Créer une variable Icon avec majuscule
    return (
        <div key={benefit.name} className="flex flex-col items-start gap-4">
            <div className="p-2 bg-[var(--humae-orange)]/10 rounded-lg">
                <Icon className="h-6 w-6 text-[var(--humae-orange)]" />
            </div>
            <h3 className="text-lg font-semibold">{benefit.name}</h3>
            <p className="text-gray-600">{benefit.text}</p>
        </div>
    );
})}
                    </div>
                </div>
            </section>

            {/* Section FAQ */}
            <section className="relative py-24">
                <SectionSeparator color="#f9fafb" variant="angled" />
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        {/* Remplacement */}
                        <QuestionMarkCircleIcon className="w-12 h-12 mx-auto text-[var(--humae-orange)]" />
                        <h2 className="mt-4 text-3xl font-bold text-gray-900">Vos questions, nos réponses</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="hover:no-underline hover:cursor-pointer text-lg text-left">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-gray-600">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Section CTA */}
            <section className="bg-gray-50 py-24 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold">Prêt à vous lancer en toute confiance ?</h2>
                    <p className="mt-4 text-lg text-gray-600">Le premier pas, c'est d'en discuter. Prenons rendez-vous.</p>
                    {/* Remplacement */}
                    <Button asChild size="lg" className="mt-8 bg-[var(--humae-orange)] hover:bg-[var(--humae-orange)] hover:bg-opacity-90">
                        <Link href="/contact?subject=Devenir Freelance">Planifier un appel</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}