'use client';

import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContex';

export default function CartFooter() {
  const searchParams = useSearchParams();
  const table = searchParams.get('table')

  const router = useRouter();
  const pathname = usePathname();
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;
  const isCartPage = pathname === `/menu/${table}/category/cart`;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#463123] backdrop-blur-md border-t border-[#463123] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-center">
        <button
          onClick={() => router.push(isCartPage ? '/checkout' : `/menu/${table}/category/cart`)}
          className="relative flex h-15 items-center justify-center gap-3 bg-[#8A6750] active:bg-amber-900 transition-all text-white font-medium text-lg rounded-2xl shadow-lg w-full max-w-xs"
        >
          {!isCartPage && (
            <ShoppingCart className="w-15 h-15" strokeWidth={2} />
          )}

  
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-2 shadow-md">
              {totalItems}
            </span>
          )}

          <span className="font-bold text-2xl">
            {isCartPage ? 'پرداخت' : 'سبد خرید'}
          </span>

          {isCartPage && totalPrice > 0 && (
            <span className="text-2zl font-bold">
              {totalPrice.toLocaleString('fa-IR')} تومان
            </span>
          )}
        </button>
      </div>
    </footer>
  );
}