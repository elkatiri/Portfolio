"use client";

import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Navbar />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
