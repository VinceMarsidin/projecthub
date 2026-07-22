import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">ProjectHub</h1>

      <p className="mt-4 text-lg text-gray-500">
        Beheer je projecten en taken op één plek.
      </p>
    </main>
  )
}
