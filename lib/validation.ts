import { z } from 'zod'

function isSafeImageUrl(value: string): boolean {
  if (value === '') return true
  if (value.startsWith('/') && !value.startsWith('//')) return true

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return false

    const configuredHost = process.env.SUPABASE_URL
      ? new URL(process.env.SUPABASE_URL).hostname
      : process.env.NEXT_PUBLIC_SUPABASE_URL
        ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
        : null

    return configuredHost !== null && url.hostname === configuredHost
  } catch {
    return false
  }
}

export function isOwnedMemberImageUrl(value: string, memberId: string): boolean {
  if (!isSafeImageUrl(value)) return false

  try {
    const url = new URL(value)
    const expectedPrefix = `/storage/v1/object/public/uploads/team/${encodeURIComponent(memberId)}/`
    const filename = url.pathname.slice(expectedPrefix.length)
    return (
      url.pathname.startsWith(expectedPrefix) &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/i.test(filename)
    )
  } catch {
    return false
  }
}

export const linkedinUrlSchema = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (value === '') return true
    try {
      const url = new URL(value)
      return (
        url.protocol === 'https:' &&
        (url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com'))
      )
    } catch {
      return false
    }
  }, 'A valid LinkedIn HTTPS URL is required')

export const imageUrlSchema = z
  .string()
  .trim()
  .max(2048)
  .refine(isSafeImageUrl, 'An approved image URL is required')

export const teamMemberSchema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(160),
  imageSrc: imageUrlSchema.default(''),
  linkedinUrl: linkedinUrlSchema.optional(),
}).strict()

export const teamMemberUpdateSchema = teamMemberSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'At least one field is required'
)

export const memberProfileUpdateSchema = z.object({
  linkedinUrl: linkedinUrlSchema.optional(),
  imageSrc: imageUrlSchema.optional(),
}).strict().refine(
  (value) => Object.keys(value).length > 0,
  'At least one field is required'
)

export const newsSchema = z.object({
  title: z.string().trim().min(1).max(200),
  subject: z.string().trim().max(240).default(''),
  content: z.string().trim().min(1).max(50_000),
  imageSrc: imageUrlSchema.default(''),
}).strict()

export const newsUpdateSchema = newsSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'At least one field is required'
)
