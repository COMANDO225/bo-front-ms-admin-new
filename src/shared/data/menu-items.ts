// src/app/shared/data/menu-items.ts
import {
    Package2,
    Settings,
    Users,
    MessageSquare,
    Briefcase,
    DollarSign,
    ArrowUpDown,
    Wrench,
    Activity,
    Route,
    CarFront,
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

export interface MenuItem {
    title: string
    url?: string
    icon?: LucideIcon
    isActive?: boolean
    items?: MenuItem[]
}

export const menuItems: MenuItem[] = [
    {
        title: "OMS",
        icon: Package2,
        items: [
            {
                title: "Dashboard",
                url: "/oms/dashboard",
            },
            {
                title: "Pedidos",
                url: "/oms/pedidos",
            },
            {
                title: "Solicitudes de Recolección",
                url: "/oms/solicitudes-recoleccion",
            },
            {
                title: "Direcciones no ubicadas",
                url: "/oms/direcciones-no-ubicadas",
            },
        ],
    },
    {
        title: "Operativo",
        icon: Activity,
        items: [
            {
                title: "Dashboard",
                url: "/operativo/dashboard",
            },
            {
                title: "Visitas",
                url: "/operativo/visitas",
            },
            {
                title: "Planes",
                url: "/operativo/planes",
            },
            {
                title: "Rutas",
                icon: Route,
                items: [
                    {
                        title: "Rutas programadas",
                        url: "/operativo/rutas/programadas",
                    },
                    {
                        title: "Plantilla de Rutas",
                        url: "/operativo/rutas/plantilla",
                    },
                ],
            },
            {
                title: "Seguimiento",
                url: "/operativo/seguimiento",
            },
            {
                title: "Flota",
                icon: CarFront,
                items: [
                    {
                        title: "Conductores",
                        url: "/operativo/flota/conductores",
                    },
                    {
                        title: "Repartidores",
                        url: "/operativo/flota/repartidores",
                    },
                    {
                        title: "Vehículos",
                        url: "/operativo/flota/vehiculos",
                    },
                    {
                        title: "Tipos de Vehículos",
                        url: "/operativo/flota/tipos-vehiculos",
                    },
                ],
            },
        ],
    },
    {
        title: "Gestión de Casos",
        icon: MessageSquare,
        items: [
            {
                title: "Tickets",
                url: "/gestion-casos/tickets",
            },
        ],
    },
    {
        title: "Proveedores",
        icon: Briefcase,
        items: [
            {
                title: "Proveedores",
                url: "/proveedores",
            },
            {
                title: "Conectores",
                url: "/proveedores/conectores",
            },
        ],
    },
    {
        title: "Clientes",
        icon: Users,
        items: [
            {
                title: "Cuentas",
                url: "/clientes/cuentas",
            },
            {
                title: "Marcas",
                url: "/clientes/marcas",
            },
            {
                title: "Paquetes",
                url: "/clientes/paquetes",
            },
            {
                title: "Locales",
                url: "/clientes/locales",
            },
            {
                title: "Contratos",
                url: "/clientes/contratos",
            },
        ],
    },
    {
        title: "Tarifas",
        icon: DollarSign,
        items: [
            {
                title: "Provisión",
                url: "/tarifas/provision",
            },
            {
                title: "Clientes",
                url: "/tarifas/clientes",
            },
            {
                title: "Proveedores",
                url: "/tarifas/proveedores",
            },
        ],
    },
    {
        title: "Acciones Masivas",
        icon: ArrowUpDown,
        items: [
            {
                title: "Exportaciones",
                url: "/acciones-masivas/exportaciones",
            },
            {
                title: "Importaciones",
                url: "/acciones-masivas/importaciones",
            },
        ],
    },
    {
        title: "Configuración",
        icon: Wrench,
        items: [
            {
                title: "General",
                url: "/configuracion/general",
            },
            {
                title: "Centros",
                url: "/configuracion/centros",
            },
            {
                title: "Tallas",
                url: "/configuracion/tallas",
            },
            {
                title: "Servicios",
                icon: Settings,
                items: [
                    {
                        title: "Tipo de Servicios",
                        url: "/configuracion/servicios/tipo",
                    },
                    {
                        title: "Servicios adicionales",
                        url: "/configuracion/servicios/adicionales",
                    },
                ],
            },
            {
                title: "Coberturas",
                items: [
                    {
                        title: "Ubigeos",
                        url: "/configuracion/coberturas/ubigeos",
                    },
                    {
                        title: "Homologación de Ubigeos",
                        url: "/configuracion/coberturas/homologacion",
                    },
                    {
                        title: "Zonas",
                        url: "/configuracion/coberturas/zonas",
                    },
                    {
                        title: "Coberturas",
                        url: "/configuracion/coberturas/coberturas",
                    },
                ],
            },
            {
                title: "Tramos",
                items: [
                    {
                        title: "Red Distribución",
                        url: "/configuracion/tramos/red-distribucion",
                    },
                    {
                        title: "Red Recolección",
                        url: "/configuracion/tramos/red-recoleccion",
                    },
                    {
                        title: "Zonas de Entrega",
                        url: "/configuracion/tramos/zonas-entrega",
                    },
                ],
            },
            {
                title: "Contenedores y etiquetas",
                items: [
                    {
                        title: "Etiquetas",
                        url: "/configuracion/contenedores/etiquetas",
                    },
                    {
                        title: "Etiquetas personalizadas",
                        url: "/configuracion/contenedores/etiquetas-personalizadas",
                    },
                    {
                        title: "Tallas",
                        url: "/configuracion/contenedores/tallas",
                    },
                ],
            },
            {
                title: "Usuarios",
                icon: Users,
                items: [
                    {
                        title: "Usuarios",
                        url: "/users",
                    },
                    {
                        title: "Perfiles",
                        url: "/profiles",
                    },
                ],
            },
            {
                title: "Motivos",
                url: "/configuracion/motivos",
            },
            {
                title: "Formularios",
                url: "/configuracion/formularios",
            },
        ],
    },
]