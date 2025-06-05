import { cva, type VariantProps } from 'class-variance-authority';

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
                flat: 'border-transparent bg-transparent',
            },
            color: {
                default: '',
                primary: '',
                secondary: '',
                success: '',
                error: '',
            },
            size: {
                sm: 'h-8 text-sm rounded-md',
                md: 'h-10 rounded-md',
                lg: 'h-12 rounded-lg',
            },
            hasStartContent: {
                true: '',
                false: '',
            },
            hasEndContent: {
                true: '',
                false: '',
            },
        },
        compoundVariants: [
            {
                size: 'sm',
                hasStartContent: false,
                hasEndContent: false,
                className: 'px-2.5 py-1',
            },
            {
                size: 'sm',
                hasStartContent: true,
                hasEndContent: false,
                className: 'pl-8 pr-2.5 py-1',
            },
            {
                size: 'sm',
                hasStartContent: false,
                hasEndContent: true,
                className: 'pl-2.5 pr-8 py-1',
            },
            {
                size: 'sm',
                hasStartContent: true,
                hasEndContent: true,
                className: 'pl-8 pr-8 py-1',
            },
            {
                size: 'md',
                hasStartContent: false,
                hasEndContent: false,
                className: 'px-3 py-1',
            },
            {
                size: 'md',
                hasStartContent: true,
                hasEndContent: false,
                className: 'pl-10 pr-3 py-1',
            },
            {
                size: 'md',
                hasStartContent: false,
                hasEndContent: true,
                className: 'pl-3 pr-10 py-1',
            },
            {
                size: 'md',
                hasStartContent: true,
                hasEndContent: true,
                className: 'pl-10 pr-10 py-1',
            },
            {
                size: 'lg',
                hasStartContent: false,
                hasEndContent: false,
                className: 'px-4 py-2',
            },
            {
                size: 'lg',
                hasStartContent: true,
                hasEndContent: false,
                className: 'pl-12 pr-4 py-2',
            },
            {
                size: 'lg',
                hasStartContent: false,
                hasEndContent: true,
                className: 'pl-4 pr-12 py-2',
            },
            {
                size: 'lg',
                hasStartContent: true,
                hasEndContent: true,
                className: 'pl-12 pr-12 py-2',
            },
            // Bordered + Default
            {
                variant: 'bordered',
                color: 'default',
                className: [
                    'border-default-200 dark:bg-default-950/30',
                    'focus:border-default-300 focus:ring-default-300/50',
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
                    'bg-default-100 hover:bg-default-200 dark:bg-default-950/20 dark:hover:bg-default-950/30',
                    'focus:bg-default-100 focus:border-ring focus:ring-transparent',
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
            hasStartContent: false,
            hasEndContent: false,
        },
    }
);

const labelVariants = cva('block text-sm font-medium transition-colors mb-2 w-fit', {
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
            lg: 'text-sm mb-3',
        },
    },
    defaultVariants: {
        color: 'default',
        size: 'md',
    },
});

const descriptionVariants = cva('text-sm flex items-start gap-1.5 ml-[1px] mt-1', {
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
});

const iconWrapperVariants = cva(
    'absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center text-default-400 pointer-events-none',
    {
        variants: {
            position: {
                start: 'left-0',
                end: 'right-0',
            },
            size: {
                sm: 'w-8 h-8',
                md: 'w-10 h-10',
                lg: 'w-12 h-12',
            },
        },
        defaultVariants: {
            position: 'start',
            size: 'md',
        },
    }
);

export type InputVariants = VariantProps<typeof inputVariants>;
export type LabelVariants = VariantProps<typeof labelVariants>;
export type DescriptionVariants = VariantProps<typeof descriptionVariants>;
export type IconWrapperVariants = VariantProps<typeof iconWrapperVariants>;
export { inputVariants, labelVariants, descriptionVariants, iconWrapperVariants };