'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {Button} from "@/components/ui/button";

export default function AdminLoginPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const submit = async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        })
        if (res.ok) {
            router.push('/admin')
        } else {
            setError('Mot de passe incorrect')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-80 space-y-4">
                <h1 className="text-xl font-bold text-center">Connexion Admin</h1>
                <input
                    type="password"
                    className="border p-2 w-full"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                    onClick={submit}
                    className="text-white px-4 py-2 w-full hover:cursor-pointer"
                    variant="humae"
                >
                    Se connecter
                </Button>
            </div>
        </div>
    )
}