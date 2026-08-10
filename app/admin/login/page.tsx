'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {Button} from "@/components/ui/button";

export default function AdminLoginPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const submit = async () => {
        if (submitting) return
        setSubmitting(true)
        setError('')

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })
            if (res.ok) {
                router.push('/admin')
                return
            }

            setError(res.status === 429
                ? 'Trop de tentatives. Réessayez dans quelques minutes.'
                : res.status >= 500
                    ? 'Service momentanément indisponible.'
                    : 'Mot de passe incorrect')
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
                <h1 className="text-xl font-bold text-center">Connexion Admin</h1>
                <label htmlFor="admin-password" className="sr-only">Mot de passe administrateur</label>
                <input
                    id="admin-password"
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
                <Button
                    type="submit"
                    className="text-white px-4 py-2 w-full hover:cursor-pointer"
                    variant="humae"
                    disabled={submitting}
                >
                    {submitting ? 'Connexion...' : 'Se connecter'}
                </Button>
            </form>
        </div>
    )
}
