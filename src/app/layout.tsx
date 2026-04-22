// app/layout.tsx
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../components/QueryProvider";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

// ✅ Use GoogleTagManager from next/third-parties
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { GTMTest } from "../components/GTMTest";

const siliguri = Hind_Siliguri({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "Craft Skills",
  title: "Craft Skills",
  description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
  metadataBase: new URL("https://craftskillsbd.com/"),
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: ["en_US"],
    url: "https://craftskillsbd.com",
    siteName: "Craft Skills",
    title: "Craft Skills",
    description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
    images: [
      {
        url: "https://craftskillsbd.com/img/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Craft Skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Craft Skills",
    description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
    images: ["/public/img/logo.jpg"],
  },
};

// ✅ Use your actual GTM ID
const GTM_ID = "GTM-WN2XNQW9";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* dataLayer init - MUST be before GTM */}
        <Script id="gtm-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
          `}
        </Script>
      </head>

      <body className={siliguri.className}>
        {/* ✅ GTM - Use the GoogleTagManager component */}
        <GoogleTagManager gtmId={GTM_ID} />
        <GTMTest />
        {/* ✅ Also add noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ThemeProvider>
          <QueryProvider>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}