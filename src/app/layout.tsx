import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../components/QueryProvider";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

const siliguri = Hind_Siliguri({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "Craft Skills",
  title: "Craft Skills",
  description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://craftskillsbd.com/",
    siteName: "Craft Skills",
    title: "Craft Skills",
    description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
    images: [
      {
        url: "https://craftskillsbd.com/public/img/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Craft Skills",
      },
    ],
    countryName: "Bangladesh",
    emails: ["craftskillsbd@gmail.com"],
    phoneNumbers: ["+88 02 222260615"],
  },
  // Add twitter metadata too
  twitter: {
    card: "summary_large_image",
    title: "Craft Skills",
    description: "কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।",
    images: ["https://craftskillsbd.com/public/img/logo.jpg"],
  },
  // Add optional metadata for better compatibility
  metadataBase: new URL("https://craftskillsbd.com/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${siliguri.className}`}>
        <>
          <ThemeProvider>
            <QueryProvider>
              <>
                <Toaster position="top-center" reverseOrder={false} />
                {children}
              </>
            </QueryProvider>
          </ThemeProvider>
        </>
      </body>
    </html>
  );
}
