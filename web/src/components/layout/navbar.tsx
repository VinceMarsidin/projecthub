import { Link, useNavigate } from '@tanstack/react-router'
import { authClient } from '../../lib/auth-client'

export default function Navbar() {
    const navigate = useNavigate()
    const { data: session, isPending } = authClient.useSession()

    async function handleSignOut() {
        await authClient.signOut()
        navigate({ to: '/login' })
    }

    return (
        <header className="w-full border-b bg-white">
            <nav className="flex items-center justify-between px-6 py-4">
                <Link to="/" className="text-xl font-bold">
                    ProjectHub
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to="/dashboard"
                        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Dashboard
                    </Link>

                    {isPending ? null : session ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">{session.user.name}</span>
                            <button
                                onClick={handleSignOut}
                                className="rounded-md border px-4 py-2 hover:bg-gray-50"
                            >
                                Uitloggen
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="rounded-md border px-4 py-2 hover:bg-gray-50"
                        >
                            Inloggen
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}