'use client'

import { useEffect, useState } from 'react'
import type { TeamMember } from '@/lib/teamService'
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function MemberDashboard({ userId }: { userId: string }) {
  const router = useRouter()
  const [member, setMember] = useState<TeamMember | null>(null)
  const [memberId, setMemberId] = useState<string | null>(null)
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => {
        if (res.status === 401) {
          router.replace('/member/login')
          throw new Error('Session expirée')
        }
        if (!res.ok) throw new Error('Utilisateur introuvable')
        return res.json()
      })
      .then(user => {
        setMemberId(user.memberId)
        return fetch(`/api/team/${user.memberId}`)
      })
      .then(res => {
        if (!res.ok) throw new Error('Membre introuvable')
        return res.json()
      })
      .then((data: TeamMember) => {
        setMember(data)
        setLinkedinUrl(data.linkedinUrl || '')
        setPreview(data.imageSrc)
      })
      .catch(err => setMessage({ type: 'error', text: err.message || 'Erreur de chargement' }))
      .finally(() => setLoading(false))
  }, [router, userId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && file.size > 3 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'L’image ne doit pas dépasser 3 Mo' })
      e.target.value = ''
      return
    }
    setImageFile(file)
    setPreview(file ? URL.createObjectURL(file) : preview)
  }

  const uploadImage = async () => {
    if (!imageFile || !memberId) return null
    const reader = new FileReader()
    return new Promise<string>((resolve, reject) => {
      reader.onload = async () => {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              file: reader.result,
              filename: imageFile.name,
              folder: 'team',
              memberId,
            })
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.error || 'Erreur upload')
          resolve(data.path)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(imageFile)
    })
  }

  const save = async () => {
    if (!member || !memberId) return
    setSaving(true)
    setMessage(null)
    try {
      const imageSrc = await uploadImage()
      const payload = imageSrc ? { linkedinUrl, imageSrc } : { linkedinUrl }
      const res = await fetch(`/api/team/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        const updated = await res.json()
        setMember(updated)
        setMessage({ type: 'success', text: 'Profil mis à jour' })
      } else {
        const data = await res.json()
        setMessage({ type: 'error', text: data.error || 'Erreur lors de la mise à jour' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Une erreur inattendue s\'est produite' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="p-8 text-center">Chargement...</p>
  if (!member) return <p className="p-8 text-center text-red-500">{message?.text || 'Profil introuvable'}</p>

  return (
    <div className="p-8 space-y-4 max-w-xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Mon Profil</h1>
        <button
          className="rounded border px-3 py-2 text-sm"
          onClick={async () => {
            try {
              const response = await fetch('/api/logout', { method: 'POST' })
              if (!response.ok) throw new Error('Logout failed')
              router.replace('/member/login')
              router.refresh()
            } catch {
              setMessage({ type: 'error', text: 'Impossible de se déconnecter pour le moment' })
            }
          }}
        >
          Se déconnecter
        </button>
      </div>
      {message && (
        <div className={`rounded p-3 text-sm ${message.type === 'success' ? 'bg-green-50 border border-green-300 text-green-700' : 'bg-red-50 border border-red-300 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <div className="space-y-2">
        <p>Nom : {member.name}</p>
        <p>Rôle : {member.role}</p>
        <label htmlFor="member-linkedin" className="text-sm font-medium">Profil LinkedIn</label>
        <input
          id="member-linkedin"
          className="border p-2 w-full"
          value={linkedinUrl}
          onChange={e => setLinkedinUrl(e.target.value)}
          placeholder="Lien LinkedIn"
        />
        <label htmlFor="member-photo" className="text-sm font-medium">Photo de profil</label>
        <input id="member-photo" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="border p-2 w-full" onChange={handleFileChange} />
        {preview && <Image src={preview} alt="Aperçu" width={128} height={128} className="w-32 h-32 object-cover rounded-full" />}
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" onClick={save} disabled={saving}>
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}
