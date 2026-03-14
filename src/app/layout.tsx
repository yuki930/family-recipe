import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "味つぎ — 家族の味を、手間なく残す",
  description: "家族のレシピと味の記憶を残すアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
