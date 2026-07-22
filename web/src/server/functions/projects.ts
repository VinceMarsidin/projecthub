import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { projects } from '../../db/schema'

export const getProjects = createServerFn({ method: 'GET' }).handler(async () => {
    return await db.select().from(projects)
})

export const getProject = createServerFn({ method: 'GET' })
    .validator((id: string) => id)
    .handler(async ({ data: id }) => {
        const result = await db.select().from(projects).where(eq(projects.id, id))
        return result[0] ?? null
    })

export const createProject = createServerFn({ method: 'POST' })
    .validator((data: {
        id: string
        name: string
        description: string
        status: 'Planning' | 'In Progress' | 'Done'
    }) => data)
    .handler(async ({ data }) => {
        await db.insert(projects).values(data)
    })

export const updateProject = createServerFn({ method: 'POST' })
    .validator((data: {
        id: string
        name: string
        description: string
        status: 'Planning' | 'In Progress' | 'Done'
    }) => data)
    .handler(async ({ data }) => {
        await db
            .update(projects)
            .set({
                name: data.name,
                description: data.description,
                status: data.status,
            })
            .where(eq(projects.id, data.id))
    })

export const deleteProject = createServerFn({ method: 'POST' })
    .validator((id: string) => id)
    .handler(async ({ data: id }) => {
        await db.delete(projects).where(eq(projects.id, id))
    })