import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useState } from 'react';
import type { RecoveryFormData } from '../types/auth.types';
import { recoverySchema } from '../schemas/auth-api.schemas';
import { User } from 'lucide-react';

export function RecoveryForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const {
		handleSubmit,
		register,
		formState: { errors },
		// watch,
	} = useForm<RecoveryFormData>({
		resolver: zodResolver(recoverySchema),
		mode: 'onChange',
	});

	// const watchedEmail = watch('email')

	const onSubmit = async (data: RecoveryFormData) => {
		setIsLoading(true);
		try {
			// Aquí iría tu lógica de recovery
			console.log('Recovery data:', data);
			// Simular delay
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setIsSuccess(true);
		} catch (error) {
			console.error('Recovery error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) return <SuccessView />;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<Input
				{...register('username')}
				label="Nombre de usuario"
				type="text"
				placeholder="aalmeyda"
				isRequired
				isInvalid={!!errors.username}
				size={'lg'}
				endContent={<User strokeWidth={1.75} size={22} />}
				description={errors.username?.message ?? null}
			/>

			<div className="space-y-4">
				<Button type="submit" size={'lg'} className="w-full h-12" disabled={isLoading}>
					{isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
				</Button>
			</div>
		</form>
	);
}

const SuccessView = () => (
	<div className="text-center space-y-4">
		<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
			<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
			</svg>
		</div>
		<div>
			<h3 className="text-lg font-semibold text-foreground">¡Correo enviado!</h3>
			<p className="text-muted-foreground mt-2">
				Revisa tu bandeja de entrada para restablecer tu contraseña
			</p>
		</div>
		<Link
			to="/login"
			className="inline-block text-primary-600 hover:text-primary-500 transition-colors"
		>
			Volver al login
		</Link>
	</div>
);
