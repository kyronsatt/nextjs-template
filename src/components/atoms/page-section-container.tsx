import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IPageSectionContainer {
  children: ReactNode;
  sectionName: string;
  dark?: boolean;
  noPadding?: boolean;
}
export function PageSectionContainer({
  children,
  sectionName,
  dark,
  noPadding = false,
}: IPageSectionContainer) {
  const bgClassName = dark ? "bg-dark-1" : "bg-light-1";
  return (
    <div
      id={sectionName}
      className={twMerge(
        "h-full w-full",
        noPadding ? "px-0" : "px-4 md:px-12 xl:px-24 wide:px-48",
        bgClassName
      )}
    >
      {children}
    </div>
  );
}
