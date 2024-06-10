import type { Metadata } from "next";
import ClientRootLayout from "./clientLayout";

export const metadata: Metadata = {
  title: "Driver",
  description: "Driver. Планируйте. Обучайте.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientRootLayout>{children}</ClientRootLayout>
  );
}
