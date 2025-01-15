import React from "react";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { NumericFormatProps } from "react-number-format";
import { get } from "lodash";

import { NumericInput } from "./input";

export interface NumericFormFieldProps<T extends FieldValues> {
  field: Path<T>;
  id: string;
  label?: string;
  formatProps?: NumericFormatProps;
  options?: RegisterOptions;
  className?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  pattern?: string;
}
export function NumericFormField<T extends FieldValues>({
  field,
  id,
  label,
  formatProps,
  options,
  error,
  disabled,
  className,
  placeholder,
  pattern,
}: NumericFormFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();
  const fieldError = get(errors, field)?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={field}
      rules={options}
      render={({ field: { name, onChange, onBlur, value } }) => (
        <NumericInput
          key={`numeric-input-field-${name}`}
          id={id}
          name={name}
          label={label}
          value={value}
          placeholder={placeholder}
          required={(options?.required as boolean) || false}
          error={fieldError}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          formatProps={formatProps}
          pattern={pattern}
          className={className}
        />
      )}
    />
  );
}
