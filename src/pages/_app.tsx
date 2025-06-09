import { DashboardLayout } from '@/shared/components/layouts/dashboard-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  // beforeLoad: async ({ location }) => {
  //   const isAuthenticated = localStorage.getItem('token')

  //   if (!isAuthenticated) {
  //     throw redirect({
  //       to: '/login',
  //       search: {
  //         redirect: location.href,
  //       },
  //     })
  //   }
  // },
  component: DashboardLayout,
})