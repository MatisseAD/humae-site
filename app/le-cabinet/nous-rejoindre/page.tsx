// app/le-cabinet/nous-rejoindre/page.tsx

import type { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationForm } from '@/components/ApplicationForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Nous Rejoindre - Le Cabinet Humae',
    description: 'Rejoignez une équipe dynamique et bienveillante. Découvrez nos offres d\'emploi ou envoyez une candidature spontanée.',
};

const jobOpenings = [
    { title: 'Comptable Confirmé(e)', category: 'comptable', location: 'Brindas (69)', type: 'CDI' },
    { title: 'Stage Assistant(e) Comptable', category: 'stage', location: 'Lyon (69)', type: 'Stage 6 mois' },
];

export default function NousRejoindrePage() {
    return (
        <div className="bg-white">
            <div className="container mx-auto max-w-5xl px-4 py-20">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Rejoignez l'aventure Humae
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Nous cherchons des personnes passionnées, qui partagent nos valeurs de proximité et de clarté, pour réinventer ensemble le métier de l'expertise comptable.
                    </p>
                </div>

                <Tabs defaultValue="tous" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="tous">Tous les postes</TabsTrigger>
                        <TabsTrigger value="comptable">Comptable</TabsTrigger>
                        <TabsTrigger value="expert">Expert-Comptable</TabsTrigger>
                        <TabsTrigger value="stage">Stage</TabsTrigger>
                    </TabsList>

                    <TabsContent value="tous">
                        {jobOpenings.length > 0 ? (
                            <div className="space-y-4">
                                {jobOpenings.map((job, index) => (
                                    <div key={index} className="border p-6 rounded-lg flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold text-lg">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.location} - {job.type}</p>
                                        </div>
                                        <Button asChild><Link href={`/contact?subject=Candidature: ${job.title}`}>Postuler</Link></Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 py-8">Il n'y a pas d'offres d'emploi pour le moment, mais nous sommes toujours ouverts aux candidatures spontanées !</p>
                        )}
                    </TabsContent>
                </Tabs>

                <div className="mt-20 pt-12 border-t">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Candidature Spontanée</h2>
                        <p className="mt-4 text-lg text-gray-600">Aucune offre ne vous correspond ? Envoyez-nous votre profil.</p>
                    </div>
                    <div className="max-w-xl mx-auto">
                        <ApplicationForm />
                    </div>
                </div>

            </div>
        </div>
    );
}