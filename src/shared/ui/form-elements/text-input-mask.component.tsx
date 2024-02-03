import { Input } from "@mantine/core";
import InputMask from "react-input-mask";
import React from "react";
import { useFormContext } from "react-hook-form";
import { preventSubmitOnEnter } from "@shared/lib/utils";

interface FormInputProps {
  name: string;
  mask: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  valueAsNumber?: boolean;
}

export const FormTextInputMask = (props: FormInputProps) => {
  const { name, mask, label, required, placeholder, className, valueAsNumber } = props;
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
      <Input.Wrapper id={name}>
        <Input
          component={InputMask}
          mask={mask}
          error={errors[name] ? true : false}
          placeholder={placeholder}
          required={required}
          onKeyDown={preventSubmitOnEnter}
          {...register(name, { valueAsNumber: valueAsNumber })}
        />
      </Input.Wrapper>
      {errors[name] && (
        <span className="mt-1 text-sm text-error">{errors[name]?.message as string}</span>
      )}
    </div>
  );
};
