import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/oms/dashboard')({
  staticData: {
    breadcrumb: 'Dashboard OMS',
  },
  component: OMSDashboard,
})

function OMSDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard OMS</h1>
        <span className="text-sm text-muted-foreground">
          Sistema de Gestión de Órdenes
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Órdenes Activas
          </h3>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-xs text-muted-foreground">
            +12% desde el mes pasado
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Pedidos Pendientes
          </h3>
          <p className="text-2xl font-bold">423</p>
          <p className="text-xs text-muted-foreground">
            -8% desde el mes pasado
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Entregas Hoy
          </h3>
          <p className="text-2xl font-bold">89</p>
          <p className="text-xs text-muted-foreground">
            23 completadas
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Tasa de Éxito
          </h3>
          <p className="text-2xl font-bold">98.5%</p>
          <p className="text-xs text-muted-foreground">
            +0.3% desde el mes pasado
          </p>
        </div>
      </div>

      {/* más contenido del dashboard OMS */}
    </div>
  )
}