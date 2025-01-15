import React from "react";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { get } from "lodash";

import { PhoneInput } from "./input";
import { CountryIso2 } from "react-international-phone";

export interface PhoneFormFieldProps<T extends FieldValues> {
  field: Path<T>;
  label?: string;
  options?: RegisterOptions;
  defaultCountry?: CountryIso2;
}
export function PhoneFormField<T extends FieldValues>({
  field,
  label,
  options,
  defaultCountry,
}: PhoneFormFieldProps<T>) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<T>();
  const fieldError = get(errors, field)?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={field}
      rules={options}
      render={({ field: { name, value } }) => (
        <PhoneInput
          key={`phone-input-field-${name}`}
          label={label}
          value={value}
          required={(options?.required as boolean) || false}
          error={fieldError}
          defaultCountry={defaultCountry}
          // @ts-expect-error -> dynamic value
          onChange={(phone) => setValue(field, phone)}
        />
      )}
    />
  );
}
