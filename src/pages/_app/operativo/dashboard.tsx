import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/operativo/dashboard')({
  staticData: {
    breadcrumb: 'Dashboard Operativo',
  },
  component: OperativoDashboard,
})

function OperativoDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Operativo</h1>
      <div className="text-center py-20">
        <div className="flex justify-center mb-8">
          <img src="/images/dashboard/ecommerce-dinet-box-sample-page.png" alt="Boxes" className="h-32" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">¡Iniciemos!</h2>
        <p className="text-muted-foreground">
          Selecciona alguna de las opciones del menú lateral.
        </p>
      </div>
    </div>
  )
}