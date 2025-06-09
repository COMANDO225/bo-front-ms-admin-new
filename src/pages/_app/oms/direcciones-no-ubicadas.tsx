import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/oms/direcciones-no-ubicadas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/oms/direcciones-no-ubicadas"!</div>
}
