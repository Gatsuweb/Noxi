import type { Metadata } from "next";
import type { Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { PwaInstallModal } from "@/src/components/parentzlite/PwaInstallModal";
import { PwaRegistration } from "@/src/components/parentzlite/PwaRegistration";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ParentZlite",
    template: "%s | ParentZlite",
  },
  description: "Une PWA douce pour progresser dans sa parentalite avec Noxi.",
  applicationName: "ParentZlite",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ParentZlite",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#8B49FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${baloo.variable} ${nunito.variable}`}>
      <body>
        <PwaRegistration />
        <PwaInstallModal />
        {children}
      </body>
    </html>
  );
}
