'use client'

import { useEffect, useState } from 'react'
import { TeamMember } from '@/lib/teamService'

export default function MemberDashboard({ userId }: { userId: string }) {
  const [member, setMember] = useState<TeamMember | null>(null)
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(user => fetch(`/api/team/${user.memberId}`))
      .then(res => res.json())
      .then((data: TeamMember) => {
        setMember(data)
        setLinkedinUrl(data.linkedinUrl || '')
        setPreview(data.imageSrc)
      })
  }, [userId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    setPreview(file ? URL.createObjectURL(file) : preview)
  }

  const uploadImage = async () => {
    if (!imageFile) return member?.imageSrc || ''
    const reader = new FileReader()
    return new Promise<string>((resolve, reject) => {
      reader.onload = async () => {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: reader.result, filename: imageFile.name })
          })
          const data = await res.json()
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
    if (!member) return
    const imageSrc = await uploadImage()
    await fetch(`/api/team/${member.id}`, {
      method: 'PUT',
      body: JSON.stringify({ linkedinUrl, imageSrc })
    })
    alert('Profil mis à jour')
  }

  if (!member) return <p className="p-8">Chargement...</p>

  return (
    <div className="p-8 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Mon Profil</h1>
      <div className="space-y-2">
        <p>Nom : {member.name}</p>
        <p>Rôle : {member.role}</p>
        <input
          className="border p-2 w-full"
          value={linkedinUrl}
          onChange={e => setLinkedinUrl(e.target.value)}
          placeholder="Lien LinkedIn"
        />
        <input type="file" className="border p-2 w-full" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Aperçu" className="w-32 h-32 object-cover rounded-full" />}
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={save}>Enregistrer</button>
      </div>
    </div>
  )
}
