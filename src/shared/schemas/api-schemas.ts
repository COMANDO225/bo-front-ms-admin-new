import { z } from 'zod'

// 🎯 Backend Error Schemas (genéricos para toda la app)
export const backendErrorDetailSchema = z.object({
    code: z.string(),        // ej: "validation"
    message: z.string(),     // ej: "Nombre de usuario es requerido"
    field: z.string(),       // ej: "username"
})

export const backendErrorSchema = z.object({
    error_code: z.string(),              // ej: "06.04.00.01"
    error_detail: z.array(backendErrorDetailSchema), // Array de errores de validación
    error_message: z.string(),           // ej: "Credenciales inválidas"
})

export const backendErrorResponseSchema = z.object({
    timestamp: z.string(),               // ej: "2025-06-03T17:46:07.4968125"
    uri: z.string(),                    // ej: "/api/v1/login"
    error: backendErrorSchema,
})

// Backend Success Schema (genérico para toda la app)
export const createBackendSuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        timestamp: z.string(),
        uri: z.string(),
        data: dataSchema,
    })