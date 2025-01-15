import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function BentoGridLayoutRow({
  children,
  reverseOnMobile,
}: {
  children: ReactNode;
  reverseOnMobile?: boolean;
}) {
  return (
    <div
      className={twMerge(
        "flex flex-wrap md:flex-nowrap w-full gap-8",
        reverseOnMobile ? "flex-col-reverse md:flex-row" : ""
      )}
    >
      {children}
    </div>
  );
}
