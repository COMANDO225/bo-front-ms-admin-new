import { z } from 'zod'

export const recoverySchema = z.object({
	email: z.string().email('Ingresa un email válido'),
})

export type RecoveryFormData = z.infer<typeof recoverySchema>
