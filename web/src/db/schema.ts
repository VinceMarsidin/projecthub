import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const projectStatus = pgEnum('project_status', [
  'Planning',
  'In Progress',
  'Done',
])

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  status: projectStatus('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})