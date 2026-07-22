import {
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),

  description: text("description").notNull(),

  status: text("status").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
})