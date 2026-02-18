'use client';

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
    <div className=" text-white font-sans">


      <div className="text-center py-6">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-200 drop-shadow-md">
          منو بار گرم
        </h2>
      </div>


      <div className="flex flex-row-reverse items-center justify-between px-4 py-3 border-b border-amber-800/40">
        <div className='flex justify-center items-center gap-20'>
          <div className="text-white text-3xl font-medium">قیمت</div>
          <div className="text-white text-3xl">🛒</div>
        </div>
        <div className="text-white text-3xl font-bold">آیتم</div>
      </div>


      <div className="px-3 py-2 space-y-3">
        {items.map((item) => {
          const qty = quantities[item.name] || 0;

          return (
            <div className='flex flex-row-reverse justify-between items-center gap-2 '>

              <div className=" w-1/3 flex  items-center bg-white rounded-full px-1.5 py-1 min-w-25 justify-between">
                <button
                  onClick={() => updateQty(item.name, -1)}
                  className="w-8 h-8 flex items-center justify-center text-amber-300 text-xl font-bold rounded-full hover:bg-amber-900/40 transition disabled:opacity-50"
                  disabled={qty === 0}
                >
                  –
                </button>

                <span className="text-white text-xl font-semibold min-w-[2rem] text-center">
                  {qty || '+'}
                </span>

                <button
                  onClick={() => updateQty(item.name, 1)}
                  className="w-8 h-8 flex items-center justify-center text-amber-300 text-xl font-bold rounded-full hover:bg-amber-900/40 transition"
                >
                  +
                </button>
              </div>

              <div className='w-2/3 bg-white rounded-2xl'>

                <div className=" flex  flex-row-reverse items-center px-3 py-3  justify-between gap-5">
                  <div className=" text-center">
                    <div className="text-black text-2xl font-bold tracking-tight">
                      {item.price}
                    </div>
                  </div>
                  <div className=" text-center">
                    <h3 className="text-black text-2xl font-bold">{item.name}</h3>
                  </div>

                </div>
                <div className='text-center'>
                  <span className='text-black text-center text-xs'>{item.desc}</span>
                </div>
              </div>

            </div>

          );
        })}
      </div>
      <div className="h-20" />
    </div>
  );
} 