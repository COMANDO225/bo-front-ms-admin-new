import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  // que redirija a "/dashboard"
  loader: async () => {
    return { redirect: '/dashboard' }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/"!</div>
}
