'use client'
import './globals.css';
import Navbar from '../components/Navbar';
import { useAppStore } from '../store/appstore';
import GlobalAlert from '../components/GlobalAlert';
import Footer from '../components/Footer';
import { useEffect } from 'react';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const loadProfile = useAppStore((s) => s.loadProfile);

useEffect(() => {
    loadProfile();
  }, [loadProfile]);
  return (
    <html lang="en">
      <body>
        <Navbar />
        <GlobalAlert />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}

