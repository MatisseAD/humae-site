// components/UnderConstruction.tsx
'use client';

import { motion } from 'framer-motion';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const UnderConstruction = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <WrenchScrewdriverIcon className="w-20 h-20 mb-6 text-[var(--humae-orange)]" />
            </motion.div>

            <motion.h1
                className="text-3xl md:text-4xl font-bold text-[var(--humae-violet)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Page en cours de construction
            </motion.h1>

            <motion.p
                className="mt-4 max-w-md text-lg text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                Nous travaillons activement sur cette section. Elle sera bientôt disponible avec de nouvelles informations et fonctionnalités.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Button asChild className="mt-8">
                    <Link href="/">Retourner à l'accueil</Link>
                </Button>
            </motion.div>
        </div>
    );
};

export default UnderConstruction;