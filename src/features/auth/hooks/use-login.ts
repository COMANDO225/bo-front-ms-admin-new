import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { ApiError, authApi, getUserFromToken } from '../api/auth-api'
import { useAuthActions } from '../stores/useAuth'
import { ROUTES } from '@/shared/utils/constants'
import type { LoginFormData } from '../types/auth.types'
import { toast } from 'sonner'

/**
 * 🎯 Options para configurar el comportamiento del hook
 */
interface UseLoginOptions {
    redirectTo?: string
    onSuccess?: () => void
    onError?: (error: ApiError) => void
    showSuccessToast?: boolean
    showErrorToast?: boolean
    usePromiseToast?: boolean
}

/**
 * 🪝 Hook para manejar el login del usuario
 * 
 * @param options - Configuraciones opcionales
 * @returns Mutation object con funciones y estados
 * 
 * @example
 * ```
 * const { mutate: login, isPending, error } = useLogin({
 *   redirectTo: '/dashboard',
 *   onSuccess: () => toast.success('¡Bienvenido!'),
 *   onError: (error) => toast.error(error.message)
 * })
 * 
 * const handleSubmit = (data: LoginFormData) => {
 *   login(data)
 * }
 * ```
 */
export function useLogin(options: UseLoginOptions = {}) {
    const navigate = useNavigate()
    const { setAuth, setLoading } = useAuthActions()

    const {
        redirectTo = ROUTES.DASHBOARD,
        onSuccess,
        onError,
        showSuccessToast = false,
        showErrorToast = true,
        usePromiseToast = false
    } = options

    return useMutation({
        mutationFn: (credentials: LoginFormData) => authApi.login(credentials),

        onMutate: () => {
            // 🔄 Activar loading state
            setLoading(true)
            if (usePromiseToast) {
                toast.loading('Iniciando sesión...', { id: 'login-toast' })
            }
        },

        onSuccess: (tokenData) => {
            try {
                // 🎯 Actualizar estado de autenticación
                setAuth({ token: tokenData.token })

                // 🍞 Toast de éxito
                if (usePromiseToast) {
                    const userInfo = getUserFromToken(tokenData.token)
                    toast.success(`¡Bienvenido ${userInfo?.username || 'de vuelta'}!`, {
                        id: 'login-toast'
                    })
                } else if (showSuccessToast) {
                    const userInfo = getUserFromToken(tokenData.token)
                    toast.success(`¡Bienvenido ${userInfo?.username || 'de vuelta'}!`)
                }

                // ✅ Callback personalizado
                onSuccess?.()

                // 🚀 Redirect automático
                navigate({ to: redirectTo })

            } catch (error) {
                console.error('Error processing login success:', error)
            } finally {
                setLoading(false)
            }
        },

        onError: (error: ApiError) => {
            try {
                // 🍞 Toast de error
                if (usePromiseToast) {
                    toast.error(error.message || 'Error al iniciar sesión', {
                        id: 'login-toast'
                    })
                } else if (showErrorToast) {
                    toast.error(error.message || 'Error al iniciar sesión')
                }

                // ❌ Callback personalizado de error
                onError?.(error)

            } catch (callbackError) {
                console.error('Error in login error callback:', callbackError)
            } finally {
                setLoading(false)
            }
        },

        onSettled: () => {
            // 🏁 Siempre ejecutar (éxito o error)
            setLoading(false)
        },

        // ⚙️ Configuración de TanStack Query
        retry: (failureCount, error) => {
            // No reintentar errores de credenciales
            if (error instanceof ApiError && error.status === 401) {
                return false
            }
            // Reintentar hasta 2 veces para errores de red
            return failureCount < 2
        },

        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
}

/**
 * 🎯 Hook simplificado para casos básicos
 * 
 * @example
 * ```
 * const { login, isPending, error } = useSimpleLogin()
 * 
 * const handleSubmit = (data: LoginFormData) => {
 *   login(data)
 * }
 * ```
 */
export function useSimpleLogin() {
    const { mutate, isPending, error, isSuccess } = useLogin()

    return {
        login: mutate,
        isPending,
        error: error as ApiError | null,
        isSuccess,
    }
}

/**
 * 🍞 Hook con promise toast
 * Maneja automáticamente loading, success y error toasts
 */
export function useLoginWithToast() {
    const { mutate, isPending, error, isSuccess } = useLogin({
        usePromiseToast: true,
        showSuccessToast: false, // Promise toast ya maneja esto
        showErrorToast: false,   // Promise toast ya maneja esto
    })

    return {
        login: mutate,
        isPending,
        error: error as ApiError | null,
        isSuccess,
    }
}

/**
 * 🎯 Hook con manejo automático de errores de formulario
 * Integra directamente con react-hook-form
 * 
 * @param setError - Función setError de react-hook-form
 * 
 * @example
 * ```
 * const { setError } = useForm<LoginFormData>()
 * const { login, isPending } = useLoginWithFormErrors(setError)
 * 
 * const handleSubmit = (data: LoginFormData) => {
 *   login(data) // Automáticamente mapea errores a campos
 * }
 * ```
 */
export function useLoginWithFormErrors(
    setError: (name: string, error: { message: string }) => void
) {
    const { mutate, isPending, error, isSuccess } = useLogin({
        showErrorToast: false, // No mostrar toast, usar errores de formulario
        onError: (error: ApiError) => {
            // 🎯 Mapear errores del backend a campos del formulario
            if (error.hasValidationErrors()) {
                // 🔧 FIX: Usar el método correcto
                const fieldErrors = error.getFieldErrors()
                Object.entries(fieldErrors).forEach(([field, message]) => {
                    setError(field, { message })
                })
            } else {
                // Error general (no de validación)
                setError('root', { message: error.message })
            }
        }
    })

    return {
        login: mutate,
        isPending,
        error: error as ApiError | null,
        isSuccess,
    }
}