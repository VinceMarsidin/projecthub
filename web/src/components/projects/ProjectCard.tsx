interface ProjectCardProps {
    name: string
    description: string
    status: string
}

export default function ProjectCard({
    name,
    description,
    status,
}: ProjectCardProps) {
    return (
        <div className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-xl font-bold">
                {name}
            </h2>

            <p className="mt-2 text-gray-600">
                {description}
            </p>

            <span className="mt-4 inline-block rounded bg-gray-100 px-3 py-1 text-sm">
                {status}
            </span>
        </div>
    )
}