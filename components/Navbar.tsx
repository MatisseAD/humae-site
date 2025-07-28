// components/Navbar.tsx

'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Assure-toi que ce chemin est correct
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';
import {
    BuildingStorefrontIcon,
    UserCircleIcon,
    CalculatorIcon,
    UsersIcon,
    HeartIcon,
    WrenchScrewdriverIcon,
    ScaleIcon,
    DocumentDuplicateIcon,
    DocumentArrowDownIcon,
    CurrencyEuroIcon,
    UserGroupIcon,
    BriefcaseIcon,
    SparklesIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from "next/image";


// Les données pour le menu "Nos Solutions"
const solutions: { title: string; href: string; description: string, icon: React.ElementType }[] = [
    {
        title: 'Créer mon entreprise',
        href: '/nos-solutions/creation-entreprise',
        description: 'De l\'idée aux statuts, nous vous guidons à chaque étape.',
        icon: BuildingStorefrontIcon,
    },
    {
        title: 'Devenir Freelance',
        href: '/nos-solutions/devenir-freelance',
        description: 'Choisissez le bon statut et optimisez vos revenus dès le départ.',
        icon: UserCircleIcon,
    },
    {
        title: 'Gestion Comptable & Fiscale',
        href: '/nos-solutions/gestion-comptable',
        description: 'Concentrez-vous sur votre métier, nous nous occupons du reste.',
        icon: CalculatorIcon,
    },
    {
        title: 'Gestion Sociale & Paie',
        href: '/nos-solutions/gestion-sociale',
        description: 'Établissement des bulletins de paie et déclarations sociales.',
        icon: UsersIcon,
    },
    {
        title: 'Gestion de patrimoine',
        href: '/nos-solutions/gestion-patrimoine',
        description: 'Optimisez votre fiscalité et préparez votre avenir.',
        icon: SparklesIcon,
    }
];

const cabinet: { title: string; href: string; description: string, icon: React.ElementType }[] = [
    {
        title: "Nos Valeurs",
        href: '/le-cabinet/nos-valeurs',
        description: 'Découvrez les valeurs qui nous animent et notre engagement envers nos clients.',
        icon: HeartIcon,
    },
    {
        title: "Notre Équipe",
        href: '/le-cabinet/notre-equipe',
        description: 'Rencontrez les experts qui vous accompagnent au quotidien.',
        icon: UserGroupIcon,
    },
    {
        title: "Nos outils",
        href: '/le-cabinet/nos-outils',
        description: 'Découvrez les outils que nous utilisons pour optimiser votre gestion.',
        icon: WrenchScrewdriverIcon,
    },
    {
        title: "Nous rejoindre",
        href: '/le-cabinet/nous-rejoindre',
        description: 'Rejoignez une équipe dynamique et engagée.',
        icon: BriefcaseIcon,
    },
];

const outils: { title: string; href: string; description: string, icon: React.ElementType }[] = [
    {
        title: 'Simulateur de Charges',
        href: '/outils/simulateur-charges',
        description: 'Calculez vos charges sociales et fiscales en quelques clics.',
        icon: ScaleIcon,
    },
    {
        title: 'Comparateur de Statuts',
        href: '/outils/comparateur-statuts',
        description: 'Comparez les différents statuts juridiques pour choisir celui qui vous convient le mieux.',
        icon: DocumentDuplicateIcon,
    },
    {
        title: 'Modèles de Documents',
        href: '/outils/modeles-documents',
        description: 'Accédez à une bibliothèque de modèles de documents juridiques et administratifs.',
        icon: DocumentArrowDownIcon,
    },
    {
        title: 'Calculateur de TVA',
        href: '/outils/calculateur-tva',
        description: 'Calculez rapidement la TVA à appliquer sur vos factures.',
        icon: CurrencyEuroIcon,
    },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        // 1. On ajoute un conteneur parent avec "relative"
        <div className="relative bg-white border-b">
            <header className="flex items-center justify-between p-4"> {/* 2. On peut retirer "relative" et "border-b" d'ici */}
                <Link href="/" className="font-bold text-lg">
                    <Image src="/assets/logo.png" alt="Logo Humae" width={90} height={46} />
                </Link>

                {/* Bouton pour le menu mobile */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        {mobileMenuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Navigation pour ordinateur */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        {/* ... (tout le contenu de NavigationMenuList reste le même) ... */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Nos Solutions</NavigationMenuTrigger>
                            {/* ... */}
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Le Cabinet</NavigationMenuTrigger>
                            {/* ... */}
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Outils</NavigationMenuTrigger>
                            {/* ... */}
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/actu" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Actualités
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/contact" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Contact
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <Button className="hidden md:inline-flex text-white" variant="humae" asChild>
                    <Link target="_blank" href="https://humae.fulll.io">
                        Espace client
                    </Link>
                </Button>
            </header>

            {/* Menu Mobile */}
            {mobileMenuOpen && (
                // 3. Ce menu est maintenant correctement positionné par rapport au conteneur principal
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="solutions">
                            <AccordionTrigger className="px-4 py-3">Nos Solutions</AccordionTrigger>
                            <AccordionContent>
                                <ul className="flex flex-col space-y-1 p-2">
                                    {solutions.map((item) => (
                                        <li key={item.title}>
                                            <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-md hover:bg-gray-100">
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="cabinet">
                            <AccordionTrigger className="px-4 py-3">Le Cabinet</AccordionTrigger>
                            <AccordionContent>
                                <ul className="flex flex-col space-y-1 p-2">
                                    {cabinet.map((item) => (
                                        <li key={item.title}>
                                            <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-md hover:bg-gray-100">
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="outils">
                            <AccordionTrigger className="px-4 py-3">Outils</AccordionTrigger>
                            <AccordionContent>
                                <ul className="flex flex-col space-y-1 p-2">
                                    {outils.map((item) => (
                                        <li key={item.title}>
                                            <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-md hover:bg-gray-100">
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <div className="border-t">
                            <Link href="/actu" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 hover:bg-gray-100">Actualités</Link>
                        </div>
                        <div className="border-t">
                            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 hover:bg-gray-100">Contact</Link>
                        </div>
                        <div className="p-4 border-t bg-gray-50">
                            <Button className="w-full text-white" variant="humae" asChild>
                                <Link target="_blank" href="https://humae.fulll.io" onClick={() => setMobileMenuOpen(false)}>
                                    Espace client
                                </Link>
                            </Button>
                        </div>
                    </Accordion>
                </div>
            )}
        </div>
    );
}

// Petit composant réutilisable pour les items du menu
interface ListItemProps {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
    href: string;
    className?: string;
}

const listItemBaseStyles = 'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors';
const listItemStateStyles = 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground';
const iconStyles = 'w-5 h-5 inline-block mr-2';
const titleContainerStyles = 'flex items-center text-sm font-medium leading-none';
const descriptionStyles = 'line-clamp-2 text-sm leading-snug text-muted-foreground';

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
    ({className, title, children, icon: Icon, href, ...props}, ref) => (
        <li ref={ref}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={cn(
                        listItemBaseStyles,
                        listItemStateStyles,
                        className
                    )}
                    {...props}
                >
                    <div className={titleContainerStyles}>
                        <Icon className="h-5 w-5 mr-2 text-[var(--humae-violet)]" />
                        {title}
                    </div>
                    <p className={descriptionStyles}>{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
);

ListItem.displayName = 'ListItem';