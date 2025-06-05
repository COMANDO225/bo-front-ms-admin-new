import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from '@/app/router';

import { validateEnvVars, getEnvInfo } from '@/shared/utils/env-config';
import { APP_CONFIG } from '@/shared/utils/constants';
import '@/app/globals.css';

try {
	validateEnvVars();
} catch (error) {
	console.error('❌ Environment validacion fallida:', error);
	if (APP_CONFIG.IS_PROD) {
		document.body.innerHTML =
			'<h1>Error de Configuración</h1><p>Por favor contacta al soporte.</p>';
		throw error;
	}
}

// Debug info en desarrollo
if (APP_CONFIG.IS_DEV) {
	console.log('🔧 Environment Info:', getEnvInfo());
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppRouter />
	</StrictMode>
);
