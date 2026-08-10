// app/actions.ts
'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { headers } from 'next/headers';
import { consumeRateLimit } from '@/lib/rateLimit';

// On reprend le schéma de validation de notre formulaire de contact
const formSchema = z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().email().max(254),
    subject: z.string().trim().max(200).optional(),
    message: z.string().trim().min(10).max(10_000),
    website: z.string().max(200).optional(),
});

const CONTACT_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_ATTEMPTS = 3;

interface SendEmailResult {
    success: boolean;
    rateLimited?: boolean;
}

/** Escape special HTML characters to prevent XSS in email body */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

export async function sendEmail(formData: z.infer<typeof formSchema>): Promise<SendEmailResult> {
    const validation = formSchema.safeParse(formData);
    if (!validation.success) return { success: false };

    const validatedData = validation.data;
    if (validatedData.website) return { success: true };

    const requestHeaders = await headers();
    const ip = requestHeaders.get('x-real-ip') || requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const limit = consumeRateLimit(`contact:${ip}`, CONTACT_ATTEMPTS, CONTACT_WINDOW_MS);
    if (!limit.allowed) return { success: false, rateLimited: true };

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const contactEmail = process.env.CONTACT_EMAIL_TO;
    if (!apiKey || !fromEmail || !contactEmail) {
        console.error('The contact email service is not fully configured.');
        return { success: false };
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(validatedData.name)
    const safeEmail = escapeHtml(validatedData.email)
    const safeSubject = validatedData.subject ? escapeHtml(validatedData.subject).replace(/[\r\n]+/g, ' ') : ''
    const safeMessage = escapeHtml(validatedData.message).replace(/\n/g, '<br>')
    const subjectName = validatedData.name.replace(/[\r\n]+/g, ' ').trim()

    try {
        const data = await resend.emails.send({
            from: fromEmail,
            to: [contactEmail],
            subject: `Nouveau message de ${subjectName} : ${safeSubject || 'Contact depuis le site'}`,
            replyTo: validatedData.email,
            html: `<p>Vous avez reçu un nouveau message de <strong>${safeName}</strong> (${safeEmail}).</p><p>Message :</p><p>${safeMessage}</p>`,
        });

        if (data.error) {
            console.error('Resend rejected a contact message.', data.error);
            return { success: false };
        }

        return { success: true };
    } catch (error) {
        console.error('Unable to send a contact message.', error);
        return { success: false };
    }
}
