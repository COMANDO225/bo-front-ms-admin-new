import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '@/shared/components/layouts/auth-layout'
import { RecoveryForm } from '@/features/auth/components/recovery-form'

export const Route = createFileRoute('/recovery-password')({
	component: RecoveryPasswordPage,
})

function RecoveryPasswordPage() {
	return (
		<AuthLayout
			title="Recuperar Contraseña"
			subtitle="Te ayudamos a recuperar el acceso a tu cuenta"
			showBackLink={true}
			pathRedirect="/login"
		>
			<RecoveryForm />
		</AuthLayout>
	)
}
