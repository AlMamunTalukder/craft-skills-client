import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../components/QueryProvider";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

// ✅ NEW (Best practice)
import { GoogleTagManager } from "@next/third-parties/google";

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

// ✅ Your GTM ID
const GTM_ID = "GTM-TR4DPZF4";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={siliguri.className}>
        {/* ✅ BEST PRACTICE GTM */}
        <GoogleTagManager gtmId={GTM_ID} />

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



// import type { Metadata } from "next";
// import { Hind_Siliguri } from "next/font/google";
// import { Toaster } from "react-hot-toast";
// import QueryProvider from "../components/QueryProvider";
// import { ThemeProvider } from "../components/theme-provider";
// import "./globals.css";
// import Script from "next/script";

// const siliguri = Hind_Siliguri({
//   weight: "400",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   applicationName: "Craft Skills",
//   title: "Craft Skills",
//   description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
//   openGraph: {
//     type: "website",
//     locale: "en_IE",
//     url: "https://craftskillsbd.com/",
//     siteName: "Craft Skills",
//     title: "Craft Skills",
//     description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
//     images: [
//       {
//         url: "https://craftskillsbd.com/public/img/logo.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Craft Skills",
//       },
//     ],
//     countryName: "Bangladesh",
//     emails: ["craftskillsbd@gmail.com"],
//     phoneNumbers: ["+88 02 222260615"],
//   },
//   // Add twitter metadata too
//   twitter: {
//     card: "summary_large_image",
//     title: "Craft Skills",
//     description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
//     images: ["https://craftskillsbd.com/public/img/logo.jpg"],
//   },
//   // Add optional metadata for better compatibility
//   metadataBase: new URL("https://craftskillsbd.com/"),
// };

// const GTM_ID = "GTM-TR4DPZF4";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* Google Tag Manager Script */}
//         <Script id="gtm-script" strategy="afterInteractive">
//           {`
//             (function(w,d,s,l,i){w[l]=w[l]||[];
//             w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
//             var f=d.getElementsByTagName(s)[0],
//             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
//             j.async=true;
//             j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
//             f.parentNode.insertBefore(j,f);
//             })(window,document,'script','dataLayer','${GTM_ID}');
//           `}
//         </Script>
//       </head>

//       <body className={`${siliguri.className}`}>
//         {/* GTM NoScript (important) */}
//         <noscript>
//           <iframe
//             src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
//             height="0"
//             width="0"
//             style={{ display: "none", visibility: "hidden" }}
//           />
//         </noscript>

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
