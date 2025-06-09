import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/operativo/seguimiento')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/operativo/seguimiento"!</div>
}
