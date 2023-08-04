import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google"; // 폰트 임포트
import NavBar from "./components/navbar/NavBar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import LoginModal from "./components/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import { getCurrentUser } from "./actions/getCurrentUser";

/* 레이아웃 가져오는데 3.5초 걸림 */

/* 폰트 정의 */
const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mair BnB",
  description: "airbnb clone",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28"></div>
        {children}
      </body>
    </html>
  );
}
