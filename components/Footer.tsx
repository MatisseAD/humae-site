// components/Footer.tsx

import Link from 'next/link';
import Image from "next/image";
import * as React from "react";
import {Separator} from "@/components/ui/separator";

// Icône pour LinkedIn (à remplacer si tu utilises une autre bibliothèque)
const LinkedInIcon = (props: React.ComponentProps<'svg'>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const FacebookIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30">
        <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
    </svg>
);


export function Footer() {
    return (
        <footer className="bg-background border-t border-gray-200">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Colonne 1: Logo et Coordonnées */}
                    <div className="space-y-4">
                        <Link href="/" className="font-bold text-lg">
                            <Image src="/assets/logo.png" alt="Logo Humae" width={90} height={46} />
                        </Link>
                        <p className="text-sm text-black">
                            Expertise comptable.
                        </p>
                        <div className="text-black">
                            <p className="text-sm">50 rue du Pré Magne, 69126 Brindas</p>
                            <p className="text-sm">04 72 49 21 90</p>
                        </div>
                    </div>

                    {/* Colonne 2: Plan du Site */}
                    <div>
                        <h4 className="font-semibold mb-4 text-black">Plan du Site</h4>
                        <ul className="space-y-2 text-sm text-black">
                            <li><Link href="/nos-offres" className="hover:text-[#F18F01]">Nos Offres</Link></li>
                            <li><Link href="/le-cabinet" className="hover:text-[#F18F01]">Le Cabinet</Link></li>
                            <li><Link href="/actualites" className="hover:text-[#F18F01]">Actualités</Link></li>
                            <li><Link href="/contact" className="hover:text-[#F18F01]">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3: Nos Solutions */}
                    <div>
                        <h4 className="font-semibold mb-4 text-black">Nos Solutions</h4>
                        <ul className="space-y-2 text-sm text-black">
                            <li><Link href="/creation-entreprise" className="hover:text-[#F18F01]">Création d'entreprise</Link></li>
                            <li><Link href="/gestion-comptable" className="hover:text-[#F18F01]">Gestion comptable</Link></li>
                            <li><Link href="/devenir-freelance" className="hover:text-[#F18F01]">Devenir Freelance</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 4: Réseaux Sociaux */}
                    <div>
                        <h4 className="font-semibold mb-4 text-black">Suivez-nous</h4>
                        <a href="https://fr.linkedin.com/company/humae-expertise-comptable" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedInIcon className="w-6 h-6 text-black hover:text-humae-violet" />
                        </a>

                        <a href="https://www.facebook.com/HumaeBrindas#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" >
                            <FacebookIcon  className="w-6 h-6 text-black hover:text-humae-violet " />
                        </a>

                    </div>
                </div>
            </div>

            {/* Barre inférieure pour le copyright et les mentions légales */}
            <div className="border-t border-gray-200">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-black">
                    <p>&copy; {new Date().getFullYear()} Humae. Tous droits réservés.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="/mentions-legales" className="hover:text-[#F18F01]">Mentions Légales</Link>
                        <Link href="/politique-de-confidentialite" className="hover:text-[#F18F01]">Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

