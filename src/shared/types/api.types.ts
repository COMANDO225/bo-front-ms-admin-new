import { z } from 'zod'
import {
    backendErrorDetailSchema,
    backendErrorSchema,
    backendErrorResponseSchema,
    createBackendSuccessResponseSchema,
} from '@/shared/schemas/api-schemas'

// Types inferidos de los schemas
export type BackendErrorDetail = z.infer<typeof backendErrorDetailSchema>
export type BackendError = z.infer<typeof backendErrorSchema>
export type BackendErrorResponse = z.infer<typeof backendErrorResponseSchema>

export type BackendSuccessResponse<T = unknown> = {
    timestamp: string
    uri: string
    data: T
}

/**
 *  Helper para validar y parsear errores del backend
 */
export function parseBackendError(data: unknown): BackendErrorResponse {
    try {
        return backendErrorResponseSchema.parse(data)
    } catch (error) {
        // Si no coincide con el schema, crear un error genérico
        console.warn('Backend error does not match expected schema:', error)
        return {
            timestamp: new Date().toISOString(),
            uri: 'unknown',
            error: {
                error_code: 'UNKNOWN_ERROR',
                error_detail: [],
                error_message: 'Error inesperado del servidor'
            }
        }
    }
}

/**
 *  Helper para validar respuestas exitosas
 */
export function parseBackendSuccess<T>(
    data: unknown,
    dataSchema: z.ZodSchema<T>
): BackendSuccessResponse<T> {
    const responseSchema = createBackendSuccessResponseSchema(dataSchema)
    return responseSchema.parse(data) as BackendSuccessResponse<T>
}

/**
 *  Helper para verificar si es error (con validación)
 */
export function isBackendError(response: unknown): response is BackendErrorResponse {
    const result = backendErrorResponseSchema.safeParse(response)
    return result.success
}