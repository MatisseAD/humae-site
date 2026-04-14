'use client';

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"

export const Welcome = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="text-black">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-black">Bienvenue sur le nouveau site Humae</AlertDialogTitle>
                    <AlertDialogDescription className="text-black">
                        Nous sommes ravis de vous accueillir sur notre nouveau site web. Découvrez nos services et comment nous pouvons vous accompagner dans la gestion de votre entreprise.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-black">Fermer</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}