import { config } from 'dotenv'
config({ path: '.env.local' })

import { db } from './index'
import { projects } from './schema'

async function seed() {
    await db.insert(projects).values([
        {
            id: crypto.randomUUID(),
            name: 'Test Project',
            description: 'Een eerste testproject',
            status: 'Planning',
        },
    ])
    console.log('Database seeded!')
}

seed()