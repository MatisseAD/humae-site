import Image from 'next/image'
import { getNews } from '@/lib/newsService'

export default async function ActuPage() {
  const news = await getNews()
  return (
    <div className="p-8 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Actualités</h1>
      {news.length === 0 && <p>Aucune actualité pour le moment.</p>}
      {news.map(item => (
        <div key={item.id} className="border rounded p-4 space-y-2 bg-white">
          {item.imageSrc && <Image src={item.imageSrc} alt={item.title} width={600} height={300} className="w-full h-auto object-cover rounded" />}
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <h3 className="text-sm text-gray-600">{item.subject}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  )
}
