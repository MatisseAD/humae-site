
import { TeamCard } from '@/components/TeamCard'
import { getTeam } from '@/lib/teamService'
import { createPageMetadata } from '@/lib/siteMetadata'

export const dynamic = 'force-dynamic'

export const metadata = createPageMetadata({
    title: 'Notre Équipe - Le Cabinet Humae',
    description: 'Découvrez les professionnels Humae qui accompagnent votre entreprise au quotidien.',
    path: '/le-cabinet/notre-equipe',
})

export default async function NotreEquipePage() {
    const teamMembers = await getTeam()
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
                        <TeamCard key={member.id} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
}
