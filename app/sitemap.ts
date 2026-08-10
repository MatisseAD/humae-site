import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.humae.fr'
    const pages = [
        { path: '', changeFrequency: 'monthly' as const, priority: 1 },
        { path: '/nos-solutions', changeFrequency: 'monthly' as const, priority: 0.9 },
        { path: '/nos-solutions/creation-entreprise', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/nos-solutions/devenir-freelance', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/nos-solutions/gestion-comptable', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/nos-solutions/gestion-sociale', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/nos-solutions/gestion-patrimoine', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/le-cabinet', changeFrequency: 'monthly' as const, priority: 0.7 },
        { path: '/le-cabinet/nos-valeurs', changeFrequency: 'yearly' as const, priority: 0.6 },
        { path: '/le-cabinet/notre-equipe', changeFrequency: 'monthly' as const, priority: 0.7 },
        { path: '/le-cabinet/nos-outils', changeFrequency: 'yearly' as const, priority: 0.6 },
        { path: '/le-cabinet/nos-outils/fulll', changeFrequency: 'yearly' as const, priority: 0.5 },
        { path: '/le-cabinet/nos-outils/meg-gestion', changeFrequency: 'yearly' as const, priority: 0.5 },
        { path: '/le-cabinet/nous-rejoindre', changeFrequency: 'monthly' as const, priority: 0.4 },
        { path: '/actu', changeFrequency: 'daily' as const, priority: 0.5 },
        { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.7 },
        { path: '/mentions-legales', changeFrequency: 'yearly' as const, priority: 0.2 },
        { path: '/politique-de-confidentialite', changeFrequency: 'yearly' as const, priority: 0.2 },
    ]

    return pages.map(({ path, ...metadata }) => ({
        url: `${baseUrl}${path}`,
        ...metadata,
    }))
}
