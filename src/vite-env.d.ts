/// <reference types="vite/client" />

interface ImportMetaEnv {
	// API Configuration
	readonly VITE_SERVE_PATH: string;
	readonly VITE_APIGATEWAY_URL: string;

	// EMSD API
	readonly VITE_APP_ENV: 'development' | 'production' | 'test';
	readonly VITE_ENABLE_DEVTOOLS: boolean;
	readonly VITE_TOKEN_REFRESH_INTERVAL: number;

	// Environments
	readonly VITE_APP_NAME: string;
	readonly VITE_APP_VERSION: string;

	// Auth Configuration
	readonly VITE_AUTH_REFRESH_THRESHOLD: number;
	readonly VITE_AUTH_MAX_RETRY_ATTEMPTS: number;

	// Feature Flags
	readonly VITE_ENABLE_DEVTOOLS: boolean;
	readonly VITE_ENABLE_ANALYTICS: boolean;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
