import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google"; // 폰트 임포트
import NavBar from "./components/navbar/NavBar";

/* 폰트 정의 */
const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mair BnB",
  description: "airbnb clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
