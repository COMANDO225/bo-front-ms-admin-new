import axios, {
    type AxiosInstance,
    type AxiosError,
    type InternalAxiosRequestConfig
} from 'axios'
import { API_CONFIG, ERROR_MESSAGES } from '@/shared/utils/constants'
import type { BackendErrorDetail, BackendErrorResponse } from '../types/api.types'

// Crear instancia de Axios
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Para cookies HTTP-only del refresh token
})

// Variable para mantener referencia al store (se inicializa después)
let getAuthToken: (() => string | null) | null = null
let refreshAuthToken: (() => Promise<void>) | null = null
let handleAuthError: (() => void) | null = null

/**
 * Inicializar el cliente con las funciones del store
 * Se llama desde el AuthProvider o main.tsx
 */
export function initializeAxiosInterceptors(authFunctions: {
    getToken: () => string | null
    refreshToken: () => Promise<void>
    logout: () => void
}) {
    getAuthToken = authFunctions.getToken
    refreshAuthToken = authFunctions.refreshToken
    handleAuthError = authFunctions.logout
}

// Request Interceptor - Agregar token a requests
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAuthToken?.()

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response Interceptor - Manejar errores y refresh automático
apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    async (error: AxiosError<BackendErrorResponse>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean
        }

        // Si es 401 y no es el endpoint de login/refresh
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/login') &&
            !originalRequest.url?.includes('/refresh')
        ) {
            originalRequest._retry = true

            try {
                // Intentar refresh token
                if (refreshAuthToken) {
                    await refreshAuthToken()

                    // Retry la request original con el nuevo token
                    const newToken = getAuthToken?.()
                    if (newToken && originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`
                    }

                    return apiClient(originalRequest)
                }
            } catch (refreshError) {
                // Si el refresh falla, logout
                handleAuthError?.()
                return Promise.reject(refreshError)
            }
        }

        // Crear error personalizado con la estructura de tu backend
        const customError = createApiError(error)
        return Promise.reject(customError)
    }
)

/**
 * Crear error personalizado basado en la respuesta del backend
 */
function createApiError(axiosError: AxiosError<BackendErrorResponse>) {
    const response = axiosError.response

    if (!response) {
        // Error de red
        return new ApiError({
            message: ERROR_MESSAGES.NETWORK_ERROR,
            status: 0,
            code: 'NETWORK_ERROR',
            details: []
        })
    }

    const backendError = response.data?.error

    if (backendError) {
        // Error estructurado del backend
        return new ApiError({
            message: backendError.error_message,
            status: response.status,
            code: backendError.error_code,
            details: backendError.error_detail || [],
            timestamp: response.data.timestamp,
            uri: response.data.uri
        })
    }

    // Fallback para errores no estructurados
    return new ApiError({
        message: getGenericErrorMessage(response.status),
        status: response.status,
        code: `HTTP_${response.status}`,
        details: []
    })
}

/**
 * Clase personalizada para errores de API
 */
export class ApiError extends Error {
    public readonly status: number
    public readonly code: string
    public readonly details: BackendErrorDetail[]
    public readonly timestamp?: string
    public readonly uri?: string

    constructor(options: {
        message: string
        status: number
        code: string
        details: BackendErrorDetail[]
        timestamp?: string
        uri?: string
    }) {
        super(options.message)
        this.name = 'ApiError'
        this.status = options.status
        this.code = options.code
        this.details = options.details
        this.timestamp = options.timestamp
        this.uri = options.uri
    }

    /**
     * Obtener errores por campo (útil para formularios)
     */
    getFieldErrors(): Record<string, string> {
        const fieldErrors: Record<string, string> = {}

        this.details.forEach(detail => {
            if (detail.field) {
                fieldErrors[detail.field] = detail.message
            }
        })

        return fieldErrors
    }

    /**
     * Verificar si hay errores de validación
     */
    hasValidationErrors(): boolean {
        return this.details.some(detail => detail.code === 'validation')
    }

    /**
     * Obtener primer error de validación para un campo específico
     */
    getFieldError(fieldName: string): string | null {
        const fieldError = this.details.find(
            detail => detail.field === fieldName && detail.code === 'validation'
        )
        return fieldError?.message || null
    }
}

/**
 * Helper para mensajes genéricos por status code
 */
function getGenericErrorMessage(status: number): string {
    switch (status) {
        case 400:
            return ERROR_MESSAGES.INVALID_CREDENTIALS
        case 401:
            return ERROR_MESSAGES.INVALID_CREDENTIALS
        case 403:
            return ERROR_MESSAGES.UNAUTHORIZED
        case 500:
            return ERROR_MESSAGES.UNKNOWN_ERROR
        default:
            return ERROR_MESSAGES.UNKNOWN_ERROR
    }
}

// Export para usar en hooks y componentes
export { createApiError }