"use client";

import { PAGE_ONE, PAGE_TWO } from "@/constants/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations();

  return (
    <div className="flex flex-col md:flex-row w-full h-fit bg-light-1 text-dark-5 py-8 px-6 md:px-16 gap-5 lg:gap-16">
      <div className="flex flex-col gap-6 w-full">
        <Link href={PAGE_ONE}>
          <img
            src="/brand/app-logo.png"
            alt="appName-logo"
            className="w-[90px] md:w-[145px] aspect-auto"
          />
        </Link>
        <div className="flex flex-col md:flex-row md:divide-x-[1px] divide-dark-1/50 gap-5 w-fit text-xs md:text-md font-normal">
          <div className="flex flex-col gap-2 md:gap-3 md:pr-36">
            <Link href={PAGE_ONE}>{t("Menu.pageOneButton")}</Link>
          </div>
          <div className="flex flex-col gap-2 md:gap-3 md:pr-36">
            <Link href={PAGE_TWO}>{t("Menu.pageTwoButton")}</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-xs mt-8 md:mt-0 h-full self-end text-left md:text-right w-full">
        {t("Footer.disclaimer")} <br></br>
        <br></br> &copy;2024. {t("Footer.rightsReservation")}
      </div>
    </div>
  );
}
