'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BuildingOffice2Icon, CpuChipIcon, UserGroupIcon, ArrowRightIcon, ChartBarIcon, DocumentCheckIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const cards = [
    {
        title: 'Création Simplifiée',
        subtitle: 'Lancez votre entreprise sereinement',
        text: 'Nous transformons votre projet en une entreprise solide, en choisissant le statut le plus adapté à vos besoins et objectifs.',
        description: 'Notre équipe d\'experts vous accompagne à chaque étape de la création de votre entreprise, de l\'idée initiale jusqu\'à son lancement.',
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
        text: 'Prenez les bonnes décisions grâce à des outils clairs pour suivre vos finances et votre performance en temps réel.',
        description: 'Accédez à des tableaux de bord intuitifs et des analyses détaillées pour piloter votre entreprise en toute confiance.',
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
        description: 'Bénéficiez d\'un suivi personnalisé et de conseils d\'experts pour optimiser votre gestion et votre fiscalité.',
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
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            if (!containerRef.current || !contentRef.current) return;
            const containerRect = containerRef.current.getBoundingClientRect();

            // Vérifie si la section est visible
            if (containerRect.top <= 0 && containerRect.bottom >= window.innerHeight) {
                e.preventDefault();
                const scrolled = window.scrollY - containerRef.current.offsetTop;
                window.scrollTo({
                    top: containerRef.current.offsetTop + Math.min(Math.max(scrolled + e.deltaY, 0), containerRect.height),
                    behavior: 'smooth'
                });
            }
        };

        containerRef.current?.addEventListener('wheel', handleScroll, { passive: false });
        return () => containerRef.current?.removeEventListener('wheel', handleScroll);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const createCardAnimations = (index: number) => {
        const segmentSize = 1 / 3;
        const start = index * segmentSize;
        const end = start + (segmentSize * 0.7);

        return {
            y: useTransform(
                scrollYProgress,
                [start, end],
                ['-100vh', '0vh']
            ),
            opacity: useTransform(
                scrollYProgress,
                [start, end],
                [0, 1]
            ),
            scale: useTransform(
                scrollYProgress,
                [start, end],
                [0.8, 1]
            ),
        };
    };

    return (
        <section className="bg-white relative" ref={containerRef}>
            <div className="h-[300vh] relative">
                <div ref={contentRef} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-5xl mx-auto px-4">
                        {cards.map((card, index) => {
                            const animations = createCardAnimations(index);

                            return (
                                <motion.div
                                    key={card.title}
                                    className="absolute left-0 right-0 mx-auto w-full max-w-4xl p-8 rounded-xl shadow-lg"
                                    initial={{ y: '-100vh', opacity: 0, scale: 0.8 }}
                                    style={{
                                        backgroundColor: card.bgColor,
                                        top: `${index * 40}px`,
                                        y: animations.y,
                                        opacity: animations.opacity,
                                        scale: animations.scale,
                                        zIndex: index,
                                    }}
                                >
                                    <div className="grid grid-cols-2 gap-8 text-white">
                                        <div className="space-y-6">
                                            <card.Icon className="w-16 h-16" />
                                            <div>
                                                <h4 className="text-lg font-medium text-white/80">{card.subtitle}</h4>
                                                <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                                                <p className="text-lg mb-4">{card.text}</p>
                                                <p className="text-white/80">{card.description}</p>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 mt-6">
                                                {card.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <feature.icon className="w-5 h-5 text-white/80" />
                                                        <span className="text-sm">{feature.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                                En savoir plus
                                                <ArrowRightIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="relative h-[400px] rounded-xl overflow-hidden">
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
            </div>
        </section>
    );
};

export default StackedCardsSection;