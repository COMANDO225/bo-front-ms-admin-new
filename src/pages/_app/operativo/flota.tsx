import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/operativo/flota')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/operativo/flota"!</div>
}
