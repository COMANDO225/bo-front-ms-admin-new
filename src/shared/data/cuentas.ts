export interface Cuenta {
    id: string
    nombre: string
    razonSocial: string
}

// Estos datos serían obtenidos desde tu API
export const cuentasData: Cuenta[] = [
    {
        id: "1",
        nombre: "Adidas Perú",
        razonSocial: "Adidas S.A.",
    },
    {
        id: "2",
        nombre: "Alicorp",
        razonSocial: "Alicorp S.A.A.",
    },
    {
        id: "3",
        nombre: "Backus",
        razonSocial: "Backus & Johnston S.A.",
    },
]