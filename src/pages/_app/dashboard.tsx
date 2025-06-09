import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard')({
  staticData: {
    breadcrumb: 'Dashboard Principal',
  },
  component: MainDashboard,
})

function MainDashboard() {
  return (
    <div className="space-y-6">
      <div className="text-center py-28">
        <div className="flex justify-center mb-8">
          <img src="/images/dashboard/ecommerce-dinet-box-sample-page.png" alt="Boxes" className="h-48" />
        </div>
        <h2 className="text-3xl font-semibold mb-4">¡Iniciemos!</h2>
        <p className="text-muted-foreground">
          Selecciona alguna de las opciones del menú lateral.
        </p>
      </div>
    </div>
  )
}