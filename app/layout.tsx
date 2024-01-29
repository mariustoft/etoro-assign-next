import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Convertify",
  description: "Bassic crypto convertor",
};

import { ReactNode } from "react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-200 flex flex-col  gap-4 text-color-red">
        <Link
          href="/"
          replace
          className="text-4xl font-bold flex justify-around items-center text-center text-color-red m-1 relative"
        >
          <p className="text-4xl self-end px-1 font-bold hover:text-green-500  absolute left-0">
            ₿
          </p>
          {metadata.title?.toString()}
        </Link>
        {children}
      </body>
    </html>
  );
}
