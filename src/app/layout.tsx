import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import {dark} from "@clerk/themes";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BetterClaw",
    template: "%s | BetterClaw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider appearance={{
	      theme: dark,
      }}>
    <html
      lang="en"
      className={`${montserrat.className} ${geistSans.variable} ${geistMono.variable} flex h-full antialiased`}
    >
      <body className="min-h-full flex flex-col w-full">{children}</body>
    </html>
      </ClerkProvider>
  );
}
