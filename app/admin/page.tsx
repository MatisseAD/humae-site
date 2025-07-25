'use client'

import { useEffect, useState } from 'react'
import { TeamMember } from '@/lib/teamService'

export default function AdminPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [form, setForm] = useState({ name: '', role: '', imageSrc: '', linkedinUrl: '' })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/team').then(res => res.json()).then(setTeam)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const saveMember = async () => {
    if (editingId) {
      const res = await fetch(`/api/team/${editingId}`, { method: 'PUT', body: JSON.stringify(form) })
      if (res.ok) {
        const updated = await res.json()
        setTeam(team.map(t => t.id === editingId ? updated : t))
        setEditingId(null)
        setForm({ name: '', role: '', imageSrc: '', linkedinUrl: '' })
      }
    } else {
      const res = await fetch('/api/team', { method: 'POST', body: JSON.stringify(form) })
      if (res.ok) {
        const newMember = await res.json()
        setTeam([...team, newMember])
        setForm({ name: '', role: '', imageSrc: '', linkedinUrl: '' })
      }
    }
  }

  const deleteMember = async (id: string) => {
    const res = await fetch(`/api/team/${id}`, { method: 'DELETE' })
    if (res.ok) setTeam(team.filter(t => t.id !== id))
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Administration Équipe</h1>
      <div className="space-y-2 mb-8">
        <input className="border p-2 w-full" placeholder="Nom" name="name" value={form.name} onChange={handleChange} />
        <input className="border p-2 w-full" placeholder="Rôle" name="role" value={form.role} onChange={handleChange} />
        <input className="border p-2 w-full" placeholder="Image" name="imageSrc" value={form.imageSrc} onChange={handleChange} />
        <input className="border p-2 w-full" placeholder="LinkedIn" name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={saveMember}>{editingId ? 'Enregistrer' : 'Ajouter'}</button>
      </div>
      <ul className="space-y-2">
        {team.map(member => (
          <li key={member.id} className="flex justify-between border p-2">
            <span onClick={() => { setForm({ name: member.name, role: member.role, imageSrc: member.imageSrc, linkedinUrl: member.linkedinUrl || '' }); setEditingId(member.id) }} className="cursor-pointer flex-1">
              {member.name}
            </span>
            <button className="text-red-500" onClick={() => deleteMember(member.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
