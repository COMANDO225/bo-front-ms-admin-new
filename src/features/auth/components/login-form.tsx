import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const loginSchema = z.object({
	email: z.string().email('Ingresa un email válido'),
	password: z
		.string()
		.min(6, 'La contraseña debe tener al menos 6 caracteres'),
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
			email: 'admin@themesbrand.com',
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

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="space-y-4">
					<Input
						id="email"
						type="email"
						placeholder="admin@themesbrand.com"
						{...register('email')}
					/>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-foreground mb-2"
					>
						Contraseña
					</label>
					<div className="relative">
						<Input
							id="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••"
							{...register('password')}
							className={
								errors.password
									? 'border-destructive pr-12'
									: 'pr-12'
							}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
						>
							{showPassword ? (
								<EyeOff size={20} />
							) : (
								<Eye size={20} />
							)}
						</button>
					</div>
					{errors.password && (
						<p className="mt-1 text-sm text-destructive">
							{errors.password.message}
						</p>
					)}
				</div>
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
				className="w-full bg-primary-500 hover:bg-primary-600 text-white"
				disabled={isLoading}
			>
				{isLoading ? 'Ingresando...' : 'Ingresar'}
			</Button>
		</form>
	)
}
