// components/HeroSection.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section className="bg-white text-gray-800">
            <div className="container mx-auto flex flex-col items-center px-4 py-20 md:py-24 text-center">

                <motion.h1
                    // On ajuste la taille du texte : 4xl sur mobile, 5xl sur tablette, 6xl sur grand écran
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    L'expertise comptable, <br />
                    <span className="text-[var(--humae-violet)]">réinventée pour les entrepreneurs</span>
                </motion.h1>

                <motion.p
                    // On ajuste la taille du texte pour mobile (text-base) et plus grand (md:text-lg)
                    className="mt-6 max-w-2xl text-base md:text-lg text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Simplifiez votre gestion, optimisez votre fiscalité et concentrez-vous sur ce qui compte vraiment : votre croissance.
                </motion.p>

                {/* La classe flex-wrap gère déjà bien le passage à la ligne des boutons sur mobile. C'est parfait. */}
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
                        <Link href="/nos-solutions">
                            Découvrir nos offres
                        </Link>
                    </Button>
                </motion.div>

            </div>
        </section>
    );
};

export default HeroSection;