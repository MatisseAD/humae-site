import { getSupabase } from './supabaseClient'
import { imageUrlSchema, isOwnedMemberImageUrl, linkedinUrlSchema } from './validation'

export interface TeamMember {
  id: string
  name: string
  role: string
  imageSrc: string
  linkedinUrl?: string
}

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: 'celine-monin',
    name: 'Céline MONIN',
    role: 'Expert-Comptable, Gérante',
    imageSrc: '/assets/team/team-celine.jpg',
    linkedinUrl: 'https://fr.linkedin.com/in/celine-monin-a68805ba',
  },
  {
    id: 'christian-perrin',
    name: 'Christian PERRIN',
    role: 'Associé, Comptable',
    imageSrc: '/assets/team/team-christian.jpg',
  },
]

function sanitizeMember(member: TeamMember): TeamMember {
  const image = imageUrlSchema.safeParse(member.imageSrc || '')
  const linkedin = linkedinUrlSchema.safeParse(member.linkedinUrl || '')

  return {
    id: String(member.id),
    name: String(member.name),
    role: String(member.role),
    imageSrc: image.success ? image.data : '',
    linkedinUrl: linkedin.success && linkedin.data ? linkedin.data : undefined,
  }
}

export async function getTeam(): Promise<TeamMember[]> {
  try {
    const { data, error } = await getSupabase().from('team').select('*').order('id')
    if (error) throw new Error(error.message)
    return (data as TeamMember[]).map(sanitizeMember)
  } catch (error) {
    console.error('Unable to load team data; using the public fallback.', error)
    return FALLBACK_TEAM
  }
}

export async function getMember(id: string): Promise<TeamMember | null> {
  const { data, error } = await getSupabase()
    .from('team')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data ? sanitizeMember(data as TeamMember) : null
}

export async function addMember(member: Omit<TeamMember, 'id'>) {
  const { data, error } = await getSupabase().from('team').insert(member).select().single()
  if (error) throw new Error(error.message)
  return sanitizeMember(data as TeamMember)
}

export async function updateMember(id: string, updates: Partial<Omit<TeamMember, 'id'>>) {
  const { data, error } = await getSupabase().from('team').update(updates).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return sanitizeMember(data as TeamMember)
}

export async function deleteMember(id: string) {
  const { error } = await getSupabase().from('team').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function removePreviousMemberImage(publicUrl: string, memberId: string) {
  if (!isOwnedMemberImageUrl(publicUrl, memberId)) return

  const url = new URL(publicUrl)
  const publicPrefix = '/storage/v1/object/public/uploads/'
  const storagePath = decodeURIComponent(url.pathname.slice(publicPrefix.length))
  const { error } = await getSupabase().storage.from('uploads').remove([storagePath])
  if (error) throw new Error(error.message)
}
