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
          <Link href="/" className="flex h-12 flex-initial w-32 rounded-lg ml-4 mr-2 shadow-custom hover:shadow-cyan-500 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 items-center place-content-center">
            <p>Driver</p>
          </Link>
          <Link href="/test" className="flex h-12 flex-initial w-32 rounded-lg mx-2 shadow-custom hover:shadow-cyan-500 items-center place-content-center">
            <p className="text-center">Записаться</p>
          </Link>
          <button className="h-12 flex-initial w-32 rounded-lg mx-2 shadow-custom hover:shadow-cyan-500">
            Расписание
          </button>
        </div>
        {children}</body>
    </html>
  );
}
