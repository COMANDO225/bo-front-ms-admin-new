import { z } from 'zod';
import { createBackendSuccessResponseSchema } from '@/shared/schemas/api-schemas';

// login Form Schema (para react-hook-form)
export const loginSchema = z.object({
	username: z
		.string({ required_error: 'El nombre de usuario es obligatorio' })
		.min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
		.max(50, 'El nombre de usuario no puede tener más de 50 caracteres')
		.regex(
			/^[a-zA-Z0-9._-]+$/,
			'El nombre de usuario solo puede contener letras, números, puntos, guiones y guiones bajos'
		)
		.trim(),
	password: z
		.string({ required_error: 'La contraseña es obligatoria' })
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
		.max(100, 'La contraseña no puede tener más de 100 caracteres')
		.trim(),
});

// recovery schema es solamente el username podemos usar el mismo loginSchema
export const recoverySchema = loginSchema.pick({
	username: true,
});

// Token Data Schema
export const tokenDataSchema = z.object({
	token_type: z.string(),
	token: z.string(),
	expiration: z.string(),
});

// Login Response Schema
export const loginResponseSchema = createBackendSuccessResponseSchema(tokenDataSchema);

// Refresh Response Schema (mismo formato que login)
export const refreshResponseSchema = createBackendSuccessResponseSchema(tokenDataSchema);

// User Data Schema (si tu backend devuelve info del usuario)
export const userDataSchema = z.object({
	id: z.string(),
	username: z.string(),
	email: z.string().email().optional(),
	name: z.string().optional(),
	role: z.string().optional(),
	permissions: z.array(z.string()).optional(),
});
