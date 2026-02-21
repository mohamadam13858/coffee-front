'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

type Item = {
  name: string;
  price: string;
  desc: string;
};

const items: Item[] = [
  { name: 'اسپرسو', price: '۱۰۰', desc: 'دوبل شات. عربیکا ۱۰۰%' },
  { name: 'آمریکانو', price: '۱۱۵', desc: 'اسپرسو + آب داغ' },
  { name: 'کاپوچینو', price: '۱۴۵', desc: 'اسپرسو + شیر + فوم غلیظ' },
  { name: 'لاته', price: '۱۵۰', desc: 'اسپرسو + شیر بخارپز + کمی فوم' },
  { name: 'موکا', price: '۱۷۰', desc: 'اسپرسو + شکلات + شیر + خامه' },
  { name: 'هات چاکلت', price: '۱۶۰', desc: 'شکلات داغ + شیر + خامه' },
];

export default function HotMenuPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQty = (name: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[name] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [name]: next };
    });
  };

  return (
    <div className="min-h-screen text-white font-sans pb-24">
      <div className="text-center py-8">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-200 drop-shadow-lg">
          منو بار گرم
        </h2>
      </div>

      <div className="flex flex-row-reverse items-center justify-between px-5">
        <div className="flex items-center gap-12">
          <div className="text-white text-3xl font-medium">قیمت</div>
          <div className="text-white text-3xl">
            <ShoppingCart className="w-8 h-8" strokeWidth={1.8} />
          </div>
        </div>
        <div className="text-white text-3xl font-bold">آیتم</div>
      </div>

      <div className="px-4 py-5 space-y-4">
        {items.map((item) => {
          const qty = quantities[item.name] || 0;

          return (
            <div
              key={item.name}
              className="flex flex-row-reverse justify-between items-center gap-3 rounded-2xl"
            >
              <div
                className={`
                  flex items-center gap-1.5 py-4 transition-all duration-300 ease-out
                  ${qty === 0 ? 'w-1/4 justify-center' : 'w-2/5 justify-between'}
                `}
              >
                {qty > 0 ? (
                  <>
                    <button
                      onClick={() => updateQty(item.name, -1)}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-red-500 hover:text-red-400 hover:bg-red-50 active:bg-red-100 transition shadow-sm text-xl"
                    >
                      🗑️
                    </button>

                    <div className="w-11 h-10 flex items-center justify-center bg-gray-800 rounded-xl text-white text-xl font-bold shadow-inner min-w-[2.75rem]">
                      {qty}
                    </div>

                    <button
                      onClick={() => updateQty(item.name, 1)}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-amber-600 hover:bg-amber-100 active:bg-amber-200 transition shadow-sm text-2xl font-bold"
                    >
                      +
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => updateQty(item.name, 1)}
                    className="min-w-[100px] h-22 flex items-center justify-center bg-white rounded-2xl text-black text-4xl font-bold shadow-lg hover:bg-amber-500 active:scale-95 transition-all duration-300"
                  >
                    +
                  </button>
                )}
              </div>

            
              <div className="flex-1 w-3/4 bg-white rounded-2xl overflow-hidden">
                <div className="flex flex-row-reverse items-center justify-between px-4 py-3">
                  <div className="text-center">
                    <div className="text-gray-900 text-2xl font-bold tracking-tight">
                      {item.price}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-gray-900 text-2xl font-bold">{item.name}</h3>
                  </div>
                </div>

                <div className="px-4 pb-3 text-center">
                  <span className="text-gray-700 text-sm">{item.desc}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-24" />
    </div>
  );
}