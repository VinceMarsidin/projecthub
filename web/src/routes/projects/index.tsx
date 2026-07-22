import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/projects/")({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Projects
      </h1>
    </div>
  )
}