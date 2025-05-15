import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500';
    
    return (
      <div className={`${widthClass} ${className}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`appearance-none block ${widthClass} px-3 py-2 border ${errorClass} rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 min-h-[100px]`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;