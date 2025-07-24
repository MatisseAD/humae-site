import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {UpArrow} from "@/components/UpArrow";
import { Toaster } from "@/components/ui/sonner"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from 'next/head';

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
  title: "Humae - Expert Comptable",
  description: "Conseil, gestion, pilotage, Humae, expert-comptable à Brindas vous accompagne dans toutes les étapes de la vie de votre entreprise.",
  icons: {
    icon: [
      { url: 'assets/favicon.ico' },
      { url: 'assets/icon.png', sizes: '32x32', type: 'image/png' },
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
        'url': 'https://www.humae.fr',
    };

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white relative`}
      >
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
      </body>
    </html>
  );
}