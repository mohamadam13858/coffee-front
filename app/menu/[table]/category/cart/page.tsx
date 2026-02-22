'use client';

import { useCart } from '@/contexts/CartContex';
import { ShoppingCart } from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, updateQuantity, totalItems, totalPrice } = useCart();
  const router = useRouter();

  if (totalItems === 0) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center">
        <ShoppingCart className="w-24 h-24 text-white mb-6" strokeWidth={1.5} />
        <h2 className="text-3xl font-bold text-white mb-4">سبد خرید خالی است</h2>
        <button
          onClick={() => router.back()}
          className="mt-6 px-8 py-4 bg-amber-600 hover:bg-amber-500 active:scale-98 rounded-2xl text-white font-bold text-lg transition-all"
        >
          بازگشت به منو
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white font-sans pb-32 ">
      <div className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-200 drop-shadow-lg">
          سبد خرید شما
        </h1>
      </div>

      <div className="px-4 md:px-6 py-6 space-y-5">
        {cart.map((item) => (
          <div
            key={item.name}
            className="flex flex-row-reverse justify-between items-center gap-4 rounded-2xl"
          >
            <div
              className={`
                flex items-center gap-2 py-4 transition-all duration-300 ease-out
                w-2/5 justify-between
              `}
            >
              <button
                onClick={() => updateQuantity(item.name, -1)}
                className="w-11 h-11 flex items-center justify-center bg-white rounded-xl text-black hover:bg-red-50 active:bg-red-100 transition shadow-sm text-2xl"
              >
                🗑
              </button>

              <div className="w-12 h-11 flex items-center justify-center bg-white rounded-xl text-black text-xl font-bold shadow-inner min-w-[48px]">
                {item.quantity}
              </div>

              <button
                onClick={() => updateQuantity(item.name, 1)}
                className="w-11 h-11 flex items-center justify-center bg-white rounded-xl text-amber-600 hover:bg-amber-50 active:bg-amber-100 transition shadow-sm text-3xl font-bold"
              >
                +
              </button>
            </div>

            <div className="w-3/4 bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="flex flex-row-reverse items-center justify-between px-5 py-4">
                <div className="text-center">
                  <div className="text-gray-900 text-xl md:text-3xl font-bold tracking-tight">
                    {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                <div className="text-right flex-1 ">
                  <h3 className="text-gray-900 text-xl md:text-3xl font-bold">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="pb-2 text-center">
                <span className="text-gray-600 text-xs">
                  قیمت واحد: {item.price} تومان

                </span>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="h-40" />
    </div>
  );
}