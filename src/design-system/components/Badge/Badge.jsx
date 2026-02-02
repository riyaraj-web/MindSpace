import { cn } from '../../utils/classNames';

const badgeVariants = {
  default: 'bg-neutral-100 text-neutral-700',
  primary: 'bg-indigo-100 text-indigo-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
};

export const Badge = ({
  variant = 'default',
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'px-2.5 py-1 rounded-full',
        'text-xs font-semibold',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
