// components/FeatureSectionCreate.tsx
import { CheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import SectionSeparator from './SectionSeparator';

const features = [
    { name: 'Aide au choix du statut juridique', description: 'SASU, EURL... Nous analysons votre projet pour trouver le statut le plus avantageux.' },
    { name: 'Étude de l\'éligibilité aux aides', description: 'ACRE, ARCE... Ne passez à côté d\'aucune aide à la création.' },
    { name: 'Formalités 100% en ligne', description: 'De la rédaction des statuts à l\'immatriculation, nous gérons toute la paperasse.' },
]

const FeatureSectionCreate = () => {
    return (
        <span className="relative" >
            <SectionSeparator variant="wave" color="#FFFF" />
            <div className="bg-gray-50 py-24">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    {/* Remplace cette image par une image pertinente pour Humae */}
                    <Image src="/assets/image.jpg" alt="Création d'entreprise" width={500} height={400} className="rounded-lg shadow-lg" />
                </div>
                <div>
                    <h2 className="text-base font-semibold leading-7 text-[var(--humae-violet)]">Vous vous lancez ?</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Laissez-nous vous propulser
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Votre création d'entreprise entièrement prise en main, du choix de la structure à la gestion des démarches.
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-9">
                                <dt className="inline font-semibold text-gray-900">
                                    <CheckIcon className="absolute left-1 top-1 h-5 w-5 text-[var(--humae-orange)]" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="inline">: {feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
        </span>
    )
}

export default FeatureSectionCreate;