// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shafayat Sadid — Full-Stack Developer",
  description: "Portfolio of Shafayat Sadid",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased scroll-smooth",
        geist.variable,
        jetbrainsMono.variable
      )}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Toaster position="top-center" richColors />
       
        {children}
     
      </body>
    </html>
  );
}