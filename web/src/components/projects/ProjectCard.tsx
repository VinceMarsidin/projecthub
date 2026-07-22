import { Link } from "@tanstack/react-router"
import type { Project } from "../../types/project"


interface ProjectCardProps extends Project { }

export default function ProjectCard({
    name,
    description,
    status,
}: ProjectCardProps) {
    return (
        <Link
            to="/projects/$projectId"
            params={{
                projectId: name,
            }}
            className="block rounded-lg border p-4 shadow-sm hover:shadow-md"
        >
            <h2 className="text-xl font-bold">
                {name}
            </h2>

            <p className="mt-2 text-gray-600">
                {description}
            </p>

            <span className="mt-4 inline-block rounded bg-gray-100 px-3 py-1 text-sm">
                {status}
            </span>
        </Link>
    )
}