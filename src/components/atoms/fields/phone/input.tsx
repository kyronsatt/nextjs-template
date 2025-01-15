import React from "react";

import { buildDynamicClasses, InputLabel } from "../general";
import {
  CountryIso2,
  PhoneInput as PhoneInputInternational,
} from "react-international-phone";
import "react-international-phone/style.css";

export interface PhoneInputProps {
  error?: string;
  label?: string;
  value?: string;
  required?: boolean;
  defaultCountry?: CountryIso2;
  onChange: (phone: string) => void;
}

export function PhoneInput({
  label,
  error,
  value,
  defaultCountry,
  onChange,
  required,
}: PhoneInputProps) {
  const dynamicClasses = buildDynamicClasses(error);

  return (
    <div className="flex flex-col text-dark-1">
      {label && <InputLabel {...{ label, required }} />}
      <div className="flex flex-col relative w-full">
        <PhoneInputInternational
          className={dynamicClasses}
          value={value}
          onChange={onChange}
          inputStyle={{
            backgroundColor: "transparent",
            border: 0,
          }}
          defaultCountry={defaultCountry}
          preferredCountries={["br", "us", "gb", "ca"]}
          countrySelectorStyleProps={{
            style: { border: 0 },
            buttonStyle: {
              backgroundColor: "transparent",
              border: 0,
            },
            dropdownStyleProps: {
              style: { zIndex: 80 },
            },
          }}
        />
        <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-light-1-15 to-terciary-40" />
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
