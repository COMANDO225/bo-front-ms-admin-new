import {
    BookOpen,
    Bot,
    Settings2,
    SquareTerminal,
} from "lucide-react"

export type Cuenta = {
    nombre: string
    razonSocial: string
}

export const data = {
    user: {
        name: "anderson",
        email: "anderson.almeyda@dinet.com.pe",
        avatar: "/avatars/shadcn.jpg",
    },
    cuentas: [
        {
            nombre: "Adidas Perú",
            razonSocial: "Adidas S.A.",
        },
        {
            nombre: "Alicorp",
            razonSocial: "Alicorp S.A.A.",
        },
        {
            nombre: "Backus",
            razonSocial: "Backus & Johnston S.A.",
        },
    ],
    navMain: [
        {
            title: "OMS",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Dashboard",
                    url: "#",
                },
                {
                    title: "Pedidos",
                    url: "#",
                },
                {
                    title: "Solicitudes de Recolección",
                    url: "#",
                },
                {
                    title: "Direcciones no ubicadas",
                    url: "#",
                }
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ]
}
