import { TextInput } from "@mantine/core";
import { preventSubmitOnEnter } from "@shared/lib/utils";
import React from "react";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  valueAsNumber?: boolean;
  disabled?: boolean;
}

export const FormTextInput = (props: FormInputProps) => {
  const {
    label,
    type,
    name,
    required,
    placeholder,
    autoComplete,
    className,
    valueAsNumber,
    disabled,
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-ct-blue-600 pb-1 text-sm">
          {label}
          {required && <span className="text-error">*</span>}
        </label>
      )}
      <TextInput
        type={type}
        placeholder={placeholder}
        error={errors[name] ? true : false}
        required={required}
        className="block w-full rounded-2xl appearance-none focus:outline-none"
        autoComplete={autoComplete}
        disabled={disabled}
        onKeyDown={preventSubmitOnEnter}
        {...register(name, { valueAsNumber: valueAsNumber })}
      />
      {errors[name] && (
        <span className="mt-1 text-sm text-error">{errors[name]?.message as string}</span>
      )}
    </div>
  );
};
