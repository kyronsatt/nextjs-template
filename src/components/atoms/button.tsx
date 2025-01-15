import React from "react";
import { twMerge } from "tailwind-merge";

import { IReveal, Reveal } from "./reveal";

type IButtonKind = "primary" | "secondary" | "ghost";
type IButtonSize = "normal" | "large" | "xlarge";

export type IButtonColors =
  | "light-1"
  | "gradient-primary-blue-2"
  | "gradient-purple-pink"
  | "gradient-orange-yellow";

interface IButton extends Pick<IReveal, "duration" | "delay" | "moveFrom"> {
  label: string;
  onClick?: () => void;
  kind?: IButtonKind;
  size?: IButtonSize;
  type?: "button" | "submit" | "reset";
  color?: IButtonColors;
  className?: string;
  noAnimate?: boolean;
}

export function Button({
  label,
  onClick,
  kind = "ghost",
  size = "normal",
  type = "button",
  color = "light-1",
  noAnimate = true,
  className: customClassName,
  ...animationAttrs
}: IButton) {
  const bgClassNames: Record<IButtonKind, string> = {
    primary: `bg-${color}`,
    secondary: "bg-dark-1",
    ghost: "bg-transparent",
  };
  const colorClassNames: Record<IButtonKind, string> = {
    primary: "text-dark-2",
    secondary: "text-light-1",
    ghost: "text-light-1",
  };
  const hoverClassNames: Record<IButtonKind, string> = {
    primary: "hover:scale-105 hover:shadow-light-1/20",
    secondary: "hover:bg-[#2C2C2C] hover:shadow-dark-1/20",
    ghost: "hover:bg-light-1 hover:text-dark-1",
  };
  const sizeClassNames: Record<IButtonSize, string> = {
    normal: "py-1 px-8 text-sm",
    large: "py-1 px-10 text-lg",
    xlarge: "py-3 px-24 text-2xl",
  };
  const shadowClassNames: Record<IButtonKind, string> = {
    primary: "hover:shadow-light",
    secondary: "hover:shadow-dark",
    ghost: "",
  };
  const focusClassNames: Record<IButtonKind, string> = {
    primary: "focus:bg-light-2",
    secondary: "focus:bg-dark-3",
    ghost: "focus:bg-dark-4",
  };
  const generalClassNames =
    "rounded-xsmall transition duration-300 ease-in-out font-semibold";

  const finalClassName = twMerge(
    bgClassNames[kind],
    colorClassNames[kind],
    hoverClassNames[kind],
    sizeClassNames[size],
    shadowClassNames[kind],
    focusClassNames[kind],
    generalClassNames,
    customClassName
  );

  const animationAttrsControl = noAnimate ? {} : animationAttrs;
  const buttonsProps: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > = {
    type: type,
    onClick: onClick,
    className: finalClassName,
  };

  return (
    <>
      {noAnimate ? (
        <button {...buttonsProps}>{label}</button>
      ) : (
        // @ts-expect-error :: reveal with button props
        <Reveal tagName="button" {...buttonsProps} {...animationAttrsControl}>
          {label}
        </Reveal>
      )}
    </>
  );
}
