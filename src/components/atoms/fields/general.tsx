import { twMerge } from "tailwind-merge";

interface IInputLabel {
  label: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}
export function InputLabel({ id, label, required, disabled }: IInputLabel) {
  const disabledClass = disabled ? "text-neutral-40" : "text-black";
  return (
    <div className="flex gap-2 mb-1 ml-1 w-full">
      <label
        htmlFor={id}
        className={`w-full text-sm font-bold ${disabledClass}`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
}

export function buildDynamicClasses(
  error?: string,
  extraClassName?: string,
  disabled?: boolean
) {
  const errorClass = disabled
    ? "outline-none border ring-0"
    : error
    ? "outline-none border-b-[1px] border-b-red-500 ring-red-500"
    : "";
  const focusClass = error
    ? "focus:border-b-1 focus:outline-none focus:border-red-500 focus:ring-red-500"
    : "focus:border-b-1 focus:outline-none focus:border-gray-800 focus:ring-gray-800";
  const backgroundClass = "bg-[#E4E4E4]";
  const commonClass =
    "text-sm font-light py-2 px-3 w-full border-b-[1px] border-dark-1 rounded-none";

  return twMerge(
    commonClass,
    errorClass,
    focusClass,
    backgroundClass,
    extraClassName
  );
}
