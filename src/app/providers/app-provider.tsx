import { type ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
// import { AuthProvider } from './auth-provider'
import QueryProvider from './query-provider'
import { Toaster } from '@/shared/components/ui/sonner';

interface AppProviderProps {
    children: ReactNode
}

/**
 * 🎯 Provider principal que combina todos los providers de la aplicación
 * 
 * Orden de providers (importante):
 * 1. ThemeProvider - Debe estar primero para que otros providers puedan usar el tema
 * 2. QueryProvider - TanStack Query para estado de servidor
 * 3. AuthProvider - Sistema de autenticación (depende de Query)
 * 4. Toaster - Notificaciones globales
 * 5. Children - La aplicación
 */
export function AppProvider({ children }: AppProviderProps) {
    return (
        <ThemeProvider>
            <QueryProvider>
                {/* <AuthProvider> */}
                {children}
                <Toaster
                    position="top-right"
                    closeButton
                    richColors
                />
                {/* </AuthProvider> */}
            </QueryProvider>
        </ThemeProvider>
    )
}