import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../components/QueryProvider";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

import Script from "next/script";
import { SessionTracker } from "../components/SessionTracker";

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

const GTM_ID = "GTM-WN2XNQW9";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* dataLayer init */}
        <Script id="gtm-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
          `}
        </Script>

        {/* GTM SCRIPT */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>

      <body className={siliguri.className}>
        <ThemeProvider>
          <QueryProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <SessionTracker />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Hind_Siliguri } from "next/font/google";
// import { Toaster } from "react-hot-toast";
// import QueryProvider from "../components/QueryProvider";
// import { ThemeProvider } from "../components/theme-provider";
// import "./globals.css";

// // ✅ NEW (Best practice)
// import { GoogleTagManager } from "@next/third-parties/google";
// import Script from "next/script";

// const siliguri = Hind_Siliguri({
//   weight: "400",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   applicationName: "Craft Skills",
//   title: "Craft Skills",
//   description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
//   metadataBase: new URL("https://craftskillsbd.com/"),

//   openGraph: {
//     type: "website",
//     locale: "bn_BD",
//     alternateLocale: ["en_US"],
//     url: "https://craftskillsbd.com",
//     siteName: "Craft Skills",
//     title: "Craft Skills",
//     description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
//     images: [
//       {
//         url: "https://craftskillsbd.com/img/logo.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Craft Skills",
//       },
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Craft Skills",
//     description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
//     images: ["/public/img/logo.jpg"],
//   },
// };

// // ✅ Your GTM ID
// const GTM_ID = "GTM-TR4DPZF4";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* 🔥 dataLayer INIT (BEFORE GTM) */}
//         <Script id="gtm-init" strategy="beforeInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//           `}
//         </Script>
//       </head>

//       <body className={siliguri.className}>
//         {/* ✅ GTM */}
//         <GoogleTagManager gtmId={GTM_ID} />

//         <ThemeProvider>
//           <QueryProvider>
//             <Toaster position="top-center" reverseOrder={false} />
//             {children}
//           </QueryProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
