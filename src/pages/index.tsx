import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: Dashboard,
})

function Dashboard() {
	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-foreground">
					Dashboard
				</h1>
				<p className="text-muted-foreground mt-2">
					Bienvenido al panel de administración de Dinet
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-card p-6 rounded-lg border">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-primary-500 rounded flex items-center justify-center">
							<span className="text-white text-sm">📦</span>
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium text-muted-foreground">
								Envíos realizados
							</p>
							<p className="text-2xl font-bold text-primary-500">
								5546
							</p>
						</div>
					</div>
				</div>

				<div className="bg-card p-6 rounded-lg border">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-secondary-800 rounded flex items-center justify-center">
							<span className="text-white text-sm">🏪</span>
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium text-muted-foreground">
								Unidades ecommerce
							</p>
							<p className="text-2xl font-bold text-secondary-800">
								0
							</p>
						</div>
					</div>
				</div>

				<div className="bg-card p-6 rounded-lg border">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-primary-500 rounded flex items-center justify-center">
							<span className="text-white text-sm">🏭</span>
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium text-muted-foreground">
								M2 de almacén
							</p>
							<p className="text-2xl font-bold text-primary-500">
								5
							</p>
						</div>
					</div>
				</div>

				<div className="bg-card p-6 rounded-lg border">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-secondary-800 rounded flex items-center justify-center">
							<span className="text-white text-sm">📊</span>
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium text-muted-foreground">
								Analytics
							</p>
							<p className="text-2xl font-bold text-secondary-800">
								Ver más
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
