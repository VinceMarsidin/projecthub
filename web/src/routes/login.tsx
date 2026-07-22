import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/login')({
    component: LoginPage,
})

function LoginPage() {
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        const { error } = isRegister
            ? await authClient.signUp.email({ email, password, name })
            : await authClient.signIn.email({ email, password })

        if (error) {
            setError(error.message ?? 'Er ging iets mis')
            return
        }

        navigate({ to: '/dashboard' })
    }

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                {isRegister ? 'Registreren' : 'Inloggen'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Naam</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-1">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Wachtwoord</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
                    {isRegister ? 'Registreren' : 'Inloggen'}
                </button>
            </form>

            <button
                onClick={() => setIsRegister(!isRegister)}
                className="mt-4 text-sm text-blue-600 underline"
            >
                {isRegister ? 'Al een account? Inloggen' : 'Nog geen account? Registreren'}
            </button>
        </div>
    )
}