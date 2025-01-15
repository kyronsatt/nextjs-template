import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: "pt",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pt|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
