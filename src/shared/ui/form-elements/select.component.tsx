import { Select, SelectItem } from "@mantine/core";
import { preventSubmitOnEnter } from "@shared/lib/utils";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FormInputProps {
  label?: string;
  name: string;
  options: SelectItem[];
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export const FormSelect = (props: FormInputProps) => {
  const { label, name, options, required, placeholder, className } = props;

  const { control, formState } = useFormContext();

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-ct-blue-600 pb-1 text-sm">
          {label}
          {required && <span className="text-error">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            data={options}
            placeholder={placeholder}
            error={formState.errors[name] ? true : false}
            required={required}
            className="block w-full rounded-2xl appearance-none focus:outline-none"
            onKeyDown={preventSubmitOnEnter}
            {...field}
          />
        )}
      />
      {formState.errors[name] && (
        <span className="mt-1 text-sm text-error">
          {formState.errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};
