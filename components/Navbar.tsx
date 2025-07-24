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
    return (
        <header className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="font-bold text-lg">
                <Image src="/assets/logo.png" alt="Logo Humae" width={90} height={46} />
            </Link>
            <NavigationMenu>
                <NavigationMenuList>

                    {/* Menu "Nos Solutions" */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Nos Solutions</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {solutions.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                        icon={component.icon}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Menu "Le Cabinet" */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Le Cabinet</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {cabinet.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                        icon={component.icon}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    { /* Lien simple "Outils" */}

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Outils</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {outils.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                        icon={component.icon}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Lien simple "Acutalités" */}
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/actu" className={navigationMenuTriggerStyle()}>
                                Actualités
                        </NavigationMenuLink>
                    </NavigationMenuItem>


                    {/* Lien simple "Contact" */}
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/contact" className={navigationMenuTriggerStyle()}>
                                Contact
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>

            <Button className="text-white" variant="humae" asChild>
                <Link target="_blank" href="https://humae.fulll.io">
                    Espace client
                </Link>
            </Button>
        </header>
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