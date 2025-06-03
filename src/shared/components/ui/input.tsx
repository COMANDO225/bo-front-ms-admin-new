import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const inputVariants = cva(
	[
		'flex w-full min-w-0 px-3 text-base transition-all outline-none',
		'file:border-0 file:bg-transparent file:text-sm file:font-medium',
		'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
		'focus:ring-[3px]',
		'placeholder:text-muted-foreground file:text-foreground',
	],
	{
		variants: {
			variant: {
				bordered: 'border bg-transparent',
				flat: 'border-transparent',
			},
			color: {
				default: '',
				primary: '',
				secondary: '',
				success: '',
				error: '',
			},
			size: {
				sm: 'h-8 px-2.5 py-1 text-sm rounded-md',
				md: 'h-10 py-1 rounded-md',
				lg: 'h-12 px-4 py-2 rounded-lg',
			},
		},
		compoundVariants: [
			// Bordered + Default
			{
				variant: 'bordered',
				color: 'default',
				className: [
					'border-border dark:bg-background/50',
					'focus:border-ring focus:ring-ring/50',
				],
			},
			// Bordered + Primary
			{
				variant: 'bordered',
				color: 'primary',
				className: [
					'border-primary-300 dark:bg-primary-950/30',
					'focus:border-primary-500 focus:ring-primary-500/50',
				],
			},
			// Bordered + Secondary
			{
				variant: 'bordered',
				color: 'secondary',
				className: [
					'border-secondary-300 dark:bg-secondary-950/30',
					'focus:border-secondary-600 focus:ring-secondary-600/30',
				],
			},
			// Bordered + Success
			{
				variant: 'bordered',
				color: 'success',
				className: [
					'border-green-300 dark:bg-green-950/30',
					'focus:border-green-500 focus:ring-green-500/30',
				],
			},
			// Bordered + Error
			{
				variant: 'bordered',
				color: 'error',
				className: [
					'border-destructive dark:bg-destructive/5',
					'focus:border-destructive focus:ring-destructive/30',
				],
			},
			// Flat + Default
			{
				variant: 'flat',
				color: 'default',
				className: [
					'bg-muted/50 hover:bg-muted/70',
					'focus:bg-background focus:border-ring focus:ring-ring/30',
				],
			},
			// Flat + Primary
			{
				variant: 'flat',
				color: 'primary',
				className: [
					'bg-primary-50 hover:bg-primary-100 dark:bg-primary-950/20 dark:hover:bg-primary-950/30',
					'focus:bg-background focus:border-primary-500 focus:ring-primary-500/30',
				],
			},
			// Flat + Secondary
			{
				variant: 'flat',
				color: 'secondary',
				className: [
					'bg-secondary-50 hover:bg-secondary-100 dark:bg-secondary-950/20 dark:hover:bg-secondary-950/30',
					'focus:bg-background focus:border-secondary-600 focus:ring-secondary-600/30',
				],
			},
			// Flat + Success
			{
				variant: 'flat',
				color: 'success',
				className: [
					'bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/30',
					'focus:bg-background focus:border-green-500 focus:ring-green-500/30',
				],
			},
			// Flat + Error
			{
				variant: 'flat',
				color: 'error',
				className: [
					'bg-destructive/10 hover:bg-destructive/15 dark:bg-destructive/5 dark:hover:bg-destructive/10',
					'focus:bg-background focus:border-destructive focus:ring-destructive/30',
				],
			},
		],
		defaultVariants: {
			variant: 'bordered',
			color: 'default',
			size: 'md',
		},
	}
)

const labelVariants = cva(
	'block text-sm font-semibold transition-colors mb-2 w-fit',
	{
		variants: {
			color: {
				default: 'text-foreground',
				primary: 'text-primary-600 dark:text-primary-300',
				secondary: 'text-secondary-600 dark:text-secondary-300',
				success: 'text-green-600 dark:text-green-300',
				error: 'text-destructive',
			},
			size: {
				sm: 'text-xs',
				md: 'text-sm',
				lg: 'text-base mb-3',
			},
		},
		defaultVariants: {
			color: 'default',
			size: 'md',
		},
	}
)

const descriptionVariants = cva(
	'text-sm flex items-start gap-1.5 ml-[1px] mt-1',
	{
		variants: {
			color: {
				default: 'text-muted-foreground',
				primary: 'text-primary-600 dark:text-primary-400',
				secondary: 'text-secondary-600 dark:text-secondary-400',
				success: 'text-green-600 dark:text-green-400',
				error: 'text-destructive',
			},
		},
		defaultVariants: {
			color: 'default',
		},
	}
)

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'>,
		VariantProps<typeof inputVariants> {
	label?: string
	description?: string
	isInvalid?: boolean
	isRequired?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			variant = 'bordered',
			color = 'default',
			size = 'md',
			type = 'text',
			label,
			description,
			isInvalid = false,
			isRequired = false,
			id,
			...props
		},
		ref
	) => {
		// Determinar el color basado en isInvalid
		const finalColor = isInvalid ? 'error' : color

		// Generar ID único si no se proporciona
		const generatedId = React.useId()
		const inputId = id || generatedId

		return (
			<div>
				{label && (
					<label
						htmlFor={inputId}
						className={cn(
							labelVariants({ color: finalColor, size })
						)}
					>
						{label}
						{isRequired && (
							<span
								className="text-destructive ml-1"
								aria-label="required"
							>
								*
							</span>
						)}
					</label>
				)}

				<input
					type={type}
					id={inputId}
					ref={ref}
					aria-invalid={isInvalid}
					aria-describedby={
						description ? `${inputId}-description` : undefined
					}
					className={cn(
						inputVariants({ variant, color: finalColor, size }),
						className
					)}
					{...props}
				/>

				{description && (
					<p
						id={`${inputId}-description`}
						className={cn(
							descriptionVariants({ color: finalColor })
						)}
						role={isInvalid ? 'alert' : undefined}
					>
						{description}
					</p>
				)}
			</div>
		)
	}
)

Input.displayName = 'Input'

export { Input, inputVariants }
