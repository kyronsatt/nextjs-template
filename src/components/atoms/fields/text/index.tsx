import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { get } from "lodash";

import TextInput from "./input";

export interface TextFormFieldProps<T extends FieldValues> {
  field: Path<T>;
  id: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  options?: RegisterOptions;
  placeholder?: string;
}

export function TextFormField<T extends FieldValues>({
  className,
  disabled,
  field,
  id,
  label,
  options,
  placeholder,
}: TextFormFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();
  const fieldError = get(errors, field)?.message as string | undefined;

  return (
    <>
      <Controller
        control={control}
        name={field}
        rules={options}
        render={({ field: { name, onChange, onBlur, value } }) => (
          <TextInput
            key={`text-input-field-${name}`}
            className={className}
            disabled={disabled}
            error={fieldError}
            id={id}
            label={label}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            required={(options?.required as boolean) || false}
            value={value}
          />
        )}
      />
    </>
  );
}
