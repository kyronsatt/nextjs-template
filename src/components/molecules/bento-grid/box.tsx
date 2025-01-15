import Image from "next/image";
import { twMerge } from "tailwind-merge";

import HeroIcon, { IHeroIcon } from "@/components/atoms/hero-icon";

export interface IBentoGridBox {
  label: string;
  isMinimal?: boolean;
  labelPosition?: "RIGHT" | "LEFT";
  icon?: IHeroIcon["icon"];
  imageSrc?: string;
  color: "primary-blue-2" | "orange-yellow" | "purple-pink";
}

export function BentoGridBox({
  label,
  isMinimal = false,
  labelPosition = "LEFT",
  icon,
  imageSrc,
  color,
}: IBentoGridBox) {
  return (
    <div
      className={twMerge(
        "rounded-default relative h-[60vw] md:h-[35vw] xl:h-[35vw] overflow-clip border-[1px] border-dark-4",
        isMinimal
          ? "w-full md:w-[45%]"
          : `w-full md:w-[55%] bg-gradient-${color}`
      )}
    >
      <div className="w-full h-full flex flex-col justify-between p-7 lg:p-10 xl:p-14">
        {icon && (
          <div className="relative w-10 md:w-12 lg:w-16 xl:w-20 h-10 md:h-12 lg:h-16 xl:h-20 flex items-center justify-center">
            <div
              className={twMerge(
                `absolute w-full h-full bg-gradient-${color} rounded-full`
              )}
            />
            <HeroIcon
              icon={icon}
              className="w-[90%] rounded-full p-2 md:p-3 lg:p-4 xl:p-5 bg-dark-1 text-light-1 z-50"
            />
          </div>
        )}
        <label
          className={twMerge(
            "text-md md:text-xl lg:text-3xl xl:text-4xl font-semibold",
            isMinimal ? "text-light-1 self-end" : "text-dark-3",
            isMinimal && labelPosition === "RIGHT" && "text-right pl-[30%]",
            isMinimal && labelPosition === "LEFT" && "text-left pr-[30%]"
          )}
        >
          {label}
        </label>
      </div>
      {imageSrc && (
        <div className="absolute bottom-0 xl:-bottom-10 w-full h-1/2 xl:h-3/5">
          <Image
            src={imageSrc}
            alt="desktop-mockup"
            className="z-50 object-contain"
            quality={100}
            priority
            loading="eager"
            fill
          />
        </div>
      )}
      {isMinimal && labelPosition && (
        <div
          className={twMerge(
            `absolute rounded-full w-[50%] aspect-square bg-gradient-${color}`,
            labelPosition === "RIGHT"
              ? "-bottom-[25%] -left-[25%]"
              : "-top-[25%] -right-[25%]"
          )}
        />
      )}
    </div>
  );
}
