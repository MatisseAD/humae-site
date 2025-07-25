// components/FeatureSectionManage.tsx
import { CheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import SectionSeparator from "@/components/SectionSeparator";

const features = [
    { name: 'Tenue de vos comptes', description: 'Nous nous occupons de votre comptabilité au quotidien.' },
    { name: 'Déclarations fiscales et sociales', description: 'TVA, impôts... Soyez serein, nous gérons toutes vos échéances.' },
    { name: 'Bilan annuel et dépôt des comptes', description: 'Nous produisons votre bilan et nous occupons des formalités de dépôt.' },
]

const FeatureSectionManage = () => {
    return (
            <section className="bg-white py-24 relative">
                <SectionSeparator variant="rounded" color="#f9fafb" />
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="md:order-2">
                        <Image src="/assets/image.jpg" alt="Gestion comptable" width={500} height={400}
                               className="rounded-lg shadow-lg"/>
                    </div>
                    <div className="md:order-1">
                        <h2 className="text-base font-semibold leading-7 text-[var(--humae-violet)]">Vos affaires au
                            carré</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Votre gestion comptable, sans effort
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Votre comptabilité est assurée par Humae, cabinet inscrit à l&apos;Ordre des Experts-Comptables.
                        </p>
                        <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-9">
                                    <dt className="inline font-semibold text-gray-900">
                                        <CheckIcon className="absolute left-1 top-1 h-5 w-5 text-[var(--humae-orange)]"
                                                   aria-hidden="true"/>
                                        {feature.name}
                                    </dt>
                                    <dd className="inline">: {feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>
    )
}

export default FeatureSectionManage;