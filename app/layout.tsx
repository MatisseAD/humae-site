import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {UpArrow} from "@/components/UpArrow";
import { Toaster } from "@/components/ui/sonner"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { createPageMetadata } from '@/lib/siteMetadata'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



// Metadata du site humae, (description, title, favicon, etc.)

export const metadata: Metadata = {
  metadataBase: new URL('https://www.humae.fr'),
  ...createPageMetadata({
    title: 'Humae | Expert-comptable à Brindas',
    description: "Conseil, gestion et pilotage : Humae, cabinet d'expertise comptable à Brindas, vous accompagne à chaque étape de votre entreprise.",
    path: '/',
  }),
  icons: {
    icon: [
      { url: '/assets/favicon.ico' },
      { url: '/assets/icon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        'name': 'Humae',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': '50 rue du Pré Magné',
            'addressLocality': 'Brindas',
            'postalCode': '69126',
            'addressCountry': 'FR'
        },
        'telephone': '+33472492190',
        'email': 'contact@humae.fr',
        'url': 'https://www.humae.fr',
        'image': 'https://www.humae.fr/assets/logo.png',
    };

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white relative`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Navbar />
        <main className="relative">
          {children}
            {/* Up arrow button to scroll to the top of the page */}
            <div className="fixed bottom-4 right-4 z-50">
                <UpArrow />
            </div>
        </main>
        <Footer />
      <Toaster />
      <SpeedInsights />
      <Analytics />
      </body>
    </html>
  );
}
