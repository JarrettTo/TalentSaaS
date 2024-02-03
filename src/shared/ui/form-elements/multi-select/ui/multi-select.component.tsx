import { MultiSelect } from "@mantine/core";
import { removeSpaces } from "@shared/lib/utils";
import { MultiSelectOptionComponent } from "./select-option.component";
import { SelectItem } from "@mantine/core";
import { createNewOption, shouldCreateNewOption } from "../helpers";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";

interface ICustomMultiSelectWithCreationProps {
  name: string;
  options: SelectItem[];
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  maxSelectedValues?: number;
  setNewOptions: (options: SelectItem[]) => void;
}

export const CustomMultiSelectWithCreation = (
  props: ICustomMultiSelectWithCreationProps
) => {
  const {
    name,
    options,
    setNewOptions,
    label,
    required,
    placeholder,
    className,
    maxSelectedValues,
  } = props;

  const onNewOptionCreate = (query: string) => {
    const newOption = createNewOption(removeSpaces(query));
    setNewOptions([...options, newOption]);
    return newOption;
  };

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
          <MultiSelect
            data={options}
            placeholder={placeholder}
            itemComponent={MultiSelectOptionComponent}
            searchable
            creatable
            maxSelectedValues={maxSelectedValues}
            getCreateLabel={(query: string) => `+ Create new group '${query}'`}
            maxDropdownHeight={160}
            shouldCreate={(query: string) => shouldCreateNewOption(query, options)}
            onCreate={onNewOptionCreate}
            // error={formState.errors[name] ? true : false}
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
