import Parser from 'rss-parser'

export interface WebNewsItem {
  id: string
  title: string
  link: string
  content: string
  pubDate: string
}

const parser = new Parser()
const FEED_URL = 'https://news.google.com/rss/search?q=revue+fiduciaire+OR+expert+comptable&hl=fr&gl=FR&ceid=FR:fr'

export async function fetchWebNews(): Promise<WebNewsItem[]> {
  try {
    const response = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'HumaeWebsite/1.0' },
      next: { revalidate: 3600 },
    })

    if (!response.ok) throw new Error(`Google News returned ${response.status}`)

    const feed = await parser.parseString(await response.text())
    return feed.items
      .filter((item) => item.title && item.link)
      .slice(0, 20)
      .map(item => ({
        id: item.guid || item.id || item.link || '',
        title: item.title || '',
        link: item.link || '',
        content: item.contentSnippet || '',
        pubDate: item.pubDate || ''
      }))
  } catch (error) {
    console.error('Unable to refresh the public news feed.', error)
    return []
  }
}
