'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { getCookie, iUser } from "./api/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Driver",
  description: "Driver. Планируйте. Обучайте.",
};

export default function RootLayout({ children }: { children: React.ReactNode, user: { email: string | null, fullname: string | null, role: string | null, id: string | null } }) {
  const [user, setUser] = useState<iUser | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCookie();
      setUser(userData.id ? userData : null);
    }

    fetchUser();
  }, []);
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="h-20 flex items-center justify-between sticky top-0 bg-neutral-950 z-10 px-4">
          <div className="flex justify-center items-center space-x-4 flex-grow">
            <Link href="/schedule" className="flex h-12 w-32 rounded-lg shadow-custom hover:shadow-cyan-500 items-center justify-center bg-gradient-to-r from-blue-500 hover:from-cyan-500 hover:to-my-gray">
              <p className="text-center">Расписание</p>
            </Link>
            <Link href="/" className="flex h-12 w-32 rounded-lg shadow-custom hover:shadow-cyan-500 items-center justify-center">
              <p>Driver</p>
            </Link>
            {user?.role === "driver" ? (
              <Link href="/add" className="flex h-12 w-32 rounded-lg shadow-custom hover:shadow-cyan-500 items-center justify-center bg-gradient-to-l from-red-500 hover:bg-gradient-to-l hover:from-red-700">
                <p className="text-center">Добавить</p>
              </Link>
            ) : (
              <Link href="/join" className="flex h-12 w-32 rounded-lg shadow-custom hover:shadow-cyan-500 items-center justify-center bg-gradient-to-l from-red-500 hover:bg-gradient-to-l hover:from-red-700">
                <p className="text-center">Записаться</p>
              </Link>
            )
            }
            {/* <p className="text-center">Записать</p> */}
          </div>
          <div className="absolute right-0 px-4">
            {user !== null ? (
              <div className="flex items-center space-x-4">
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
