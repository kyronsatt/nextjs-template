import React from "react";

import { buildDynamicClasses, InputLabel } from "../general";
import {
  NumericFormat,
  NumericFormatProps,
  PatternFormat,
} from "react-number-format";

export interface NumericInputProps extends NumericFormatProps {
  error?: string;
  label?: string;
  required?: boolean;
  formatProps?: NumericFormatProps;
  pattern?: string;
}

export function NumericInput({
  label,
  error,
  required,
  formatProps,
  pattern,
  ...attrs
}: NumericInputProps) {
  const {
    className: extraClassName,
    disabled,
    id,
    placeholder,
    ...restAttrs
  } = attrs;

  const dynamicClasses = buildDynamicClasses(error, extraClassName, disabled);
  const InputWrapper = pattern ? PatternFormat : NumericFormat;

  return (
    <div className="flex flex-col text-dark-1 w-full">
      {label && <InputLabel {...{ label, required, disabled, id }} />}
      <div className="flex flex-col relative w-full">
        <InputWrapper
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          className={dynamicClasses}
          format={pattern as string}
          {...formatProps}
          {...restAttrs}
        />
        <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-light-1-15 to-terciary-40" />
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
