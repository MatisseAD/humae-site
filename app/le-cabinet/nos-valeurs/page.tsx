'use client';

import {motion} from 'framer-motion';
import {HeartIcon, ScaleIcon, SparklesIcon} from '@heroicons/react/24/outline';

const values = [
    {
        name: 'Équilibre',
        description: 'Nous sommes convaincus que la performance d\'une entreprise repose sur un équilibre juste. L\'équilibre entre la rigueur des chiffres et la flexibilité nécessaire à l\'entrepreneuriat, entre les obligations légales et votre bien-être de dirigeant.',
        icon: ScaleIcon,
        iconColor: 'text-[var(--humae-violet)]',
        bgColor: 'bg-[var(--humae-violet)]/10',
    },
    {
        name: 'Proximité',
        description: 'Chaque client est un partenaire. Nous construisons une relation de confiance et d\'écoute durable en étant accessibles, réactifs et toujours à vos côtés pour comprendre les spécificités de votre métier et de vos ambitions.',
        icon: HeartIcon,
        iconColor: 'text-[var(--humae-orange)]',
        bgColor: 'bg-[var(--humae-orange)]/10',
    },
    {
        name: 'Clarté',
        description: 'Notre métier est de rendre simple ce qui est complexe. Nous nous engageons à traduire le jargon comptable et fiscal en conseils clairs, transparents et directement actionnables pour que vous preniez toujours les meilleures décisions.',
        icon: SparklesIcon,
        iconColor: 'text-gray-700',
        bgColor: 'bg-gray-200',
    },
]


export default function NosValeursPage() {
    return (
        <div className="bg-white">
            <div className="container mx-auto max-w-5xl px-4 py-24">

                <div className="space-y-20">

                    {values.map((value, index) => (
                        <motion.div
                            key={value.name}
                            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className={`flex-shrink-0 p-6 rounded-full ${value.bgColor}`}>
                                <value.icon className={`w-16 h-16 ${value.iconColor}`} />
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold text-gray-900">{value.name}</h3>
                                <p className="mt-4 text-lg text-gray-600">{value.description}</p>
                            </div>
                        </motion.div>
                    ))}

                </div>

            </div>
        </div>
    );
}