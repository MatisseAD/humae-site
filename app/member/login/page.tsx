'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MemberLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const submit = async () => {
    if (submitting) return
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/user-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (res.ok) {
        router.push('/member')
        return
      }

      setError(res.status === 429
        ? 'Trop de tentatives. Réessayez dans quelques minutes.'
        : res.status >= 500
          ? 'Service momentanément indisponible.'
          : 'Identifiants incorrects')
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow w-80 space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          void submit()
        }}
      >
        <h1 className="text-xl font-bold text-center">Connexion Membre</h1>
        <label htmlFor="member-username" className="sr-only">Nom d&apos;utilisateur</label>
        <input
          id="member-username"
          className="border p-2 w-full"
          placeholder="Nom d'utilisateur"
          autoComplete="username"
          required
          maxLength={100}
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="member-password" className="sr-only">Mot de passe</label>
        <input
          id="member-password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={256}
          className="border p-2 w-full"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p role="alert" className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={submitting} className="bg-blue-500 text-white px-4 py-2 w-full disabled:opacity-50">
          {submitting ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
