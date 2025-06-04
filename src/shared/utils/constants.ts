// constants file
const getEnvVar = (key: string, fallback: string): string => {
    return import.meta.env[key] || fallback
}

const getEnvNumber = (key: string, fallback: number): number => {
    const value = import.meta.env[key]
    return value ? parseInt(value, 10) : fallback
}

const getEnvBoolean = (key: string, fallback: boolean): boolean => {
    const value = import.meta.env[key]
    return value ? value === 'true' : fallback
}

// API Configuration - Usa variables de entorno
export const API_CONFIG = {
    BASE_URL: getEnvVar('VITE_APIGATEWAY_URL', 'http://localhost:8080'),
    ENDPOINTS: {
        LOGIN: '/authentication/api/v1/login',
        REFRESH: '/authentication/api/v1/refresh',
        LOGOUT: '/authentication/api/v1/logout',
        VERIFY: '/authentication/api/v1/verify',
    },
    TIMEOUT: getEnvNumber('VITE_API_TIMEOUT', 10000),
} as const

// Authentication Configuration
export const AUTH_CONFIG = {
    TOKEN_KEY: 'auth-token',
    USER_KEY: 'auth-user',
    REFRESH_THRESHOLD: getEnvNumber('VITE_AUTH_REFRESH_THRESHOLD', 5 * 60 * 1000), // 5 min
    MAX_RETRY_ATTEMPTS: getEnvNumber('VITE_AUTH_MAX_RETRY_ATTEMPTS', 3),
} as const

// App Configuration
export const APP_CONFIG = {
    NAME: getEnvVar('VITE_APP_NAME', 'Ecommerce Management System Dinet'),
    VERSION: getEnvVar('VITE_APP_VERSION', '0.0.1'),
    ENV: getEnvVar('VITE_APP_ENV', 'development'),
    IS_DEV: getEnvVar('VITE_APP_ENV', 'development') === 'development',
    IS_PROD: getEnvVar('VITE_APP_ENV', 'development') === 'production',
} as const

export const FEATURE_FLAGS = {
    ENABLE_DEVTOOLS: getEnvBoolean('VITE_ENABLE_DEVTOOLS', true),
    ENABLE_ANALYTICS: getEnvBoolean('VITE_ENABLE_ANALYTICS', false),
} as const

// Query Keys - Para TanStack Query
export const QUERY_KEYS = {
    AUTH: ['auth'] as const,
    USER: ['user'] as const,
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'dinet-auth-token',
    USER_DATA: 'dinet-user-data',
    THEME: 'dinet-theme',
} as const

// Navigation Routes
export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: '/',
    RECOVERY: '/recovery-password',
    RESET_PASSWORD: '/reset-password',
} as const

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
    INVALID_CREDENTIALS: 'Usuario o contraseña incorrectos.',
    SESSION_EXPIRED: 'Tu sesión ha expirado. Inicia sesión nuevamente.',
    UNKNOWN_ERROR: 'Ha ocurrido un error inesperado.',
    UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
} as const