import { createFileRoute, notFound, useNavigate, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { getProject, updateProject, deleteProject } from '../../server/functions/projects'

export const Route = createFileRoute('/projects/$id')({
    loader: async ({ params }) => {
        const project = await getProject({ data: params.id })
        if (!project) throw notFound()
        return project
    },
    component: ProjectDetailPage,
})

function ProjectDetailPage() {
    const project = Route.useLoaderData()
    const router = useRouter()
    const navigate = useNavigate()

    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState(project.status)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        setIsSaving(true)

        await updateProject({
            data: { id: project.id, name, description, status },
        })

        await router.invalidate()
        setIsEditing(false)
        setIsSaving(false)
    }

    async function handleDelete() {
        if (!confirm(`Weet je zeker dat je "${project.name}" wil verwijderen?`)) return

        setIsDeleting(true)
        await deleteProject({ data: project.id })
        navigate({ to: '/dashboard' })
    }

    if (isEditing) {
        return (
            <div className="p-6 max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Project bewerken</h1>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Naam</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Beschrijving</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as typeof status)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="Planning">Planning</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                        >
                            {isSaving ? 'Opslaan...' : 'Opslaan'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="rounded border px-4 py-2"
                        >
                            Annuleren
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <p className="text-gray-500 mb-4">{project.status}</p>
            <p className="mb-6">{project.description}</p>

            <div className="flex gap-2">
                <button
                    onClick={() => setIsEditing(true)}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    Bewerken
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
                >
                    {isDeleting ? 'Verwijderen...' : 'Verwijderen'}
                </button>
            </div>
        </div>
    )
}