import React, { useEffect } from "react";
import { Navbar } from "@/components/elements/Navbar";
// import { Footer } from "@/components/elements/Footer";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  useEffect(() => {
    document.title = title;
  },[title]);
  return (
    <div>
      <Navbar />
      <main className="flex flex-col gap-y-20 md:gap-y-32 overflow-hidden">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
