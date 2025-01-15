import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { getTranslations } from "next-intl/server";

import { NextIntlClientProvider, useMessages } from "next-intl";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: { default: t("title"), template: `%s | ${t("title")}` },
    description: t("description"),
    metadataBase: new URL("https://www.appName.com.br"),
    keywords: ["startup", "tech"],
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: t("title"),
      type: "website",
      url: "https://www.appName.com.br/",
    },
    authors: { name: "AppName", url: "https://www.appName.com.br/" },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale} className="overflow-x-clip">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Insert here any global scripts like HotJar, Google Tag and others */}
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
