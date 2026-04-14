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

/** Escape special HTML characters to prevent XSS in email body */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

export async function sendEmail(formData: z.infer<typeof formSchema>) {
    const validatedData = formSchema.parse(formData);

    const safeName = escapeHtml(validatedData.name)
    const safeEmail = escapeHtml(validatedData.email)
    const safeSubject = validatedData.subject ? escapeHtml(validatedData.subject) : ''
    const safeMessage = escapeHtml(validatedData.message).replace(/\n/g, '<br>')

    try {
        const data = await resend.emails.send({
            from: 'Humae Site <onboarding@resend.dev>', // Doit être ce domaine pour l'instant
            to: ['matisse.martayan@gmail.com'],
            subject: `Nouveau message de ${safeName} : ${safeSubject || 'Contact depuis le site'}`,
            replyTo: validatedData.email,
            html: `<p>Vous avez reçu un nouveau message de <strong>${safeName}</strong> (${safeEmail}).</p><p>Message :</p><p>${safeMessage}</p>`,
        });

        return { success: true, data };
    } catch (error) {
        return { success: false, error };
    }
}