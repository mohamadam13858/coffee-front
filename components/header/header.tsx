"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div
      className={`
        sticky top-0 z-50
        transition-opacity duration-500 ease-in-out
        ${isHome 
          ? "opacity-50 pointer-events-none" 
          : "opacity-100"}
      `}
    >
      <div className="bg-[#463123] border-b border-[#463123] shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              className="text-white hover:text-amber-300 focus:outline-none"
              aria-label="باز کردن منو"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex flex-col items-center leading-tight">
              <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white font-serif">
                کافه کروسان
              </h1>
            </div>

            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/Frame.png"
                alt="سان کروسان"
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}