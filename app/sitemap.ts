import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.humae.fr' // Remplace par le vrai nom de domaine

    // Ici, tu pourras ajouter les URLs dynamiques plus tard (blog, etc.)

    return [
        { url: baseUrl, lastModified: new Date() },
        { url: `${baseUrl}/nos-solutions`, lastModified: new Date() },
        { url: `${baseUrl}/nos-solutions/creation-entreprise`, lastModified: new Date() },
        { url: `${baseUrl}/nos-solutions/devenir-freelance`, lastModified: new Date() },
        { url: `${baseUrl}/nos-solutions/gestion-comptable`, lastModified: new Date() },
        { url: `${baseUrl}/nos-solutions/gestion-sociale`, lastModified: new Date() },
        { url: `${baseUrl}/nos-solutions/gestion-patrimoine`, lastModified: new Date() },
        { url: `${baseUrl}/le-cabinet`, lastModified: new Date() },
        { url: `${baseUrl}/contact`, lastModified: new Date() },
    ]
}