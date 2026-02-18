'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const router = useRouter();

  const handleTableSelect = (num: string) => {
    setSelectedTable(num);
  };

  const handleNext = () => {
    if (!selectedTable) {
      alert('لطفاً یک میز انتخاب کنید');
      return;
    }
    
    router.push(`/menu/${selectedTable}`);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <div className="absolute min-h-screen inset-0 bg-black/45 backdrop-blur-lg z-0" />

      <div className="relative flex flex-col justify-between z-10 max-w-md w-full space-y-6 md:space-y-8">
        <div className="flex flex-row-reverse items-center justify-center">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image
              src="/Frame.png"
              alt="کروسان"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-wide font-serif drop-shadow-md">
            به کافه خوش آمدید
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-lg md:text-xl pt-4 drop-shadow">
            شماره میز خود را انتخاب کنید
          </p>

          <div className="relative grid grid-cols-3 gap-5 sm:gap-6 md:gap-8 py-8 md:py-12 w-2/3 max-w-[320px] sm:max-w-[380px] mx-auto p-10">
            <div
              className={`
                absolute inset-0 
                bg-white/18 
                backdrop-blur-[12px] 
                border border-white/10 
                rounded-2xl
              `}
            />

            {['۱', '۲', '۳', '۴', '۵', '۶'].map((num) => {
              const isSelected = selectedTable === num;

              return (
                <button
                  key={num}
                  onClick={() => handleTableSelect(num)}
                  className={`
                    aspect-square
                    rounded-3xl
                    overflow-hidden
                    text-3xl sm:text-6xl font-bold
                    drop-shadow-md
                    shadow-[0_8px_25px_rgba(0,0,0,0.6),inset_0_2px_6px_rgba(255,255,255,0.15)]
                    hover:shadow-[0_12px_32px_rgba(0,0,0,0.7)]
                    active:scale-95 active:shadow-inner active:translate-y-1
                    transition-all duration-200 ease-out
                    border ${isSelected ? 'border-amber-400 border-4' : 'border-white/15'}
                    flex items-center justify-center
                    ${isSelected 
                      ? 'bg-amber-600 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.6)]' 
                      : 'bg-[#8A6750] hover:bg-[#9a785f]'}
                    text-amber-50
                  `}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedTable}
            className={`
              mt-4 
              text-white text-xl md:text-2xl font-bold 
              py-3 px-6 md:px-14 rounded-full 
              shadow-2xl transition-all duration-200 
              flex items-center gap-3 justify-center
              ${selectedTable 
                ? 'bg-[#8A6750] hover:bg-amber-600 active:bg-amber-800 cursor-pointer' 
                : 'bg-gray-600/50 cursor-not-allowed opacity-60'}
            `}
          >
            <div className="h-10 w-10 flex justify-center items-center">
              <Image 
                src="/next.png" 
                alt="بعدی" 
                width={300} 
                height={300} 
                className="object-contain" 
              />
            </div>
            <span>ادامه</span>
          </button>
        </div>
      </div>
    </main>
  );
}