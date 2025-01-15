import { twMerge } from "tailwind-merge";
import { Reveal } from "./reveal";

interface IPageSectionHeader {
  title: string;
  subtitle: string;
  dark?: boolean;
}
export function PageSectionHeader({
  title,
  subtitle,
  dark,
}: IPageSectionHeader) {
  const colorClassName = dark ? "text-light-1" : "text-dark-1";
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-1 md:gap-3 mt-8 mb-4 px-6 md:px-10 lg:px-14 text-center",
        colorClassName
      )}
    >
      <Reveal
        moveFrom="TOP"
        tagName="span"
        className={twMerge(
          "text-xs md:text-md font-medium",
          dark ? "text-gray-300" : "text-gray-600"
        )}
      >
        {subtitle}
      </Reveal>
      <Reveal
        tagName="h1"
        delay={0.2}
        className="px-3 xl:px-36"
        style={{ lineHeight: "120%" }}
      >
        {title}
      </Reveal>
    </div>
  );
}
