'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PaperClipIcon } from '@heroicons/react/24/outline';


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const formSchema = z.object({
    name: z.string().min(2, "Le nom est requis."),
    email: z.string().email("L'adresse e-mail n'est pas valide."),
    coverLetter: z.string().optional(),
    cv: z
        .any()
        .refine((files) => files?.[0], "Un CV au format PDF est requis.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `La taille maximale du fichier est de 5MB.`)
        .refine(
            (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
            "Seuls les formats .pdf sont acceptés."
        ),
});

export function ApplicationForm() {
    const [fileName, setFileName] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const fileInputRef = form.register('cv');

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Données du formulaire prêtes à être envoyées :", values);
        // Ici, le code pour envoyer les données à une API backend irait.
        // API
        // API
        // Pour la simulation, on peut juste afficher une alerte.
        alert("Candidature envoyée avec succès (simulation) !");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField name="name" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Nom complet</FormLabel><FormControl><Input placeholder="Jean Martin" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="email" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Adresse e-mail</FormLabel><FormControl><Input placeholder="jean.martin@gmail.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField name="cv" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Curriculum Vitae (PDF, 5MB max)</FormLabel>
                        <FormControl>
                            <>
                                <Input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf"
                                    {...fileInputRef}
                                    onChange={(event) => {
                                        field.onChange(event.target.files);
                                        setFileName(event.target.files?.[0]?.name || null);
                                    }}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    onClick={() => (document.getElementById('cv-input')?.click())} // On simule le clic
                                >
                                    <PaperClipIcon className="w-5 h-5 mr-2" />
                                    {fileName || 'Cliquez pour choisir un fichier'}
                                </Button>
                            </>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <input type="file" id="cv-input" className="hidden" {...fileInputRef} />

                <FormField name="coverLetter" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Lettre de motivation (Optionnel)</FormLabel><FormControl><Textarea placeholder="Pourquoi souhaitez-vous rejoindre Humae ?" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <Button type="submit" className="w-full bg-humae-violet hover:bg-humae-violet/90">
                    Envoyer ma candidature
                </Button>
            </form>
        </Form>
    );
}