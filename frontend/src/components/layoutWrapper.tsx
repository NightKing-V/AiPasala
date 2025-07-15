// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChatPage = pathname.startsWith("/chat");

  return (
    <>
      {!isChatPage && <Navbar />}
      <main>{children}</main>
      {!isChatPage && <Footer />}
    </>
  );
}
