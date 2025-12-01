'use client'
import './globals.css';
import Navbar from '../components/Navbar';
import { useAppStore } from '../store/appstore';
import GlobalAlert from '../components/GlobalAlert';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const loadProfile = useAppStore((s) => s.loadProfile);
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <GlobalAlert/>
      </body>
    </html>
  );
}

