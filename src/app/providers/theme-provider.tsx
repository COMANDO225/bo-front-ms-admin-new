import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type PropsWithChildren } from 'react'

// Provider para manejo de temas usando next-themes
export function ThemeProvider({ children }: PropsWithChildren) {
    return (
        <NextThemesProvider
            attribute="class"              // Usa class="dark" en el html
            defaultTheme="system"          // Default: seguir preferencia del sistema
            enableSystem                   // Habilitar detección automática del sistema
            storageKey="ems-dinet-theme"   // Key para localStorage
            disableTransitionOnChange      // Evita flash al cambiar tema
            themes={['light', 'dark']}     // Temas disponibles
        >
            {children}
        </NextThemesProvider>
    )
}