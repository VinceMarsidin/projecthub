export type ProjectStatus =
    | "Planning"
    | "In Progress"
    | "Done"

export interface Project {
    name: string
    description: string
    status: ProjectStatus
}