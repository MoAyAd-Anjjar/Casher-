import React from 'react';

interface InputFieldProps {
  type: 'text' | 'number' | 'date' | 'tel' | 'textarea';
  label: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  defaultValue?: string | number;

}

const InputField: React.FC<InputFieldProps> = ({
  type,
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  step,
  disabled = false,
  defaultValue
}) => {
  const commonProps = {
    name,
    value,
    onChange,
    placeholder,
    defaultValue,
    required,
    disabled,
    className: 'w-full p-2 border rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-500',
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm text-right font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          {...commonProps}
          id={name}
          rows={3}
          className={`${commonProps.className} resize `}
        />
      ) : (
        <input
      
          {...commonProps}
          type={type}
          id={name}
          min={min}
          max={max}
          step={step}
        />
      )}
    </div>
  );
};

export default InputField;