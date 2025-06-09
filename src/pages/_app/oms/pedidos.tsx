import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/oms/pedidos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/oms/pedidos"!</div>
}
