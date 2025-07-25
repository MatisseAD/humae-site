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
        <span className="relative">
            <SectionSeparator variant="wave" color="#FFFF" />
            <div className="bg-gray-50 py-12 sm:py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Image Container */}
                        <div className="order-2 lg:order-1 flex justify-center">
                            <div className="w-full max-w-md sm:max-w-lg lg:max-w-none">
                                <Image
                                    src="/assets/image.jpg"
                                    alt="Création d'entreprise"
                                    width={500}
                                    height={400}
                                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Content Container */}
                        <div className="order-1 lg:order-2">
                            <h2 className="text-base font-semibold leading-7 text-[var(--humae-violet)]">
                                Vous vous lancez ?
                            </h2>
                            <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                                Laissez-nous vous propulser
                            </p>
                            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
                                Votre création d&apos;entreprise entièrement prise en main, du choix de la structure à la gestion des démarches.
                            </p>

                            {/* Features List */}
                            <dl className="mt-8 sm:mt-10 space-y-6 sm:space-y-8 text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <CheckIcon
                                                className="absolute left-1 top-1 h-5 w-5 text-[var(--humae-orange)]"
                                                aria-hidden="true"
                                            />
                                            {feature.name}
                                        </dt>
                                        <dd className="inline">
                                            <span className="mx-1">:</span>
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    )
}

export default FeatureSectionCreate;