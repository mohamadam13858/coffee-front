"use client"
import Link from 'next/link';

export default function DesktopLanding() {
  const appUrl = "https://your-domain.com"; 

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6 overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(245,158,11,0.08),transparent_40%)]" />

      <div className="relative max-w-2xl w-full text-center space-y-10 animate-fade-in">

        <div className="space-y-4">
          <p className="text-xl sm:text-2xl font-light text-white">
            تجربه‌ای داغ و دلچسب، فقط برای موبایل شما طراحی شده ☕
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-2xl border border-amber-500/20 rounded-3xl p-10 md:p-12 shadow-2xl shadow-amber-900/30 transition-all duration-500 hover:shadow-amber-800/40">
          <div className="space-y-8">
            <p className="text-2xl md:text-3xl font-medium text-amber-50 leading-relaxed">
              لطفاً این صفحه را با گوشی موبایل خود باز کنید
              <br />
              یا QR کد زیر را اسکن نمایید
            </p>

            <div className="relative mx-auto w-72 h-72 md:w-80 md:h-80 bg-gradient-to-br from-amber-100 to-white rounded-2xl shadow-inner overflow-hidden border-8 border-amber-700/40 p-4 transition-transform duration-300 hover:scale-105">
              <div className="w-full h-full bg-white flex items-center justify-center rounded-xl">
                <p className="text-black text-xl font-medium px-6 text-center leading-tight">
                  QR کد لینک اپلیکیشن / وب‌سایت
                  <br />
                  <span className="text-sm opacity-70 mt-2 block">(اینجا کد واقعی نمایش داده می‌شود)</span>
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-600/20 rounded-full blur-2xl" />
            </div>

            <p className="text-lg text-amber-200/80 max-w-md mx-auto">
              بهترین تجربه سفارش، منوی responsive، افزودن سریع به سبد و پرداخت راحت فقط روی موبایل!
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}