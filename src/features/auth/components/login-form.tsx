import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Eye, EyeOff, User } from 'lucide-react'

const loginSchema = z.object({
	username: z
		.string({ required_error: 'El nombre de usuario es obligatorio' })
		.min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
		.max(50, 'El nombre de usuario no puede tener más de 50 caracteres')
		.regex(/^[a-zA-Z]+$/, 'El nombre de usuario solo puede contener letras')
		.trim(),
	password: z
		.string({ required_error: 'La contraseña es obligatoria' })
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
		.trim(),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: 'aalmeyda',
		},
	})

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true)
		try {
			// Aquí iría tu lógica de autenticación
			console.log('Login data:', data)
			// Simular delay
			await new Promise((resolve) => setTimeout(resolve, 1000))
			// Redirect to dashboard
		} catch (error) {
			console.error('Login error:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const toggleVisibility = () => 
		setShowPassword((prev) => !prev)
	

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="space-y-4">
					<Input
						{...register('username')}
						label='Nombre de usuario'
						type="text"
						placeholder="aalmeyda"
						isRequired
						isInvalid={!!errors.username}
						size={'lg'}
						endContent={<User strokeWidth={1.75} size={22} />}
						description={errors.username?.message ?? null}
					/>
					<Input
						id="password"
						type={showPassword ? 'text' : 'password'}
						placeholder="••••••"
						{...register('password')}
						size={'lg'}
						label='Contraseña'
						isInvalid={!!errors.password}
						isRequired
						endContent={
							<button
								aria-label="toggle password visibility"
								className="focus:outline-none pointer-events-auto cursor-pointer"
								type="button"
								onClick={toggleVisibility}
							>
								{showPassword ? (
									<EyeOff strokeWidth={1.75} size={22} />
								) : (
									<Eye strokeWidth={1.75} size={22} />
								)}
							</button>
						}
						description={errors.password?.message ?? null}
					/>
			</div>

			<div className="flex items-center justify-end">
				<Link
					to="/recovery-password"
					className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
				>
					¿Olvidaste tu contraseña?
				</Link>
			</div>

			<Button
				type="submit"
				className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white"
				disabled={isLoading}
				size={'lg'}
			>
				{isLoading ? 'Ingresando...' : 'Ingresar'}
			</Button>
		</form>
	)
}
