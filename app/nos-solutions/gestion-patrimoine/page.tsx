// app/gestion-patrimoine/page.tsx
'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {motion, useScroll, useTransform, Variants} from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    ArrowUpRightIcon,
    ShieldCheckIcon,
    ArrowTrendingUpIcon,
    HomeIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';



const expertiseAreas = [
    { name: "Stratégie d'investissement", text: "Placements financiers, immobilier... nous construisons un portefeuille diversifié et performant.", icon: ArrowTrendingUpIcon },
    { name: "Préparation de la retraite", text: "Anticipez votre avenir en mettant en place les solutions les plus adaptées à vos objectifs de vie.", icon: HomeIcon },
    { name: "Optimisation & Transmission", text: "Nous structurons votre patrimoine pour optimiser sa fiscalité et préparer sa transmission en toute sérénité.", icon: ShieldCheckIcon },
];

// Animation pour le titre (mot par mot)
const titleAnimation: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};
const wordAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};


export default function GestionPatrimoinePage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

    return (
        // On utilise un fond vert sombre pour le thème de la page
        <div className="bg-[#9BBEA9] text-[#F0F5F2]">

            {/* Section Héros avec effet Parallax */}
            <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ y: backgroundY }}
                >
                    <Image
                        src="/assets/patrimoine-hero.jpg" // L'image verte
                        alt="Structure abstraite et verte symbolisant la croissance du patrimoine"
                        fill
                        className="object-cover opacity-30"
                    />
                </motion.div>
                <motion.div style={{ y: textY }} className="relative z-10 px-4">
                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold tracking-tight"
                        variants={titleAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        { "Dessinons. Votre. Avenir.".split(' ').map((word, index) => (
                            <span key={index} className="inline-block overflow-hidden pb-2">
                        <motion.span className="inline-block mr-4" variants={wordAnimation}>{word}</motion.span>
                    </span>
                        ))}
                    </motion.h1>
                    <motion.p
                        className="mt-6 text-lg text-[#F0F5F2]/80 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                    >
                        Une vision stratégique pour votre patrimoine, orchestrée par des experts de confiance.
                    </motion.p>
                </motion.div>
            </section>

            {/* Section Introduction Selenita */}
            <section className="py-24 bg-black/20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <motion.h2
                        className="text-4xl font-bold text-[#2ECC71]" // Accent vert vibrant
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1 }}
                    >
                        Selenita Patrimoine
                    </motion.h2>
                    <motion.p
                        className="mt-6 text-xl text-[#F0F5F2]/80"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        Parce que votre patrimoine est unique, il mérite une expertise dédiée. Selenita Patrimoine, fondée par Céline Monin, vous offre un accompagnement sur mesure pour aligner vos actifs avec vos projets de vie.
                    </motion.p>
                </div>
            </section>

            {/* Section Expertise */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {expertiseAreas.map((area, index) => (
                            <motion.div
                                key={area.name}
                                className="p-8 border border-white/10 rounded-lg bg-white/5"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <area.icon className="w-10 h-10 text-[#2ECC71]" />
                                <h3 className="text-2xl font-bold mt-6">{area.name}</h3>
                                <p className="mt-4 text-[#F0F5F2]/70">{area.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section CTA vers Selenita.fr */}
            <section className="py-32">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                    >
                        <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto text-[#2ECC71]" />
                        <h2 className="mt-6 text-3xl md:text-4xl font-bold">
                            Commençons par une conversation.
                        </h2>
                        <p className="mt-4 text-lg text-[#F0F5F2]/70 max-w-2xl mx-auto">
                            Le meilleur moyen de savoir si nous pouvons vous aider est d'en discuter.
                        </p>
                        <Button asChild size="lg" className="mt-10 bg-[#2ECC71] text-[#1A3A31] text-lg hover:bg-[#2ECC71]/90">
                            <a href="https://selenita.fr" target="_blank" rel="noopener noreferrer">
                                Visiter Selenita Patrimoine
                                <ArrowUpRightIcon className="w-5 h-5 ml-2" />
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}