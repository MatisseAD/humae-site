// components/HeroSection.tsx
'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section className="bg-white text-gray-800 pt-20"> {/* Ajout du pt-20 */}
            <div className="container mx-auto flex flex-col items-center px-4 py-24 text-center">

                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold leading-tight"
                    initial={{ opacity: 0, y: 20 }} // État initial : invisible et décalé vers le bas
                    animate={{ opacity: 1, y: 0 }}   // État final : visible et à sa position d'origine
                    transition={{ duration: 0.5 }}   // Durée de l'animation
                >
                    L'expertise comptable, <br />
                    <span className="text-[var(--humae-violet)]">réinventée pour les entrepreneurs</span>
                </motion.h1>

                <motion.p
                    className="mt-6 max-w-2xl text-lg text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Simplifiez votre gestion, optimisez votre fiscalité et concentrez-vous sur ce qui compte vraiment : votre croissance.
                </motion.p>

                <motion.div
                    className="mt-8 flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button asChild size="lg" className="bg-[var(--humae-violet)] hover:bg-[var(--humae-violet)]/90">
                        <Link href="/contact">
                            Prendre un RDV
                            <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/nos-offres">
                            Découvrir nos offres
                        </Link>
                    </Button>
                </motion.div>

            </div>
        </section>
    );
};

export default HeroSection;