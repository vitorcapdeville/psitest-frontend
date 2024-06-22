import React from 'react';
import PropTypes from 'prop-types'; // Se estiver usando TypeScript, você pode preferir usar interfaces ao invés de PropTypes.

// Definição de interface para as props, se estiver usando TypeScript.
interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  Icon?: React.ElementType; // Permite passar um componente de ícone.
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  Icon,
  type = 'text',
}) => {
  return (
    <div>
      <label
        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          id={id}
          type={type}
          name={id}
          placeholder={placeholder}
          required
        />
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        )}
      </div>
    </div>
  );
};

export default FormField;
