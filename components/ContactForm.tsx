// components/ContactForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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

import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {JSX} from "react";
import {useState} from "react";
import {Separator} from "@/components/ui/separator";

// 1. Définition du schéma de validation avec Zod
const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
    }),
    email: z.string().email({
        message: 'Veuillez entrer une adresse e-mail valide.',
    }),
    subject: z.string().optional(),
    message: z.string().min(10, {
        message: 'Le message doit contenir au moins 10 caractères.',
    }),
});

const ALERT_CONTAINER_STYLES = "grid w-full max-w-xl items-start gap-4";
const SUCCESS_TITLE = "Email envoyé avec succès";
const SUCCESS_DESCRIPTION = "Merci pour votre message, nous vous répondrons dans les plus brefs délais.";

export function AlertSuccessful(): JSX.Element {
    return (
        <div className={ALERT_CONTAINER_STYLES}>
            <Alert variant="success">
                <CheckCircle2Icon />
                <AlertTitle>{SUCCESS_TITLE}</AlertTitle>
                <AlertDescription>
                    {SUCCESS_DESCRIPTION}
                </AlertDescription>
            </Alert>
        </div>
    );
}


export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);
            // Simulation d'un appel API
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(values);
            setShowSuccess(true);
            form.reset();
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom complet</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jean Martin" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse e-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="jean.martin@exemple.fr" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sujet (Optionnel)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Demande de devis" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit" 
                        className="hover:cursor-pointer w-full bg-[#6A4087] hover:bg-[#6A4087]/90"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                </form>
            </Form>

            {showSuccess && (
                <div className="space-y-8">
                    <Separator className="my-4" />
                    <AlertSuccessful />
                </div>
            )}

        </>
    );
}