import { fetchWebNews } from '@/lib/fetchNews'
import { createPageMetadata } from '@/lib/siteMetadata'

export const revalidate = 3600

export const metadata = createPageMetadata({
  title: 'Actualités - Humae',
  description: "Actualités utiles aux entrepreneurs et dirigeants d'entreprise.",
  path: '/actu',
})

export default async function ActuPage() {
  const news = await fetchWebNews()
  return (
    <div className="p-8 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Actualités</h1>
      {news.length === 0 && <p>Aucune actualité pour le moment.</p>}
      {news.map(item => (
        <div key={item.id} className="border rounded p-4 space-y-2 bg-white">
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600 hover:underline">
            {item.title}
          </a>
          <p className="text-sm text-gray-600">{item.pubDate}</p>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  )
}
