// components/layouts/SolutionPageLayout.tsx

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

interface SolutionPageLayoutProps {
    title: string;
    Icon: React.ElementType;
    children: React.ReactNode;
}

export const SolutionPageLayout = ({ title, Icon, children }: SolutionPageLayoutProps) => {
    return (
        <div className="bg-white">
            {/* En-tête de la page (partie commune) */}
            <header className="bg-gray-50 py-24 text-center">
                <div className="container mx-auto px-4">
                    <Icon className="w-16 h-16 mx-auto text-[var(--humae-orange)] mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--humae-violet)]">{title}</h1>
                </div>
            </header>

            {/* Contenu détaillé et unique de la solution (partie variable) */}
            <main className="container mx-auto max-w-4xl px-4 py-16">
                {children}
            </main>

            {/* Appel à l'action (partie commune) */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold">Prêt à discuter de votre projet ?</h2>
                    <p className="mt-4 text-lg text-gray-600">Contactez-nous pour un premier échange gratuit.</p>
                    <Button asChild size="lg" className="mt-8 bg-[var(--humae-orange)] hover:bg-[var(--humae-orange)]/90">
                        <Link href="/contact">Prendre RDV</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};