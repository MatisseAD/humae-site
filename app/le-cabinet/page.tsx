import { createPageMetadata } from '@/lib/siteMetadata';

export const metadata = createPageMetadata({
    title: 'Présentation - Le Cabinet Humae',
    description: 'Découvrez la mission et la philosophie de Humae, votre partenaire comptable.',
    path: '/le-cabinet',
});


export default function CabinetHomePage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-16">
            <div className="prose lg:prose-lg mx-auto text-center">
                <h2>Notre Mission</h2>
                <p>
                    Chez Humae, nous sommes convaincus que derrière chaque bilan se cache un projet de vie, une ambition. Notre mission est de vous donner les outils et la sérénité nécessaires pour la réaliser, en alliant la rigueur des chiffres à la force de la relation humaine.
                </p>
                <p>
                    Nous avons fondé ce cabinet pour dépoussiérer l&apos;image de l&apos;expertise comptable et en faire un véritable levier de croissance stratégique pour les entrepreneurs modernes.
                </p>
            </div>
        </div>
    );
}
