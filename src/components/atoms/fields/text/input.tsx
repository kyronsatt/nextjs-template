import React from "react";

import { buildDynamicClasses, InputLabel } from "../general";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  required?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, required, ...attrs }, ref) => {
    const {
      className: extraClassName,
      disabled,
      id,
      placeholder,
      ...restAttrs
    } = attrs;

    const dynamicClasses = buildDynamicClasses(error, extraClassName, disabled);

    return (
      <div className="flex flex-col text-dark-1">
        {label && <InputLabel {...{ label, required, disabled, id }} />}
        <div className="flex flex-col relative w-full">
          <input
            type="text"
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            {...restAttrs}
            ref={ref}
            className={dynamicClasses}
            contentEditable={false}
          />
          <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-light-1-15 to-terciary-40" />
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);
TextInput.displayName = "TextInput";

export default TextInput;
