'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BuildingOffice2Icon, CpuChipIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const keyPoints = [
    {
        title: 'Création Simplifiée',
        text: 'Nous transformons votre projet en une entreprise solide, en choisissant le statut le plus adapté pour vous. De l\'idée aux statuts, nous vous guidons à chaque étape.',
        Icon: BuildingOffice2Icon,
        color: 'var(--humae-violet)',
    },
    {
        title: 'Pilotage Serein',
        text: 'Prenez les bonnes décisions grâce à des outils clairs pour suivre vos finances et votre performance en temps réel. Concentrez-vous sur votre métier, nous nous occupons du reste.',
        Icon: CpuChipIcon,
        color: 'var(--humae-orange)',
    },
    {
        title: 'Conseillers Dédiés',
        text: 'Vous n\'êtes jamais seul. Une équipe de comptables et de fiscalistes vous accompagne à chaque étape pour répondre à toutes vos questions.',
        Icon: UserGroupIcon,
        color: '#3C3C3B',
    },
];

const cardVariants = {
    collapsed: {
        flex: 1,
        transition: { 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1]
        }
    },
    expanded: {
        flex: 3,
        transition: { 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1]
        }
    }
} as const;

const KeyPointsSection = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        L'accompagnement qui change tout
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Passez votre souris sur une carte pour en savoir plus.
                    </p>
                </div>

                <div
                    className="flex flex-col md:flex-row h-[400px] gap-4"
                    onMouseLeave={() => setExpandedIndex(null)}
                >
                    {keyPoints.map((point, index) => (
                        <motion.div
                            key={point.title}
                            className="relative rounded-2xl p-6 text-white overflow-hidden cursor-pointer"
                            style={{ backgroundColor: point.color }}
                            variants={cardVariants}
                            animate={expandedIndex === index ? 'expanded' : 'collapsed'}
                            onMouseEnter={() => setExpandedIndex(index)}
                        >
                            <div className="relative z-10 flex flex-col justify-start h-full">
                                <point.Icon className="w-10 h-10 mb-4" />
                                <h3 className="text-2xl font-bold">{point.title}</h3>
                                <motion.p
                                    className="mt-4 text-sm"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{
                                        opacity: expandedIndex === index ? 1 : 0,
                                        height: expandedIndex === index ? 'auto' : 0
                                    }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    {point.text}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyPointsSection;