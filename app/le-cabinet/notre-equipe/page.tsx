
import type { Metadata } from 'next';
import { TeamCard } from '@/components/TeamCard';

export const metadata: Metadata = {
    title: 'Notre Équipe - Le Cabinet Humae',
};

const teamMembers = [
    {
        name: 'Céline MONIN',
        role: 'Expert-Comptable, Gérante',
        imageSrc: '/assets/team/team-celine.jpg',
        linkedinUrl: 'https://fr.linkedin.com/in/celine-monin-a68805ba',
    },
    {
        name: 'Christian PERRIN',
        role: 'Collaborateur Comptable',
        imageSrc: '/assets/team/team-christian.jpg',
        linkedinUrl: '#',
    },
];

export default function NotreEquipePage() {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Une équipe à votre service</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Des professionnels passionnés et engagés pour votre réussite.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-4xl mx-auto">
                    {teamMembers.map((member) => (
                        <TeamCard key={member.name} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
}