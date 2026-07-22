import { createFileRoute } from "@tanstack/react-router";
import ProjectCard from "../components/projects/ProjectCard";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const projects = [
    {
      name: "ProjectHub",
      description: "Een Jira alternatief bouwen",
      status: "In Progress",
    },
    {
      name: "Portfolio",
      description: "Persoonlijke developer website",
      status: "Planning",
    },
    {
      name: "Mobile App",
      description: "React Native experiment",
      status: "Done",
    },
    {
      name: "Next.js experiment",
      description: "Next.js experiment",
      status: "Planning",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-2 text-gray-600">
        Welcome to your ProjectHub dashboard.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.description}
            status={project.status}
          />
        ))}
      </div>
    </div>
  );
}
