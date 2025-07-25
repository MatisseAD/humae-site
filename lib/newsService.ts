import { supabase } from './supabaseClient'

export interface NewsItem {
  id: string
  title: string
  subject: string
  content: string
  imageSrc: string
}

export async function getNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase.from('news').select('*').order('id')
  if (error) throw new Error(error.message)
  return data as NewsItem[]
}

export async function getNewsItem(id: string): Promise<NewsItem | null> {
  const { data, error } = await supabase.from('news').select('*').eq('id', id).single()
  if (error && error.code !== 'PGRST116') throw new Error(error.message)
  return data as NewsItem | null
}

export async function addNews(item: Omit<NewsItem, 'id'>) {
  const { data, error } = await supabase.from('news').insert(item).select().single()
  if (error) throw new Error(error.message)
  return data as NewsItem
}

export async function updateNews(id: string, updates: Partial<Omit<NewsItem, 'id'>>) {
  const { data, error } = await supabase.from('news').update(updates).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data as NewsItem
}

export async function deleteNews(id: string) {
  const { error } = await supabase.from('news').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
