import { ReactNode } from "react";

export function BentoGridLayoutRoot({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8 mt-12 mb-32 xl:mt-20 mx-4 md:mx-8">
      {children}
    </div>
  );
}
