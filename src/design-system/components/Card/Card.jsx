import { cn } from '../../utils/classNames';

export const Card = ({
  children,
  variant = 'default',
  padding = 'default',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-white border border-neutral-200',
    elevated: 'bg-white shadow-lg',
    gradient: 'bg-gradient-to-br from-indigo-50 to-primary-50 border border-indigo-100',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-2xl',
        'transition-all duration-200',
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h3
    className={cn(
      'text-2xl font-bold text-neutral-800',
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={cn('text-neutral-600', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className, ...props }) => (
  <div
    className={cn(
      'mt-6 pt-4 border-t border-neutral-200',
      'flex items-center justify-between',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
