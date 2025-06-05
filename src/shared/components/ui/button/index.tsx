import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
import useRipple from 'use-ripple-hook';
import { buttonVariants, type ButtonVariants } from './variants';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	ButtonVariants {
	asChild?: boolean
}

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';
	const [ripple, event] = useRipple();

	return (
		<Comp
			ref={ripple}
			onPointerDown={event}
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

Button.displayName = 'Button';

export { Button };
