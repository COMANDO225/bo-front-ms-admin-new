import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FEATURE_FLAGS } from '@/shared/utils/constants';
import type { PropsWithChildren } from 'react';
import { ApiError } from '@/features/auth/api/auth-api';

// Configuración del QueryClient
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			refetchOnWindowFocus: false,
			retry: (failureCount, error: Error | unknown) => {
				// ✅ Type guard para ApiError
				if (error instanceof ApiError) {
					// No reintentar errores de autenticación
					if (error.status === 401 || error.status === 403) {
						return false
					}
				}

				// ✅ Type guard para errores con status
				if (error && typeof error === 'object' && 'status' in error) {
					const status = (error as { status: number }).status
					if (status === 401 || status === 403) {
						return false
					}
				}

				return failureCount < 3
			},
		},
		mutations: {
			retry: (failureCount, error: Error | unknown) => {
				// ✅ Type guard para ApiError
				if (error instanceof ApiError) {
					// No reintentar errores de validación
					if (error.status === 400 || error.status === 422) {
						return false
					}
				}

				// ✅ Type guard para errores con status
				if (error && typeof error === 'object' && 'status' in error) {
					const status = (error as { status: number }).status
					if (status === 400 || status === 422) {
						return false
					}
				}

				return failureCount < 2
			},
		},
	},
})

/**
 * Provider para TanStack Query
 * Maneja el estado de servidor, cache, y devtools
 */
const QueryProvider = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{FEATURE_FLAGS.ENABLE_DEVTOOLS && (
				<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			)}
		</QueryClientProvider>
	);
};

export default QueryProvider;
