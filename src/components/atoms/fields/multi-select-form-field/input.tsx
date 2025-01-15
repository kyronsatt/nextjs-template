import React from "react";
import Select, {
  GroupBase,
  InputProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  components,
  PlaceholderProps,
} from "react-select";
import { RefCallBack } from "react-hook-form";

import HeroIcon from "../../hero-icon";
import { InputLabel } from "../general";

function Input<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: InputProps<Option, IsMulti, Group>) {
  return (
    <components.Input {...props} inputClassName="focus:ring-transparent" />
  );
}

function MultiValueContainer<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: MultiValueGenericProps<Option, IsMulti, Group>) {
  return (
    <components.MultiValueContainer
      {...props}
      innerProps={{
        ...props.innerProps,
      }}
    />
  );
}

function MultiValueLabel<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: MultiValueGenericProps<Option, IsMulti, Group>) {
  return (
    <components.MultiValueLabel
      {...props}
      innerProps={{ ...props.innerProps, className: "text-black" }}
    />
  );
}

function Placeholder<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: PlaceholderProps<Option, IsMulti, Group>) {
  return (
    <components.Placeholder
      {...props}
      innerProps={{ ...props.innerProps, className: "text-paragraph-medium" }}
    />
  );
}

function MultiValueRemove<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: MultiValueRemoveProps<Option, IsMulti, Group>) {
  return (
    <components.MultiValueRemove
      {...props}
      innerProps={{ ...props.innerProps, className: "text-white" }}
    >
      <HeroIcon icon="XMarkIcon" className="w-3 h-3" />
    </components.MultiValueRemove>
  );
}

interface ISelectInputOption {
  label: string;
  value: string;
}
export interface MultiSelectInputProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id: string;
  inputOptions: Array<ISelectInputOption>;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  ref?: RefCallBack;
}

export function MultiSelectInput({
  label,
  id,
  inputOptions,
  error,
  required,
  disabled,
  ref,
  ...attrs
}: MultiSelectInputProps) {
  const { className } = attrs;
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <InputLabel {...{ label, required, disabled, id }} />}
      <div className="flex flex-col relative w-full">
        <Select
          {...attrs}
          // @ts-expect-error
          options={inputOptions}
          isMulti={true}
          inputId={id}
          components={{
            Input,
            MultiValueContainer,
            MultiValueLabel,
            MultiValueRemove,
            Placeholder,
          }}
          styles={{
            input: (base) => ({
              ...base,
              color: "#3D3D3D",
              fontWeight: 300,
            }),
            placeholder: (base) => ({
              ...base,
              letterSpacing: 0.5,
            }),
            menuList: (base) => ({
              ...base,
              backgroundColor: "#FFFFFF",
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#090909",
              borderRadius: 30,
              paddingInlineStart: 6,
            }),
            indicatorSeparator: (base) => ({
              ...base,
              backgroundColor: "#5E5E5E",
            }),
            multiValueLabel: (base) => ({
              ...base,
              backgroundColor: "#090909",
              borderRadius: 30,
              paddingInline: 10,
              fontWeight: 300,
              fontSize: 12,
              color: "#FFFFFF",
            }),
            multiValueRemove: (base) => ({
              ...base,
              backgroundColor: "transparent",
              borderRadius: 30,
              paddingInline: 8,
              color: "#FFFFFF",
              ":hover": { color: "#1A1A1A", backgroundColor: "#E4E4E4" },
            }),
            option: (base) => ({
              ...base,
              ":hover": { backgroundColor: "#E4E4E4" },
              backgroundColor: "#FFFFFF",
              color: "#090909",
              borderRadius: 6,
              marginBlock: 2,
              marginInline: 4,
              width: "98%",
            }),
            control: (base) => ({
              ...base,
              border: 0,
              borderBottom: error ? "1px solid red" : "1px solid #090909",
              boxShadow: "none",
              height: "fit",
              backgroundColor: "#E4E4E4",
              borderRadius: 0,
              paddingInline: 2,
              paddingBlock: 4,
            }),
            menuPortal: (base) => ({
              ...base,
              zIndex: 50,
            }),
          }}
        />
        <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-light-1-15 to-terciary-40" />
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
