import { z } from 'zod'
import type { loginResponseSchema, recoverySchema, refreshResponseSchema, tokenDataSchema, userDataSchema } from '../schemas/auth-api.schemas'

export type LoginFormData = z.infer<typeof loginResponseSchema>
export type RecoveryFormData = z.infer<typeof recoverySchema>

export type TokenData = z.infer<typeof tokenDataSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type RefreshResponse = z.infer<typeof refreshResponseSchema>
export type UserData = z.infer<typeof userDataSchema>

export interface AuthState {
    // Estado
    user: UserData | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean

    // Acciones
    setAuth: (data: { user?: UserData; token: string }) => void
    setToken: (token: string) => void
    setUser: (user: UserData) => void
    setLoading: (loading: boolean) => void
    logout: () => void
    reset: () => void
}