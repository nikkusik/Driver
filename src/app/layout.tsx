import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Driver",
  description: "Driver. Планируйте. Обучайте.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="h-20 flex flex-row place-items-center sticky top-0">
          <Link href="/" className="flex h-12 flex-initial w-32 rounded-lg ml-4 mr-2 shadow-custom hover:shadow-cyan-500 bg-gradient-to-r from-blue-500 to-my-gray hover:from-cyan-500 hover:to-my-gray items-center place-content-center">
            <p>Driver</p>
          </Link>
          <Link href="/schedule" className="flex h-12 flex-initial w-32 rounded-lg mx-2 shadow-custom hover:shadow-cyan-500 items-center place-content-center">
            <p className="text-center">Расписание</p>
          </Link>
          <Link href="/enter" className="flex h-12 flex-initial w-32 rounded-lg mx-2 shadow-custom hover:shadow-cyan-500 items-center place-content-center mr-2 ml-auto">
            <p className="text-center">Записаться</p>
          </Link>
        </div>
        {children}</body>
    </html>
  );
}
