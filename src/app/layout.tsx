'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { AuthProvider } from '@/firebase/authProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src="https://kit.fontawesome.com/739a42caa2.js"
        // crossOrigin="anonymous"
        rel="preload"
      ></Script>
      <body
        className={`${inter.className} bg-white`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
