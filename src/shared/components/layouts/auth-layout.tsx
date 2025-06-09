import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { useRouter } from '@tanstack/react-router';
import { cn } from '@/shared/lib/utils';

interface AuthLayoutProps {
	children: ReactNode;
	title: string;
	subtitle?: string;
	showBackLink?: boolean;
	pathRedirect?: string;
}

export function AuthLayout({
	children,
	title,
	subtitle,
	showBackLink = false,
	pathRedirect,
}: AuthLayoutProps) {
	const router = useRouter();

	const handleBackClick = () => {
		if (pathRedirect) {
			router.navigate({
				to: pathRedirect,
				replace: true,
			});
			return;
		}
		router.history.back();
	};

	return (
		<div className="min-h-screen w-full h-full flex relative overflow-hidden">
			<div
				className="order-1 z-[-1] lg:order-2 flex-1 bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`,
				}}
			>
				{/* Overlay azul */}
				<div className="absolute inset-0 bg-secondary-800/80" />
			</div>

			{/* efecto que va desde abajo hacia arriba */}
			<div
				className={cn(
					'absolute bottom-0 inset-x-0 bg-background rounded-t-lg shadow p-8 pb-4 px-4',
					'lg:static lg:order-1 lg:flex-none lg:w-full lg:max-w-[460px] lg:flex lg:flex-col lg:justify-center lg:p-8 lg:shadow-none rounded-none rounded-r-2xl',
					showBackLink && 'pt-4'
				)}
			>
				{showBackLink && (
					<div className="flex items-center text-sm text-muted-foreground bg-transparent hover:bg-gray-100 w-fit rounded-full py-1 pr-3 mb-6">
						<button
							className="flex gap-0 hover:gap-2 items-center hover:text-foreground transition-all"
							onClick={handleBackClick}
						>
							<ChevronLeft strokeWidth={1} /> <span className="mt-[-1px] select-none">Volver</span>
						</button>
					</div>
				)}
				<img
					src="images/ecommerce-dinet-box-hands.png"
					alt="Dinet Box"
					className="absolute bottom-[100%] left-1/2 -translate-x-1/2 w-full max-w-[268px] ml-[-4px]"
				/>
				<div className="text-center space-y-2">
					<h1 className="text-2xl font-bold text-foreground">{title}</h1>
					{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
				</div>
				<div className="mt-8">{children}</div>
			</div>
		</div>
	);
}
