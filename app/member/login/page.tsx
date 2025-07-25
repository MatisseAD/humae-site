'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MemberLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const submit = async () => {
    const res = await fetch('/api/user-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (res.ok) {
      router.push('/member')
    } else {
      setError('Identifiants incorrects')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-80 space-y-4">
        <h1 className="text-xl font-bold text-center">Connexion Membre</h1>
        <input
          className="border p-2 w-full"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={submit} className="bg-blue-500 text-white px-4 py-2 w-full">Se connecter</button>
      </div>
    </div>
  )
}
