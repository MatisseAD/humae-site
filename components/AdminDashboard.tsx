'use client'

import { useEffect, useState } from 'react'
import { TeamMember } from '@/lib/teamService'
import { User } from '@/lib/userService'
import {Button} from "@/components/ui/button";

export default function AdminDashboard() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [form, setForm] = useState({ name: '', role: '', imageSrc: '', linkedinUrl: '' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [userForm, setUserForm] = useState({ username: '', password: '', memberId: '' })

  useEffect(() => {
    fetch('/api/team').then(res => res.json()).then(setTeam)
    fetch('/api/users').then(res => res.json()).then(setUsers)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const uploadImage = async () => {
    if (!imageFile) return form.imageSrc
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

  const saveMember = async () => {
    const imageSrc = await uploadImage()
    const payload = { ...form, imageSrc }
    if (editingId) {
      const res = await fetch(`/api/team/${editingId}`, { method: 'PUT', body: JSON.stringify(payload) })
      if (res.ok) {
        const updated = await res.json()
        setTeam(team.map(t => t.id === editingId ? updated : t))
        setEditingId(null)
      }
    } else {
      const res = await fetch('/api/team', { method: 'POST', body: JSON.stringify(payload) })
      if (res.ok) {
        const newMember = await res.json()
        setTeam([...team, newMember])
      }
    }
    setForm({ name: '', role: '', imageSrc: '', linkedinUrl: '' })
    setImageFile(null)
    setPreview(null)
  }

  const deleteMember = async (id: string) => {
    const res = await fetch(`/api/team/${id}`, { method: 'DELETE' })
    if (res.ok) setTeam(team.filter(t => t.id !== id))
  }

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard Équipe</h1>
      <div className="bg-white shadow rounded p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="border p-2 w-full" placeholder="Nom" name="name" value={form.name} onChange={handleChange} />
          <input className="border p-2 w-full" placeholder="Rôle" name="role" value={form.role} onChange={handleChange} />
          <input type="file" className="border p-2 w-full" onChange={handleFileChange} />
          <input className="border p-2 w-full" placeholder="LinkedIn" name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} />
        </div>
        {preview && (<img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-full" />)}
        <Button className="text-white px-4 py-2 rounded hover:cursor-pointer" variant={"humae"} onClick={saveMember}>{editingId ? 'Enregistrer' : 'Ajouter'}</Button>
      </div>
      <ul className="space-y-2">
        {team.map(member => (
          <li key={member.id} className="flex items-center justify-between border p-2 rounded">
            <div className="flex items-center space-x-2 cursor-pointer flex-1" onClick={() => { setForm({ name: member.name, role: member.role, imageSrc: member.imageSrc, linkedinUrl: member.linkedinUrl || '' }); setEditingId(member.id); setPreview(member.imageSrc); }}>
              <img src={member.imageSrc} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
              <span>{member.name}</span>
            </div>
            <Button className="hover:cursor-pointer" variant={"humae"} onClick={() => deleteMember(member.id)}>Supprimer</Button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-8">Utilisateurs</h2>
      <div className="space-y-2 bg-white shadow rounded p-4 mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input className="border p-2 w-full" placeholder="Nom d'utilisateur" value={userForm.username} onChange={e => setUserForm({ ...userForm, username: e.target.value })} />
          <input className="border p-2 w-full" placeholder="Mot de passe" type="password" value={userForm.password} onChange={e => setUserForm({ ...userForm, password: e.target.value })} />
          <select className="border p-2 w-full" value={userForm.memberId} onChange={e => setUserForm({ ...userForm, memberId: e.target.value })}>
            <option value="">Membre</option>
            {team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
        <Button className="hover:cursor-pointer" variant={"humae"} onClick={async () => {
          if(!userForm.username || !userForm.password || !userForm.memberId) return;
          const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userForm) })
          if(res.ok){ const u = await res.json(); setUsers([...users, u]); setUserForm({ username: '', password: '', memberId: '' }) }
        }}>Créer utilisateur</Button>
      </div>
      <ul className="space-y-1 mt-2">
        {users.map(u => (
          <li key={u.id} className="flex justify-between border p-2 rounded">
            <span>{u.username} - {team.find(t => t.id === u.memberId)?.name}</span>
            <button className="text-red-500" onClick={async () => { await fetch(`/api/users/${u.id}`, { method: 'DELETE' }); setUsers(users.filter(us => us.id !== u.id)) }}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
