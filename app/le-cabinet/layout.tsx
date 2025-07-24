// app/le-cabinet/layout.tsx
'use client'

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';


const subNavigation = [
    { name: 'Présentation', href: '/le-cabinet' },
    { name: 'Nos Valeurs', href: '/le-cabinet/nos-valeurs' },
    { name: 'Notre Équipe', href: '/le-cabinet/notre-equipe' },
    {name: "Nos Outils", href: '/le-cabinet/nos-outils' },
    { name: 'Nous Rejoindre', href: '/le-cabinet/nous-rejoindre' },
];

export default function CabinetLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="bg-white">
            <header className="bg-gray-50 border-b">
                <div className="container mx-auto px-4 py-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--humae-violet)]">
                        Le Cabinet Humae
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        L'humain, au cœur de la comptabilité.
                    </p>
                </div>
            </header>

            <nav className="border-b sticky top-0 bg-white z-10">
                <div className="container mx-auto px-4 flex justify-center">
                    {subNavigation.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className={cn(
                                'py-4 px-6 text-sm font-medium border-b-2',
                                pathname === item.href
                                    ? 'border-[var(--humae-violet)] text-[var(--humae-violet)]'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>

            <main>
                {children}
            </main>
        </div>
    );
}