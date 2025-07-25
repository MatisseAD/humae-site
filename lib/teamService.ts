import { supabase } from './supabaseClient'

export interface TeamMember {
  id: string
  name: string
  role: string
  imageSrc: string
  linkedinUrl?: string
}

export async function getTeam(): Promise<TeamMember[]> {
  const { data, error } = await supabase.from('team').select('*').order('id')
  if (error) throw new Error(error.message)
  return data as TeamMember[]
}

export async function addMember(member: Omit<TeamMember, 'id'>) {
  const { data, error } = await supabase.from('team').insert(member).select().single()
  if (error) throw new Error(error.message)
  return data as TeamMember
}

export async function updateMember(id: string, updates: Partial<Omit<TeamMember, 'id'>>) {
  const { data, error } = await supabase.from('team').update(updates).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data as TeamMember
}

export async function deleteMember(id: string) {
  const { error } = await supabase.from('team').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
