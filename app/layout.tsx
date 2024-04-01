import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSerif = Merriweather({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Rizki & Sherly",
  description: "Rizki & Sherly Wedding Invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={cn(
          "min-h-screen bg-primary bg-no-repeat font-serif antialiased",
          fontSerif.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
