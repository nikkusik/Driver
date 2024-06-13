import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import LayoutClient from "./clientLayout";
import { getCookie } from "./api/api";
import { SpeedInsights as Next } from "@vercel/speed-insights/next"
import { SpeedInsights as React } from "@vercel/speed-insights/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Driver",
  description: "Driver. Планируйте. Обучайте.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getCookie();
  return (
    <html lang="ru">
      <body>
        <LayoutClient user={user}>{children}</LayoutClient>
        {/* <Next />
        <React /> */}
      </body>
    </html>
  );
}