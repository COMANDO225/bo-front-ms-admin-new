import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { descriptionVariants, iconWrapperVariants, inputVariants, labelVariants } from './variants'
import type { VariantProps } from 'class-variance-authority';

export interface InputClassNames {
	wrapper?: string;
	label?: string;
	labelText?: string;
	asterisk?: string;
	input?: string;
	description?: string;
	startContent?: string;
	endContent?: string;
}

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'>,
	VariantProps<typeof inputVariants> {
	label?: string;
	description?: string | null;
	isInvalid?: boolean;
	isRequired?: boolean;
	classNames?: InputClassNames;
	startContent?: React.ReactNode;
	endContent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			classNames,
			variant = 'bordered',
			color = 'default',
			size = 'md',
			type = 'text',
			label,
			description,
			isInvalid = false,
			isRequired = false,
			startContent,
			endContent,
			id,
			...props
		},
		ref
	) => {
		// Determinar el color basado en isInvalid
		const finalColor = isInvalid ? 'error' : color;

		// Generar ID único si no se proporciona
		const generatedId = React.useId();
		const inputId = id || generatedId;

		const hasStartContent = !!startContent;
		const hasEndContent = !!endContent;

		return (
			<div className={cn('w-full', classNames?.wrapper)}>
				{label && (
					<label
						htmlFor={inputId}
						className={cn(labelVariants({ color: finalColor, size }), classNames?.label)}
					>
						<span className={cn(classNames?.labelText)}>{label}</span>
						{isRequired && (
							<span
								aria-label="required"
								className={cn('text-destructive ml-1', classNames?.asterisk)}
							>
								*
							</span>
						)}
					</label>
				)}

				<div className="relative">
					{/* Start Content */}
					{startContent && (
						<div
							className={cn(
								iconWrapperVariants({ position: 'start', size }),
								classNames?.startContent
							)}
						>
							<div className="grid justify-start items-center">{startContent}</div>
						</div>
					)}

					{/* Input */}
					<input
						type={type}
						id={inputId}
						ref={ref}
						aria-invalid={isInvalid}
						aria-describedby={description ? `${inputId}-description` : undefined}
						className={cn(
							inputVariants({
								variant,
								color: finalColor,
								size,
								hasStartContent,
								hasEndContent,
							}),
							className,
							classNames?.input
						)}
						{...props}
					/>

					{/* End Content */}
					{endContent && (
						<div
							className={cn(iconWrapperVariants({ position: 'end', size }), classNames?.endContent)}
						>
							<div className="grid justify-end items-center">{endContent}</div>
						</div>
					)}
				</div>

				{description && (
					<p
						id={`${inputId}-description`}
						className={cn(descriptionVariants({ color: finalColor }), classNames?.description)}
						role={isInvalid ? 'alert' : undefined}
					>
						{description}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';

export { Input };
