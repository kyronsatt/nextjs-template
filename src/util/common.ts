"use client";

import React from "react";

export function useIsOnMobileDevice() {
  const [isOnMobile, setIsOnMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setIsOnMobile(typeof window === "object" && window?.innerWidth <= 1024);
  }, []);

  return isOnMobile;
}
