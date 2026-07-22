import { createServerFn } from '@tanstack/react-start'
import { db } from '../../db'
import { projects } from '../../db/schema'

export const getProjects = createServerFn({ method: 'GET' }).handler(async () => {
    return await db.select().from(projects)
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