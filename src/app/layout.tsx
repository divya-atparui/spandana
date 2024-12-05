import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/core/provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spandana Hospital",
  description: "Spandana Hospital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
