'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Driver",
  description: "Driver. Планируйте. Обучайте.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<{ fullName: string, email: string, role: string, phone: string } | null>(null);

  useEffect(() => {
    // Получаем данные пользователя из локального хранилища или API
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="h-20 flex items-center justify-between sticky top-0 bg-neutral-950 z-10 px-4">
          <div className="flex justify-center items-center space-x-4 flex-grow"> {/* Контейнер для первых трех кнопок */}
            <Link href="/schedule" className="flex h-12 w-32 rounded-lg shadow-custom hover:shadow-cyan-500 items-center justify-center bg-gradient-to-r from-blue-500 hover:from-cyan-500 hover:to-my-gray">
              <p className="text-center">Расписание</p>
            </Link>
            <Link href="/" className="flex h-12 w-32 rounded-lg shadow-custom hover:shadow-cyan-500 items-center justify-center">
              <p>Driver</p>
            </Link>
            <Link href="/enter" className="flex h-12 w-32 rounded-lg shadow-custom hover:shadow-cyan-500 items-center justify-center bg-gradient-to-l from-red-500 hover:bg-gradient-to-l hover:from-red-700">
              <p className="text-center">Записаться</p>
            </Link>
          </div>
          <div className="absolute right-0 px-4"> {/* Контейнер для кнопки "Войти" */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">{user.fullName}</span>
                <Link href="/profile" className="text-white underline">
                  Профиль
                </Link>
              </div>
            ) : (
              <Link href="/enter" className="text-white underline">
                Войти
              </Link>
            )}
          </div>
        </div>
        <div className="-z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
