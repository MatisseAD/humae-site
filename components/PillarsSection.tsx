// components/PillarsSection.tsx
import { BuildingOffice2Icon, CpuChipIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import SectionSeparator from "@/components/SectionSeparator";

const features = [
    {
        name: 'Création d\'entreprise simplifiée',
        description: 'Nous transformons votre projet en une entreprise solide, en choisissant le statut le plus adapté pour vous.',
        icon: BuildingOffice2Icon,
    },
    {
        name: 'Pilotage serein avec nos outils',
        description: 'Prenez les bonnes décisions grâce à des outils clairs pour suivre vos finances et votre performance en temps réel.',
        icon: CpuChipIcon,
    },
    {
        name: 'Des conseillers dédiés',
        description: 'Vous n\'êtes jamais seul. Une équipe de comptables et de fiscalistes vous accompagne à chaque étape.',
        icon: UserGroupIcon,
    },
]

const PillarsSection = () => {
    return (
        <section className="relative bg-gray-50 pt-24 pb-24">

            <SectionSeparator variant="rounded" color="#FFFFFF" />

            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Un accompagnement complet, à chaque étape
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        Plus besoin de jongler entre des dizaines de services. Tout est là, en toute simplicité.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-12 text-center md:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name}>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-humae-violet text-white">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <h3 className="mt-6 font-semibold text-gray-900">{feature.name}</h3>
                            <p className="mt-2 text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PillarsSection;