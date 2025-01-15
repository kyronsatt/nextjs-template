"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";

import { Link, usePathname } from "@/navigation";
import { useIsOnMobileDevice } from "@/util/common";

import { Button } from "@/components/atoms/button";
import HeroIcon from "@/components/atoms/hero-icon";
import { Reveal } from "@/components/atoms/reveal";
import { PAGE_ONE, PAGE_TWO } from "@/constants/routes";

interface IMenuButton {
  closeMobileMenu?: () => void;
  href: string;
  label: string;
}
function MenuButton({ closeMobileMenu, href, label }: IMenuButton) {
  const [isBeenHovered, setIsBeenHovered] = useState<boolean>(false);
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="flex-col relative self-center content-center h-full py-1"
      onMouseEnter={() => setIsBeenHovered(true)}
      onMouseLeave={() => setIsBeenHovered(false)}
    >
      <Button
        label={label}
        onClick={closeMobileMenu}
        className="hover:bg-transparent hover:text-light-1 focus:bg-transparent px-2 text-xs xl:text-sm"
      />
      <div
        className={twMerge(
          "h-[2px] w-full bg-gradient-primary-blue-2 absolute bottom-0 transition-all duration-300",
          isActive || isBeenHovered ? "opacity-100" : "opacity-0"
        )}
      />
    </Link>
  );
}
function MenuButtons({ closeMobileMenu }: { closeMobileMenu?: () => void }) {
  const t = useTranslations("Menu");

  return (
    <>
      <MenuButton
        href={PAGE_ONE}
        label={t("pageOneButton")}
        closeMobileMenu={closeMobileMenu}
      />
      <MenuButton
        href={PAGE_TWO}
        label={t("pageTwoButton")}
        closeMobileMenu={closeMobileMenu}
      />
    </>
  );
}

function DesktopMenu() {
  return (
    <div id="menu-buttons" className="flex justify-between gap-5">
      <MenuButtons />
    </div>
  );
}

function LanguageSelector() {
  const pathname = usePathname();
  const locale = useLocale();

  const hrefSpplitedOnQueryParams =
    typeof window === "object" ? window?.location.href.split("?") : [];
  const queryParams =
    hrefSpplitedOnQueryParams.length > 1 ? hrefSpplitedOnQueryParams.pop() : "";
  const newHref = [pathname, queryParams].join("?");

  return (
    <div className="flex gap-2 items-center px-2 py-0 rounded-default">
      <Link
        href={newHref}
        locale="pt"
        className={twMerge(
          "relative w-5 md:w-6 h-5 md:h-6 cursor-pointer hover:scale-110 focus:scale-105 transition-all hover:opacity-100",
          locale === "pt" ? "opacity-100" : "opacity-40"
        )}
      >
        <Image
          alt=""
          src="/flags/br-flag.png"
          className="object-contain rounded-2xl"
          fill
        />
      </Link>
      <Link
        href={newHref}
        locale="en"
        className={twMerge(
          "relative w-5 md:w-6 h-5 md:h-6 cursor-pointer hover:scale-110 focus:scale-105 transition-all opacity-40 hover:opacity-100",
          locale === "en" ? "opacity-100" : "opacity-40"
        )}
      >
        <Image
          alt=""
          src="/flags/usa-flag.png"
          className="object-contain rounded-2xl"
          fill
        />
      </Link>
    </div>
  );
}

export function HeaderBar() {
  const isOnMobile = useIsOnMobileDevice();
  const [openMobileMenu, setOpenMobileMenu] = React.useState<boolean>(false);

  const commonClassNames =
    "w-[90vw] self-center backdrop-blur-sm fixed z-[200]";

  const autoCloseRef = React.useRef(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autoCloseRef.current &&
        // @ts-expect-error -> never types conflict
        !autoCloseRef.current.contains(event.target)
      ) {
        setOpenMobileMenu && setOpenMobileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const [hidden, setHidden] = React.useState<boolean>(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previousScroll = scrollY?.getPrevious() as number;
    if (latest < previousScroll) {
      setHidden(false);
    } else if (latest > 100 && latest > previousScroll) {
      setHidden(true);
    }
  });

  return (
    <>
      <Reveal
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 1, y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        delay={0}
        duration={0}
        className={twMerge(
          "mt-4 pl-6 md:pl-14 pr-6 py-3 wide:py-4 flex justify-between bg-dark-1/90 rounded-default transition-all duration-300",
          commonClassNames
        )}
      >
        <div className="flex gap-3 md:gap-3 md:mr-8">
          <Link
            href={PAGE_ONE}
            className="w-1/3 lg:w-[145px] flex items-center"
          >
            <img
              src="/brand/app-logo.png"
              alt="appName-logo"
              className="w-[145px] aspect-auto"
            />
          </Link>
          <LanguageSelector />
        </div>
        {isOnMobile !== null ? (
          isOnMobile ? (
            <HeroIcon
              icon="Bars3Icon"
              className="text-light-1 w-5 h-5"
              onClick={() => setOpenMobileMenu((prev) => !prev)}
            />
          ) : (
            <DesktopMenu />
          )
        ) : (
          <></>
        )}
      </Reveal>
      <AnimatePresence>
        {openMobileMenu && (
          <Reveal
            delay={0}
            className={twMerge(
              "top-20 bg-dark-1/90 rounded-default p-4",
              commonClassNames
            )}
            moveFrom="TOP"
            duration={0.2}
          >
            <div
              ref={autoCloseRef}
              className="flex flex-col gap-3 items-center"
            >
              <MenuButtons closeMobileMenu={() => setOpenMobileMenu(false)} />
            </div>
          </Reveal>
        )}
      </AnimatePresence>
    </>
  );
}
