// components/TeamCard.tsx
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

const LinkedInIcon = (props: React.ComponentProps<'svg'>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

interface TeamCardProps {
    name: string;
    role: string;
    imageSrc: string;
    linkedinUrl?: string;
}

export const TeamCard = ({ name, role, imageSrc, linkedinUrl }: TeamCardProps) => {
    const [clickCount, setClickCount] = useState(0);

    const handleImageClick = useCallback(() => {
        if (name === 'Christian PERRIN') {
            const newCount = clickCount + 1;
            setClickCount(newCount);

            if (newCount === 3) {
                // Lancer les confettis !
                if (process.env.NODE_ENV === 'development') {
                    console.log("Ce message n'apparaîtra qu'en développement");
                }

                const duration = 10000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 40, spread: 400, ticks: 500, zIndex: 0 };

                function randomInRange(min: number, max: number) {
                    return Math.random() * (max - min) + min;
                }

                const interval: any = setInterval(() => {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 50 * (timeLeft / duration);

                    confetti({
                        ...defaults,
                        particleCount,
                        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
                    });
                }, 250);

                // Réinitialiser le compteur
                setClickCount(0);
            }
        }
    }, [clickCount, name]);

    return (
        <div className="text-center">
            <div 
                className="relative w-48 h-48 mx-auto mb-4 cursor-pointer" 
                onClick={handleImageClick}
            >
                <Image
                    src={imageSrc}
                    alt={`Photo de ${name}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full transition-transform hover:scale-105"
                />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-[var(--humae-violet)]">{role}</p>
            {linkedinUrl && (
                <div className="mt-2">
                    <Link href={linkedinUrl} passHref>
                        <LinkedInIcon target="_blank" className="w-6 h-6 mx-auto text-gray-400 hover:text-[var(--humae-orange)]" />
                    </Link>
                </div>
            )}
        </div>
    );
};