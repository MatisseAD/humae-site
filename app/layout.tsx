import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



// Palettes de couleurs

const palette = {

}

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}