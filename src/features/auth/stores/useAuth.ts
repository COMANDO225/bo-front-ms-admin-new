// store atuhentication state and actions
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/shared/utils/constants'
import { getUserFromToken, isTokenValid, type UserFromToken } from '../api/auth-api'

/**
 * 🎯 Estado completo de autenticación
 */
export interface AuthState {
    // 📊 Estado
    user: UserFromToken | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean

    // 🔧 Acciones principales
    setAuth: (data: { token: string; user?: UserFromToken }) => void
    setToken: (token: string) => void
    setUser: (user: UserFromToken) => void
    setLoading: (loading: boolean) => void
    logout: () => void
    reset: () => void

    // 🛡️ Utilidades
    getCurrentUser: () => UserFromToken | null
    getToken: () => string | null
    isValidSession: () => boolean
}

/**
 * 🏪 Zustand Store para manejo del estado de autenticación
 */
export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                // 📊 Estado inicial
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,

                // 🔧 Acciones principales
                setAuth: (data: { token: string; user?: UserFromToken }) => {
                    const { token, user } = data

                    // Si no se proporciona user, extraerlo del token
                    const userData = user || getUserFromToken(token)

                    if (!userData) {
                        console.warn('Token inválido o usuario no encontrado al extraer los datos del token.')
                        return
                    }

                    set(
                        {
                            token,
                            user: userData,
                            isAuthenticated: true,
                            isLoading: false,
                        },
                        false,
                        'auth/setAuth'
                    )
                },

                setToken: (token: string) => {
                    const userData = getUserFromToken(token)
                    if (!userData) {
                        console.warn('Token inválido proporcionado al setToken.')
                        return
                    }

                    set(
                        {
                            token,
                            user: userData,
                            isAuthenticated: !!token && !!userData
                        },
                        false,
                        'auth/setToken'
                    )
                },

                setUser: (user: UserFromToken) => {
                    set(
                        { user },
                        false,
                        'auth/setUser'
                    )
                },

                setLoading: (isLoading: boolean) => {
                    set(
                        { isLoading },
                        false,
                        'auth/setLoading'
                    )
                },

                logout: () => {
                    set(
                        {
                            user: null,
                            token: null,
                            isAuthenticated: false,
                            isLoading: false,
                        },
                        false,
                        'auth/logout'
                    )
                },

                reset: () => {
                    set(
                        {
                            user: null,
                            token: null,
                            isAuthenticated: false,
                            isLoading: false,
                        },
                        false,
                        'auth/reset'
                    )
                },

                // 🛡️ Utilidades
                getCurrentUser: () => {
                    return get().user
                },

                getToken: () => {
                    return get().token
                },

                isValidSession: () => {
                    const { token, isAuthenticated } = get()

                    if (!token || !isAuthenticated) return false

                    // Verificar que el token no esté expirado
                    return isTokenValid(token)
                },
            }),
            {
                name: STORAGE_KEYS.AUTH_TOKEN,

                // 🎯 Solo persistir datos esenciales
                partialize: (state) => ({
                    token: state.token,
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                }),

                // 🔄 Hidratar el estado al cargar la app
                onRehydrateStorage: () => (state) => {
                    if (state) {
                        const { token } = state

                        if (token) {
                            // Verificar si el token sigue siendo válido
                            if (isTokenValid(token)) {
                                // Extraer info actualizada del token
                                const userData = getUserFromToken(token)
                                state.user = userData
                                state.isAuthenticated = !!userData
                            } else {
                                // Token expirado, limpiar estado
                                state.token = null
                                state.user = null
                                state.isAuthenticated = false
                            }
                        }
                    }
                },

                // 🔧 Version para migraciones futuras
                version: 1,
            }
        ),
        {
            name: 'auth-store',
        }
    )
)

// 🎯 Selectors especializados para usar en componentes
export const useAuth = () => useAuthStore((state) => ({
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    isValidSession: state.isValidSession(),
}))

// 🎯 Selectores para acceder a partes específicas del estado
export const useAuthUser = () => useAuthStore((state) => state.user)
export const useAuthToken = () => useAuthStore((state) => state.token)
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)

// 🔧 Actions helpers para usar fuera de componentes
export const authActions = {
    setAuth: () => useAuthStore.getState().setAuth,
    setToken: () => useAuthStore.getState().setToken,
    setUser: () => useAuthStore.getState().setUser,
    setLoading: () => useAuthStore.getState().setLoading,
    logout: () => useAuthStore.getState().logout,
    reset: () => useAuthStore.getState().reset,
    getCurrentUser: () => useAuthStore.getState().getCurrentUser,
    getToken: () => useAuthStore.getState().getToken,
    isValidSession: () => useAuthStore.getState().isValidSession,
}

// 🎯 Hook personalizado para acciones
export const useAuthActions = () => {
    const store = useAuthStore()

    return {
        setAuth: store.setAuth,
        setToken: store.setToken,
        setUser: store.setUser,
        setLoading: store.setLoading,
        logout: store.logout,
        reset: store.reset,
        getCurrentUser: store.getCurrentUser,
        getToken: store.getToken,
        isValidSession: store.isValidSession,
    }
}