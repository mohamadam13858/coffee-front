import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toast';
import { AppBackground } from '@/components/layout/app-background';


export const metadata: Metadata = {
  title: 'کافه کروسان',
  description: 'طعمی که هر روز بهش فکر میکنی ☕',
  manifest: '/manifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className='min-h-screen bg-[#080706] text-white antialiased'>
        <AppBackground/>
        <main className="relative z-10">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}