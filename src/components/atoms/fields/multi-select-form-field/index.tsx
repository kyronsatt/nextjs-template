import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { get } from "lodash";

import { MultiSelectInput, MultiSelectInputProps } from "./input";

export interface MultiSelectFormFieldProps<T extends FieldValues> {
  field: FieldPath<T>;
  label: string;
  id: string;
  inputOptions: { label: string; value: string }[];
  placeholder?: string;
  options?: RegisterOptions;
  isLoading?: boolean | undefined;
  onMenuScrollToBottom?: () => void;
  noOptionsMessage?:
    | ((obj: { inputValue: string }) => React.ReactNode)
    | undefined;
}

export function MultiSelectFormField<T extends FieldValues>({
  field,
  label,
  id,
  inputOptions,
  placeholder,
  options,
  isLoading,
  noOptionsMessage,
  onMenuScrollToBottom,
}: MultiSelectFormFieldProps<T>) {
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
      render={({ field: { ref, name, onChange, onBlur, value } }) => {
        const optionsValues = inputOptions.map((option) => option.value);
        const translatedValue: typeof inputOptions = [];
        (value as string[])?.forEach((v) => {
          const indexOfOption = optionsValues.indexOf(`${v}`);
          if (indexOfOption > -1)
            translatedValue.push(inputOptions[indexOfOption]);
        });

        return (
          <MultiSelectInput
            id={id}
            label={label}
            inputOptions={inputOptions}
            isLoading={isLoading}
            // @ts-expect-error
            value={translatedValue}
            onBlur={onBlur}
            isDisabled={options?.disabled}
            className="z-20 rounded-small text-paragraph-medium"
            placeholder={placeholder}
            name={name}
            error={fieldError}
            onInputChange={(inputValue: string) =>
              options?.onChange && options?.onChange(inputValue)
            }
            onChange={(selectedOptions: any) => {
              const selectedOptionsValues = (
                selectedOptions as MultiSelectInputProps["inputOptions"]
              ).map((option) => option.value);
              onChange(selectedOptionsValues);
            }}
            onMenuScrollToBottom={onMenuScrollToBottom}
            noOptionsMessage={noOptionsMessage}
          />
        );
      }}
    />
  );
}
