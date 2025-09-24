import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Võ Tấn Dũng - Developer Portfolio",
  description:
    "Futuristic tech-themed portfolio of Võ Tấn Dũng, a backend and fullstack developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaCode.variable} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
