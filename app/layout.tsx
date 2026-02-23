import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/header';

export const metadata: Metadata = {
  title: 'کروسان کافه',
  description: 'خوش آمدید به کافه کروسان – قهوه، کروسان و لحظات خوب',
  manifest: '/manifest'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#d97706" />
      </head>
      <body>
        <main className="flex-1 h-full">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}