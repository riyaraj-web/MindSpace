import { forwardRef } from 'react';
import { cn } from '../../utils/classNames';

const buttonVariants = {
  primary: 'bg-gradient-to-br from-indigo-500 to-primary-600 text-white hover:shadow-primaryHover',
  secondary: 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300',
  outline: 'border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50',
  ghost: 'text-indigo-600 hover:bg-indigo-50',
  danger: 'bg-error text-white hover:bg-error-dark',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'font-semibold rounded-xl',
        'transition-all duration-200',
        'focus:outline-none focus:ring-4 focus:ring-indigo-500/20',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Variant styles
        buttonVariants[variant],
        // Size styles
        buttonSizes[size],
        // Custom className
        className
      )}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
