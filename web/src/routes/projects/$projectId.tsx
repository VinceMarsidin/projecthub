import { createFileRoute } from "@tanstack/react-router"
import { projects } from "../../data/projects"

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectDetailPage,
})

function ProjectDetailPage() {

  const { projectId } = Route.useParams()

  const project = projects.find(
    (project) => project.id === projectId
  )

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Project not found
        </h1>
      </div>
    )
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold">
        {project.name}
      </h1>

      <p className="mt-4 text-gray-600">
        {project.description}
      </p>

      <span className="mt-4 inline-block rounded bg-gray-100 px-3 py-1">
        {project.status}
      </span>

    </div>
  )
}