export type ProjectStatus =
    | "Planning"
    | "In Progress"
    | "Done"

export interface Project {
    id: string
    name: string
    description: string
    status: ProjectStatus
}