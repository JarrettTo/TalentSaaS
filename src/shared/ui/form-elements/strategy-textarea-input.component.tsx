import { Textarea } from "@mantine/core";
import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label?: string;
  name: string;
  type?: string;
	required?: boolean
	placeholder?: string
	autoComplete?: string
  className?: string
  valueAsNumber?: boolean
};

export const StrategyFormTextarea: React.FC<FormInputProps> = ({
  label,
  name,
	required,
	placeholder,
	autoComplete,
  className,
  valueAsNumber
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-ct-blue-600 pb-1 text-sm">
          {label}
        </label>
      )}
      <Textarea
        placeholder={placeholder}
				error={errors[name] ? true : false} 
				required={required}
        minRows={5}
        className="block w-full rounded-2xl appearance-none focus:outline-none"
				autoComplete={autoComplete}
        {...register(name, {valueAsNumber: valueAsNumber})}
      />
      {errors[name] && (
        <span className="mt-1 text-sm text-error">
          {errors[name]?.message as string}
        </span>
      )}
   </div>
  );
};

