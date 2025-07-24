// components/StackedCardsSection.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BuildingOffice2Icon, CpuChipIcon, UserGroupIcon, ArrowRightIcon, ChartBarIcon, DocumentCheckIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const cards = [
    {
        title: 'Création Simplifiée',
        subtitle: 'Lancez votre entreprise sereinement',
        text: 'Nous transformons votre projet en une entreprise solide, en choisissant le statut le plus adapté.',
        description: 'Notre équipe d\'experts vous accompagne à chaque étape, de l\'idée initiale jusqu\'à son lancement.',
        Icon: BuildingOffice2Icon,
        bgColor: 'var(--humae-violet)',
        image: '/assets/client-3.jpg',
        features: [
            { icon: DocumentCheckIcon, text: 'Statuts personnalisés' },
            { icon: ChartBarIcon, text: 'Plan financier détaillé' },
            { icon: ClockIcon, text: 'Création en 7 jours' },
        ]
    },
    {
        title: 'Pilotage Serein',
        subtitle: 'Gérez votre activité efficacement',
        text: 'Prenez les bonnes décisions grâce à des outils clairs pour suivre vos finances en temps réel.',
        description: 'Accédez à des tableaux de bord intuitifs et des analyses détaillées pour piloter avec confiance.',
        Icon: CpuChipIcon,
        bgColor: 'var(--humae-orange)',
        image: '/assets/client-2.jpg',
        features: [
            { icon: ChartBarIcon, text: 'Tableaux de bord en temps réel' },
            { icon: ShieldCheckIcon, text: 'Sécurité des données' },
            { icon: ClockIcon, text: 'Suivi 24/7' },
        ]
    },
    {
        title: 'Conseillers Dédiés',
        subtitle: 'Un accompagnement personnalisé',
        text: 'Une équipe de comptables et de fiscalistes vous accompagne à chaque étape de votre développement.',
        description: 'Bénéficiez d\'un suivi personnalisé et de conseils d\'experts pour optimiser votre gestion.',
        Icon: UserGroupIcon,
        bgColor: '#3C3C3B',
        image: '/assets/client-1.jpg',
        features: [
            { icon: UserGroupIcon, text: 'Expert dédié' },
            { icon: ClockIcon, text: 'Réponse sous 24h' },
            { icon: ShieldCheckIcon, text: 'Expertise certifiée' },
        ]
    },
];

const StackedCardsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const createCardAnimations = (index: number) => {
        const segmentSize = 1 / cards.length;
        const start = index * segmentSize;
        const end = start + segmentSize;

        return {
            y: useTransform(scrollYProgress, [start, end], ['0%', '-100%']),
            opacity: useTransform(scrollYProgress, [start, end], [1, 0]),
            scale: useTransform(scrollYProgress, [start, end], [1 - (index * 0.05), 1 - ((index + 1) * 0.05)]),
        };
    };

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-white">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-5xl mx-auto px-4 relative h-full flex items-center">
                    {cards.map((card, index) => {
                        const animations = createCardAnimations(index);

                        // RESPONSIVE: On réduit le décalage initial sur mobile
                        const initialTopOffset = index * 10;
                        const mdInitialTopOffset = index * 20;

                        return (
                            <motion.div
                                key={card.title}
                                className="absolute left-0 right-0 mx-auto w-[90%] md:w-full max-w-4xl p-6 md:p-8 rounded-2xl shadow-2xl"
                                style={{
                                    backgroundColor: card.bgColor,
                                    y: animations.y,
                                    opacity: animations.opacity,
                                    scale: animations.scale,
                                    zIndex: cards.length - index,
                                    top: `${initialTopOffset}px`,
                                }}
                            >
                                {/* RESPONSIVE: La grille passe à 1 colonne sur mobile, 2 sur desktop */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-white items-center">
                                    <div className="space-y-4 md:space-y-6">
                                        <card.Icon className="w-12 h-12 md:w-16 md:h-16" />
                                        <div>
                                            <h4 className="text-base md:text-lg font-medium text-white/80">{card.subtitle}</h4>
                                            {/* RESPONSIVE: Taille de texte ajustée */}
                                            <h3 className="text-2xl md:text-3xl font-bold mb-4">{card.title}</h3>
                                            <p className="text-base md:text-lg mb-4">{card.text}</p>
                                            <p className="text-sm md:text-base text-white/80">{card.description}</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/20">
                                            {card.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <feature.icon className="w-5 h-5 text-white/80" />
                                                    <span className="text-sm">{feature.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* RESPONSIVE: Hauteur de l'image ajustée */}
                                    <div className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StackedCardsSection;