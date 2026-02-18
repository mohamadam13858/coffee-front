import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header/header';

export const metadata: Metadata = {
  title: 'سان کروسان کافه',
  description: 'خوش آمدید به کافه سان کروسان – قهوه، کروسان و لحظات خوب',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <main className="flex-1 h-full">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}