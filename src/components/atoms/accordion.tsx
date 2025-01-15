import { ReactNode, useState } from "react";
import HeroIcon from "./hero-icon";
import { Reveal } from "./reveal";

interface IAccordion {
  title: string;
  children: ReactNode;
}
export function Accordion({ title, children }: IAccordion) {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <Reveal
      className="flex flex-col w-full py-3 px-5 bg-dark-1 rounded-default border-[1px] border-dark-5 cursor-pointer hover:bg-dark-3 transition-all"
      onClick={() => setExpand((prev) => !prev)}
    >
      <div className="flex justify-between gap-3 py-3 px-2">
        <p className="text-lg font-medium">{title}</p>
        <HeroIcon
          icon={expand ? "ChevronUpIcon" : "ChevronDownIcon"}
          className="w-6"
        />
      </div>
      {expand && (
        <Reveal className="flex border-t-[1px] border-dark-5 py-4 px-2">
          {children}
        </Reveal>
      )}
    </Reveal>
  );
}
