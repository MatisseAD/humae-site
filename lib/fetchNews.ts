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
  const feed = await parser.parseURL(FEED_URL)
  return feed.items.map(item => ({
    id: item.guid || item.id || item.link || '',
    title: item.title || '',
    link: item.link || '',
    content: item.contentSnippet || '',
    pubDate: item.pubDate || ''
  }))
}
