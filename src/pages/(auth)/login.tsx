import { createFileRoute } from '@tanstack/react-router';
import { AuthLayout } from '@/shared/components/layouts/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';

export const Route = createFileRoute('/(auth)/login')({
	component: LoginPage,
});

function LoginPage() {
	return (
		<AuthLayout title="Iniciar Sesión" subtitle="Accede a tu panel de administración">
			<LoginForm />
		</AuthLayout>
	);
}
