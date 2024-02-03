import { PasswordInput } from "@mantine/core";
import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

export const FormPasswordInput: React.FC<FormInputProps> = ({
  label,
  name,
  required,
  placeholder,
  autoComplete,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-ct-blue-600 mb-3">
          {label}
        </label>
      )}
      <PasswordInput
        placeholder={placeholder}
        error={errors[name] ? true : false}
        required={required}
        className="block w-full rounded-2xl appearance-none focus:outline-none"
        autoComplete={autoComplete}
        {...register(name)}
      />
      {errors[name] && (
        <span className="mt-1 text-sm text-error">{errors[name]?.message as string}</span>
      )}
    </div>
  );
};
