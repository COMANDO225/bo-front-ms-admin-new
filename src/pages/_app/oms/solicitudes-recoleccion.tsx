import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/oms/solicitudes-recoleccion')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/oms/solicitudes-recoleccion"!</div>
}
