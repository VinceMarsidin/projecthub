import { createFileRoute, redirect, Link } from '@tanstack/react-router'
import { getProjects } from '../server/functions/projects'
import { getServerSession } from '../server/functions/auth'

export const Route = createFileRoute('/dashboard')({
    beforeLoad: async () => {
        const session = await getServerSession()
        if (!session) {
            throw redirect({ to: '/login' })
        }
    },
    loader: () => getProjects(),
    component: DashboardPage,
})

function DashboardPage() {
    const projects = Route.useLoaderData()

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <Link
                    to="/projects/new"
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Nieuw project
                </Link>
            </div>

            {projects.length === 0 ? (
                <p className="text-gray-500">Nog geen projecten. Maak er een aan!</p>
            ) : (
                <ul className="space-y-2">
                    {projects.map((project) => (
                        <li key={project.id} className="border rounded p-3">
                            <Link to="/projects/$id" params={{ id: project.id }} className="block">
                                <p className="font-semibold hover:underline">{project.name}</p>
                                <p className="text-sm text-gray-500">{project.description}</p>
                                <p className="text-sm text-gray-500">{project.status}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}