
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4 text-black">
            <ExclamationTriangleIcon className="w-16 h-16 mb-4 text-[#F18F01]" />

            <h1 className="text-6xl font-bold text-black">404</h1>

            <h2 className="mt-4 text-2xl font-semibold text-black">
                Oups ! Page non trouvée
            </h2>

            <p className="mt-2 max-w-md text-black">
                La page que vous essayez de joindre n'existe pas, a été déplacée ou est temporairement indisponible.
            </p>

            <Button asChild className="mt-8">
                <Link href="/">Retourner à l'accueil</Link>
            </Button>
        </div>
    );
}