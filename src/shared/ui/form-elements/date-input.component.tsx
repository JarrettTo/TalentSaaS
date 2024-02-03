import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { DateInput } from "@mantine/dates";
import { parse } from "date-fns";
import { preventSubmitOnEnter } from "@shared/lib/utils";

type ControlledDateInputType<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  defaultValue?: Date;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  changedValue?: Date;
  className?: string;
  label?: string;
  required?: boolean;
};

export const FormDateInput = <T extends FieldValues>(
  props: ControlledDateInputType<T>
) => {
  const {
    control,
    name,
    minDate,
    maxDate,
    placeholder,
    className,
    label,
    defaultValue,
    required,
  } = props;

  const [value, setValue] = useState<Date | undefined>(defaultValue);

  const parseDate = (dateString: string) => {
    let newDate = parse(dateString, "dd/MM/yyyy", new Date());
    if (isNaN(newDate.getTime())) {
      newDate = parse(dateString, "dd-MM-yyyy", new Date());
      if (isNaN(newDate.getTime())) return null;
    }
    return newDate;
  };

  useEffect(() => {
    if (minDate === undefined) return;
    if (value !== undefined && value < minDate) {
      setValue(minDate);
    }
  }, [minDate]);

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
          <DateInput
            value={value}
            clearable
            placeholder={placeholder}
            valueFormat="DD/MM/YYYY"
            onChange={(value) => {
              setValue(value as any);
              field.onChange(value as any);
            }}
            minDate={minDate}
            maxDate={maxDate}
            required={required}
            defaultValue={defaultValue}
            dateParser={parseDate}
            onKeyDown={preventSubmitOnEnter}
          />
        )}
      />
    </div>
  );
};
