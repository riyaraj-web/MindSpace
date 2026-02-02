import { cn } from '../../utils/classNames';

export const Spinner = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full',
        'border-4 border-neutral-200',
        'border-t-indigo-500',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const LoadingContainer = ({ children, className }) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center',
      'min-h-[400px] gap-4',
      className
    )}
  >
    <Spinner size="lg" />
    {children && (
      <p className="text-neutral-600 font-medium">{children}</p>
    )}
  </div>
);

export const Skeleton = ({ className, ...props }) => (
  <div
    className={cn(
      'animate-pulse bg-neutral-200 rounded',
      className
    )}
    {...props}
  />
);
