import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { ApiError, authApi } from '../api/auth-api'
import { useAuthActions } from '../stores/useAuth'
import { ROUTES } from '@/shared/utils/constants'

/**
 * 🎯 Options para configurar el comportamiento del refresh
 */
interface UseRefreshOptions {
    onSuccess?: () => void
    onError?: (error: ApiError) => void
    redirectOnError?: boolean
    showErrorToast?: boolean
}

/**
 * 🔄 Hook para manejar el refresh de tokens
 * Se usa principalmente en:
 * - Interceptors de Axios (refresh automático)
 * - App initialization (verificar token al cargar)
 * - Manual refresh (botón de "refrescar sesión")
 * 
 * @param options - Configuraciones opcionales
 * 
 * @example
 * ```tsx
 * // En Axios interceptor
 * const { mutateAsync: refresh } = useRefresh({
 *   redirectOnError: false // No redirigir desde interceptor
 * })
 * 
 * // En componente manual
 * const { mutate: refresh, isPending } = useRefresh({
 *   onSuccess: () => toast.success('Sesión renovada'),
 *   redirectOnError: true
 * })
 * ```
 */
export function useRefresh(options: UseRefreshOptions = {}) {
    const navigate = useNavigate()
    const { setAuth, logout } = useAuthActions()

    const {
        onSuccess,
        onError,
        redirectOnError = true,
        showErrorToast = false
    } = options

    return useMutation({
        mutationFn: () => authApi.refresh(),

        onSuccess: (tokenData) => {
            try {
                // 🎯 Actualizar estado con nuevo token
                setAuth({ token: tokenData.token })

                // ✅ Callback personalizado
                onSuccess?.()

            } catch (error) {
                console.error('Error processing refresh success:', error)
            }
        },

        onError: (error: ApiError) => {
            try {
                // 🚨 Error en refresh = sesión completamente inválida
                console.error('Refresh failed:', error.message)

                // 🧹 Limpiar estado de autenticación
                logout()

                // 🚨 Toast de error (opcional)
                if (showErrorToast) {
                    console.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.')
                }

                // ❌ Callback personalizado de error
                onError?.(error)

                // 🚀 Redirect a login si está habilitado
                if (redirectOnError) {
                    navigate({
                        to: ROUTES.LOGIN,
                        search: { redirect: window.location.pathname } // Guardar página actual
                    })
                }

            } catch (callbackError) {
                console.error('Error in refresh error callback:', callbackError)
            }
        },

        // ⚙️ Configuración de TanStack Query
        retry: 1, // Solo un intento de retry para refresh
        retryDelay: 1000, // 1 segundo de delay
    })
}

/**
 * 🎯 Hook simplificado para refresh automático
 * Diseñado para usar en interceptors de Axios
 * 
 * @example
 * ```tsx
 * // En axios interceptor
 * const { mutateAsync: refreshToken } = useAutoRefresh()
 * 
 * try {
 *   await refreshToken()
 *   // Token renovado, retry request
 * } catch {
 *   // Refresh falló, logout
 * }
 * ```
 */
export function useAutoRefresh() {
    const { mutateAsync, isPending, error } = useRefresh({
        redirectOnError: false, // No redirigir desde interceptor
        showErrorToast: false,  // No mostrar toast desde interceptor
        onError: () => {
            // El interceptor maneja el logout, no hacer nada aquí
        }
    })

    return {
        refreshToken: mutateAsync,
        isPending,
        error: error as ApiError | null
    }
}

/**
 * 🎯 Hook para inicialización de la app
 * Verifica si hay token guardado y si sigue válido
 * 
 * @example
 * ```tsx
 * // En App.tsx o AuthProvider
 * const { initializeAuth, isPending } = useAuthInitialization()
 * 
 * useEffect(() => {
 *   initializeAuth()
 * }, [])
 * ```
 */
export function useAuthInitialization() {
    const { mutate, isPending, error, isSuccess } = useRefresh({
        redirectOnError: false, // No redirigir en inicialización
        showErrorToast: false,  // No mostrar toast en inicialización
    })

    return {
        initializeAuth: mutate,
        isPending,
        error: error as ApiError | null,
        isInitialized: isSuccess || !!error // True cuando terminó (éxito o error)
    }
}

/**
 * 🎯 Hook para refresh manual con feedback visual
 * Para usar en botones o componentes de UI
 * 
 * @example
 * ```tsx
 * function RefreshButton() {
 *   const { refresh, isPending } = useManualRefresh()
 *   
 *   return (
 *     <Button onClick={refresh} disabled={isPending}>
 *       {isPending ? 'Renovando...' : 'Renovar Sesión'}
 *     </Button>
 *   )
 * }
 * ```
 */
export function useManualRefresh() {
    const { mutate, isPending, error, isSuccess } = useRefresh({
        showErrorToast: true,
        onSuccess: () => {
            console.log('Sesión renovada exitosamente')
        }
    })

    return {
        refresh: mutate,
        isPending,
        error: error as ApiError | null,
        isSuccess
    }
}