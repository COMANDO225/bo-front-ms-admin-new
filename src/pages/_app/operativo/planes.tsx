import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/operativo/planes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/operativo/planes"!</div>
}
