'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Pages où on ne veut pas afficher navbar et footer
  const authPages = ['/login', '/register', '/forgot-password'];
  const isAuthPage = authPages.includes(pathname);

  // Changer la classe du body selon la page
  useEffect(() => {
    const body = document.body;
    if (isAuthPage) {
      body.className = body.className.replace('bg-gray-50', 'bg-black');
    } else {
      body.className = body.className.replace('bg-black', 'bg-gray-50');
    }
  }, [isAuthPage]);

  if (isAuthPage) {
    return (
      <main className="min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
