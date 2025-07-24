// app/actions.ts
'use server';

import { Resend } from 'resend';
import { z } from 'zod';

// On reprend le schéma de validation de notre formulaire de contact
const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email().max(254),
    subject: z.string().optional(),
    message: z.string().min(10),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: z.infer<typeof formSchema>) {
    const validatedData = formSchema.parse(formData);

    try {
        const data = await resend.emails.send({
            from: 'Humae Site <onboarding@resend.dev>', // Doit être ce domaine pour l'instant
            to: ['matisse.martayan@gmail.com'],
            subject: `Nouveau message de ${validatedData.name} : ${validatedData.subject || 'Contact depuis le site'}`,
            replyTo: validatedData.email,
            html: `<p>Vous avez reçu un nouveau message de <strong>${validatedData.name}</strong> (${validatedData.email}).</p><p>Message :</p><p>${validatedData.message}</p>`,
        });

        return { success: true, data };
    } catch (error) {
        return { success: false, error };
    }
}