import React, { forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, fullWidth = false, className = '', onChange, ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };
    
    return (
      <div className={`${widthClass} ${className}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`appearance-none block ${widthClass} px-3 py-2 border ${errorClass} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 bg-white`}
          onChange={handleChange}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;