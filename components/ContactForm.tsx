// components/ContactForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// On importe notre Server Action et le système de notifications
import { toast } from "sonner";
import { sendEmail } from '@/app/action';

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

// Le schéma de validation ne change pas
const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
    }).max(120),
    email: z.string().email({
        message: 'Veuillez entrer une adresse e-mail valide.',
    }).max(254),
    subject: z.string().max(200).optional(),
    message: z.string().min(10, {
        message: 'Le message doit contenir au moins 10 caractères.',
    }).max(10000),
    website: z.string().max(200).optional(),
});

export function ContactForm({ defaultSubject = '' }: { defaultSubject?: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: defaultSubject,
            message: '',
            website: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await sendEmail(values);

        if (result.success) {
            toast.success("Votre message a bien été envoyé !");
            form.reset();
        } else {
            toast.error(result.rateLimited
                ? "Trop de tentatives. Veuillez réessayer dans quelques minutes."
                : "Une erreur est survenue. Veuillez réessayer.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <input
                    type="text"
                    {...form.register('website')}
                    className="absolute -left-[9999px] h-px w-px"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                />

                {/* Champ pour le nom */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" maxLength={120} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Champ pour l'email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adresse e-mail</FormLabel>
                            <FormControl>
                                <Input type="email" autoComplete="email" placeholder="john.doe@exemple.com" maxLength={254} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Champ pour le sujet */}
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sujet (Optionnel)</FormLabel>
                            <FormControl>
                                <Input placeholder="Demande de devis" maxLength={200} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Champ pour le message */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Votre message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Bonjour, je souhaiterais obtenir des informations sur..."
                                    className="resize-none"
                                    rows={5}
                                    maxLength={10000}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full bg-[var(--humae-violet)] hover:bg-[var(--humae-violet)]/90"
                    disabled={form.formState.isSubmitting} // On désactive le bouton pendant l'envoi
                >
                    {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
            </form>
        </Form>
    );
}
