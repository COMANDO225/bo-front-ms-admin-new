import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/operativo/rutas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/operativo/rutas"!</div>
}
