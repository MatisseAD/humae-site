import type { Metadata } from 'next'

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Humae',
      title,
      description,
      url: path,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          noarchive: true,
          noimageindex: true,
          nosnippet: true,
        }
      : { index: true, follow: true },
  }
}
