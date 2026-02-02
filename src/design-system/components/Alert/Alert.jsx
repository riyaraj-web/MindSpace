import { cn } from '../../utils/classNames';
import { X } from 'lucide-react';

const alertVariants = {
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: '✓',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: '⚠',
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: '✕',
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: 'ℹ',
  },
};

export const Alert = ({
  variant = 'info',
  title,
  children,
  onClose,
  className,
  ...props
}) => {
  const config = alertVariants[variant];

  return (
    <div
      role="alert"
      className={cn(
        'relative p-4 rounded-xl border-2',
        'flex items-start gap-3',
        config.container,
        className
      )}
      {...props}
    >
      <span className="text-2xl flex-shrink-0" aria-hidden="true">
        {config.icon}
      </span>
      <div className="flex-1">
        {title && (
          <h4 className="font-semibold mb-1">{title}</h4>
        )}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
          aria-label="Close alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
