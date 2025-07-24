'use client';

import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

const testimonials = [
    {
        quote: "Humae a transformé ma vision de la comptabilité. C'est simple, clair, et leur équipe est toujours disponible. Je peux enfin me concentrer à 100% sur mon métier.",
        name: 'Alice Dubois',
        role: 'Graphiste Freelance',
        imageSrc: '/assets/client-1.jpg', // Remplace par les vrais chemins de tes images
    },
    {
        quote: "Le passage de la micro-entreprise à la SASU me faisait peur. L'équipe Humae a tout géré de A à Z avec une pédagogie et une efficacité remarquables. Un vrai partenaire de croissance.",
        name: 'Marc Petit',
        role: 'Développeur Back-End',
        imageSrc: '/assets/client-2.jpg',
    },
    {
        quote: "Leurs conseils en optimisation fiscale m'ont permis d'économiser un montant considérable. C'est bien plus qu'un simple cabinet comptable, c'est un véritable atout stratégique.",
        name: 'Sophie Martin',
        role: 'Gérante E-commerce',
        imageSrc: '/assets/client-3.jpg',
    },
    {
        quote: "Enfin des outils modernes pour suivre ma trésorerie en temps réel. Leur approche digitale change la donne. Je recommande les yeux fermés.",
        name: 'Julien Moreau',
        role: 'Consultant en Marketing',
        imageSrc: '/assets/client-4.jpg',
    },
];

export function TestimonialSection() {
    return (
        <section className="w-full bg-white py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Ce que nos clients disent de nous
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Leur réussite est notre plus grande fierté.
                    </p>
                </div>

                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">

                                    <Card>
                                        <CardContent className="flex flex-col items-center text-center p-6">
                                            <Image
                                                src={testimonial.imageSrc}
                                                alt={`Photo de ${testimonial.name}`}
                                                width={80}
                                                height={80}
                                                className="rounded-full mb-4"
                                            />
                                            <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                                            <div className="mt-4">
                                                <p className="font-bold text-gray-900">{testimonial.name}</p>
                                                <p className="text-sm text-humae-violet">{testimonial.role}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
}