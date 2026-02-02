import { forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/a11y';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  required = false,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || generateId('input');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-neutral-700 mb-2"
        >
          {label}
          {required && <span className="text-error ml-1" aria-label="required">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        className={cn(
          'w-full px-4 py-2.5',
          'bg-white border-2 rounded-xl',
          'text-neutral-800 placeholder-neutral-400',
          'transition-all duration-200',
          'focus:outline-none focus:ring-4',
          error
            ? 'border-error focus:border-error focus:ring-error/20'
            : 'border-neutral-200 focus:border-indigo-500 focus:ring-indigo-500/20',
          'disabled:bg-neutral-100 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-sm text-error"
          role="alert"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className="mt-1.5 text-sm text-neutral-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export const Textarea = forwardRef(({
  label,
  error,
  helperText,
  required = false,
  className,
  id,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || generateId('textarea');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-semibold text-neutral-700 mb-2"
        >
          {label}
          {required && <span className="text-error ml-1" aria-label="required">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        className={cn(
          'w-full px-4 py-2.5',
          'bg-white border-2 rounded-xl',
          'text-neutral-800 placeholder-neutral-400',
          'transition-all duration-200',
          'focus:outline-none focus:ring-4',
          'resize-vertical',
          error
            ? 'border-error focus:border-error focus:ring-error/20'
            : 'border-neutral-200 focus:border-indigo-500 focus:ring-indigo-500/20',
          'disabled:bg-neutral-100 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
      {error && (
        <p
          id={`${textareaId}-error`}
          className="mt-1.5 text-sm text-error"
          role="alert"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${textareaId}-helper`}
          className="mt-1.5 text-sm text-neutral-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
