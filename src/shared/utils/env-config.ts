/**
 * Utility para manejar configuración de entorno de manera type-safe
 */

// Validar que variables críticas estén presentes
const requiredEnvVars = [
    'VITE_APIGATEWAY_URL',
] as const

// Validar al cargar la app
export function validateEnvVars(): void {
    const missing = requiredEnvVars.filter(
        (key) => !import.meta.env[key]
    )

    if (missing.length > 0) {
        throw new Error(
            `Variables de entorno requeridas faltantes: ${missing.join(', ')}\n` +
            'Por favor, verifica tu archivo .env y asegúrate de que todas las variables requeridas estén configuradas.'
        )
    }
}

// Helper para debugging de configuración
export function getEnvInfo() {
    if (import.meta.env.VITE_APP_ENV !== 'development') {
        return 'Información del entorno solo disponible en desarrollo'
    }

    return {
        NODE_ENV: import.meta.env.VITE_APP_ENV,
        API_BASE_URL: import.meta.env.VITE_APIGATEWAY_URL,
        APP_NAME: import.meta.env.VITE_APP_NAME,
        VERSION: import.meta.env.VITE_APP_VERSION,
        FEATURES: {
            DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS,
            ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS,
        },
    }
}

export { requiredEnvVars }