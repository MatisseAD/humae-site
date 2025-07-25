'use client'

import { useEffect, useState } from 'react'
import { TeamMember } from '@/lib/teamService'
import { User } from '@/lib/userService'
import { NewsItem } from '@/lib/newsService'
import {Button} from "@/components/ui/button";
import Image from "next/image";

export default function AdminDashboard() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [form, setForm] = useState({ name: '', role: '', imageSrc: '', linkedinUrl: '' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [userForm, setUserForm] = useState({ username: '', password: '', memberId: '' })
  const [news, setNews] = useState<NewsItem[]>([])
  const [newsForm, setNewsForm] = useState({ title: '', subject: '', content: '', imageSrc: '' })
  const [newsImage, setNewsImage] = useState<File | null>(null)
  const [newsPreview, setNewsPreview] = useState<string | null>(null)
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/team').then(res => res.json()).then(setTeam)
    fetch('/api/users').then(res => res.json()).then(setUsers)
    fetch('/api/news').then(res => res.json()).then(setNews)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const handleNewsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setNewsImage(file)
    setNewsPreview(file ? URL.createObjectURL(file) : null)
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
            body: JSON.stringify({ file: reader.result, filename: imageFile.name, folder: 'team' })
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

  const uploadNewsImage = async () => {
    if (!newsImage) return newsForm.imageSrc
    const reader = new FileReader()
    return new Promise<string>((resolve, reject) => {
      reader.onload = async () => {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: reader.result, filename: newsImage.name, folder: 'news' })
          })
          const data = await res.json()
          resolve(data.path)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(newsImage)
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

  const saveNews = async () => {
    const imageSrc = await uploadNewsImage()
    const payload = { ...newsForm, imageSrc }
    if (editingNewsId) {
      const res = await fetch(`/api/news/${editingNewsId}`, { method: 'PUT', body: JSON.stringify(payload) })
      if (res.ok) {
        const updated = await res.json()
        setNews(news.map(n => n.id === editingNewsId ? updated : n))
        setEditingNewsId(null)
      }
    } else {
      const res = await fetch('/api/news', { method: 'POST', body: JSON.stringify(payload) })
      if (res.ok) {
        const item = await res.json()
        setNews([...news, item])
      }
    }
    setNewsForm({ title: '', subject: '', content: '', imageSrc: '' })
    setNewsImage(null)
    setNewsPreview(null)
  }

  const deleteNewsItem = async (id: string) => {
    const res = await fetch(`/api/news/${id}`, { method: 'DELETE' })
    if (res.ok) setNews(news.filter(n => n.id !== id))
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
        {preview && (<Image width={800} height={400} src={preview} alt="preview" className="w-32 h-32 object-cover rounded-full" />)}
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

      <h2 className="text-xl font-bold mt-8">Actualités</h2>
      <div className="space-y-2 bg-white shadow rounded p-4 mt-2">
        <div className="grid grid-cols-1 gap-2">
          <input className="border p-2 w-full" placeholder="Titre" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} />
          <input className="border p-2 w-full" placeholder="Sujet" value={newsForm.subject} onChange={e => setNewsForm({ ...newsForm, subject: e.target.value })} />
          <textarea className="border p-2 w-full" placeholder="Contenu" value={newsForm.content} onChange={e => setNewsForm({ ...newsForm, content: e.target.value })} />
          <input type="file" className="border p-2 w-full" onChange={handleNewsFileChange} />
        </div>
        {newsPreview && (<Image width={800} height={400} src={newsPreview} alt="preview" className="w-32 h-32 object-cover" />)}
        <Button className="hover:cursor-pointer" variant="humae" onClick={saveNews}>{editingNewsId ? 'Enregistrer' : 'Ajouter'}</Button>
      </div>
      <ul className="space-y-1 mt-2">
        {news.map(n => (
          <li key={n.id} className="flex justify-between border p-2 rounded">
            <div className="flex-1 cursor-pointer" onClick={() => { setNewsForm({ title: n.title, subject: n.subject, content: n.content, imageSrc: n.imageSrc }); setEditingNewsId(n.id); setNewsPreview(n.imageSrc); }}>
              {n.title}
            </div>
            <button className="text-red-500" onClick={async () => deleteNewsItem(n.id)}>Supprimer</button>
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
