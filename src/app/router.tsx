import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import { routeTree } from '@/routeTree.gen'
import { Toaster } from '@/shared/components/ui/sonner'

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
			retry: (failureCount, error: unknown) => {
				if (
					typeof error === 'object' &&
					error !== null &&
					'status' in error &&
					(error as { status?: number }).status !== undefined &&
					((error as { status?: number }).status === 404 ||
						(error as { status?: number }).status === 403)
				) {
					return false
				}
				return failureCount < 2
			},
		},
	},
})

export function AppRouter() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
			<Toaster
				position="top-right"
				closeButton
			/>
		</QueryClientProvider>
	)
}
