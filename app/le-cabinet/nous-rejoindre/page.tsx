// app/le-cabinet/nous-rejoindre/page.tsx

import { createPageMetadata } from '@/lib/siteMetadata';

export const metadata = createPageMetadata({
    title: 'Nous Rejoindre - Le Cabinet Humae',
    description: 'Humae ne recrute pas de nouveaux collaborateurs pour le moment.',
    path: '/le-cabinet/nous-rejoindre',
});

export default function NousRejoindrePage() {
    return (
        <div className="bg-white">
            <div className="container mx-auto max-w-5xl px-4 py-20">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Rejoignez l&apos;aventure Humae
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Humae ne recherche pas de nouveaux collaborateurs pour le moment.
                    </p>
                </div>
                <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                    <p className="text-lg text-gray-700">
                        Les candidatures spontanées et les candidatures aux offres sont temporairement fermées.
                    </p>
                    <p className="mt-4 text-base text-gray-600">
                        Cette page sera mise à jour dès l&apos;ouverture de nouveaux recrutements.
                    </p>
                </div>
            </div>
        </div>
    );
}
