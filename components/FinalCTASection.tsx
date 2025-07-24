// components/FinalCTASection.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import SectionSeparator from "@/components/SectionSeparator";

const FinalCTASection = () => {
    return (
        <section className="bg-[var(--humae-violet)] text-white relative">
            <SectionSeparator color="#FFFF" variant="wave" />
            <div className="container mx-auto px-4 py-24 text-center">

                <motion.h2
                    className="text-3xl md:text-4xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Prêt à passer à la vitesse supérieure ?
                </motion.h2>

                <motion.p
                    className="mt-4 max-w-2xl mx-auto text-lg text-white/80"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Planifions un premier échange gratuit et sans engagement pour discuter de vos besoins et voir comment nous pouvons vous aider à atteindre vos objectifs.
                </motion.p>

                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button asChild size="lg" className="bg-[var(--humae-orange)] hover:bg-[var(--humae-orange)]/90 text-white">
                        <Link href="/contact">
                            Prendre un RDV
                        </Link>
                    </Button>
                </motion.div>

            </div>
        </section>
    );
};

export default FinalCTASection;