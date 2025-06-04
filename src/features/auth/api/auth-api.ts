import { apiClient } from '@/shared/lib/axios'
import { API_CONFIG } from '@/shared/utils/constants'
import { parseBackendSuccess, type BackendErrorDetail } from '@/shared/types/api.types'
import {
    tokenDataSchema
} from '../schemas/auth-api.schemas'
import type { LoginFormData, LoginResponse, RefreshResponse, TokenData, UserData } from '../types/auth.types'
import { base64UrlToBase64 } from '@/shared/utils/formatters'

export interface JWTPayload {
    token_type: string           // "access"
    role_id: number             // 1
    sub: string                 // "anderson" (username)
    jti: string                 // "string" (JWT ID)
    iss: string                 // "http://localhost:8004"
    aud: string[]               // ["frontend-app"]
    exp: number                 // 1748995052 (timestamp)
    iat?: number                // issued at (opcional)
}

/**
 * 🎯 User info extraída del JWT
 */
export interface UserFromToken {
    username: string            // del "sub"
    roleId: number             // del "role_id"
    tokenId: string            // del "jti"
    audience: string[]         // del "aud"
    expiresAt: Date            // del "exp" convertido a Date
}

/**
 * 🎯 API functions para autenticación
 * Todas las funciones validan automáticamente las respuestas con Zod
 */
export const authApi = {
    /**
     * 🔐 Login del usuario
     */
    login: async (credentials: LoginFormData): Promise<TokenData> => {
        try {
            const response = await apiClient.post<LoginResponse>(
                API_CONFIG.ENDPOINTS.LOGIN,
                credentials
            )

            // 🛡️ Validar la respuesta con Zod
            const validatedResponse = parseBackendSuccess(response.data, tokenDataSchema)

            return validatedResponse.data
        } catch (error) {
            // El error ya está procesado por el interceptor de Axios
            console.error('Login API Error:', error)
            throw error
        }
    },

    /**
     * 🔄 Refresh del token de acceso
     */
    refresh: async (): Promise<TokenData> => {
        try {
            const response = await apiClient.post<RefreshResponse>(
                API_CONFIG.ENDPOINTS.REFRESH
            )

            // 🛡️ Validar la respuesta con Zod
            const validatedResponse = parseBackendSuccess(response.data, tokenDataSchema)

            return validatedResponse.data
        } catch (error) {
            console.error('Refresh API Error:', error)
            throw error
        }
    },

    /**
     * 🚪 Logout del usuario
     */
    logout: async (): Promise<void> => {
        try {
            await apiClient.post(API_CONFIG.ENDPOINTS.LOGOUT)
        } catch (error) {
            // No fallar el logout del frontend si el backend falla
            // El usuario debe poder desloguearse siempre
            console.error('Logout API Error:', error)
            // No lanzamos el error para permitir logout local
        }
    },

    /**
     * ✅ Verificar si el token es válido
     * Útil para verificar al cargar la aplicación
     */
    verifyToken: async (): Promise<boolean> => {
        try {
            // Hacer una request ligera para verificar el token
            await apiClient.get(API_CONFIG.ENDPOINTS.VERIFY)
            return true
        } catch (error) {
            console.error('Token verification failed:', error)
            return false
        }
    },

    /**
     * 👤 Obtener información del usuario actual (opcional)
     * Si tu backend tiene un endpoint para obtener info del usuario
     */
    getCurrentUser: async (): Promise<UserData> => {
        try {
            const response = await apiClient.get('/authentication/api/v1/me')

            // Aquí podrías validar con userDataSchema si tienes ese endpoint
            return response.data.data as UserData
        } catch (error) {
            console.error('Get current user error:', error)
            throw error
        }
    },
}

/**
 * 🎯 Decodificar JWT y extraer información del usuario
 */
export function decodeTokenPayload(token: string): JWTPayload | null {
    try {
        // Decodificar el payload del JWT (sin verificar firma)
        const payload = token.split('.')[1]
        if (!payload) return null

        // 🔧 Convertir Base64URL a Base64 estándar
        const base64 = base64UrlToBase64(payload)

        // 🛠️ Decodificar Base64 a string y luego parsear JSON
        const decoded = atob(base64)
        const parsed = JSON.parse(decoded) as JWTPayload

        return parsed
    } catch (error) {
        console.error('Error decoding token:', error)
        return null
    }
}

/**
 * 🎯 Extraer información del usuario desde el JWT
 */
export function getUserFromToken(token: string): UserFromToken | null {
    const payload = decodeTokenPayload(token)
    if (!payload) return null

    try {
        return {
            username: payload.sub,
            roleId: payload.role_id,
            tokenId: payload.jti,
            audience: payload.aud,
            expiresAt: new Date(payload.exp * 1000), // Convertir timestamp a Date
        }
    } catch (error) {
        console.error('Error extracting user from token:', error)
        return null
    }
}

/**
 * 🕐 Verificar si el token está cerca de expirar
 */
export function isTokenNearExpiry(token: string, thresholdMinutes: number = 5): boolean {
    const payload = decodeTokenPayload(token)
    if (!payload || !payload.exp) return true

    const expirationTime = payload.exp * 1000 // Convert to milliseconds
    const currentTime = Date.now()
    const timeUntilExpiry = expirationTime - currentTime
    const thresholdTime = thresholdMinutes * 60 * 1000 // Convert to milliseconds

    return timeUntilExpiry <= thresholdTime
}

/**
 * ✅ Verificar si el token es válido (no expirado)
 */
export function isTokenValid(token: string): boolean {
    const payload = decodeTokenPayload(token)
    if (!payload || !payload.exp) return false

    const expirationTime = payload.exp * 1000
    const currentTime = Date.now()

    return currentTime < expirationTime
}

/**
 * 🎯 Verificar que el token sea para la audiencia correcta
 */
export function isTokenForCorrectAudience(token: string, expectedAudience: string = 'frontend-app'): boolean {
    const payload = decodeTokenPayload(token)
    if (!payload || !payload.aud) return false

    return payload.aud.includes(expectedAudience)
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

    /**
     *  Método para integración con react-hook-form
     */
    setFormErrors(setError: (name: string, error: { message: string }) => void): void {
        if (this.hasValidationErrors()) {
            const fieldErrors = this.getFieldErrors()
            Object.entries(fieldErrors).forEach(([field, message]) => {
                setError(field, { message })
            })
        }
    }
}

export const { login, refresh, logout, verifyToken, getCurrentUser } = authApi