import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Support Chat',
  description: 'Customer Support Chat',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src="https://kit.fontawesome.com/739a42caa2.js"
        crossOrigin="anonymous"
      ></Script>
      <body
        className={`${inter.className} bg-black`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
