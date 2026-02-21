'use client';

import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

interface CartFooterProps {
  itemCount?: number; 
}

export default function CartFooter({ itemCount = 0 }: CartFooterProps) {
  const router = useRouter();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#463123] backdrop-blur-md border-t border-[#463123] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-center">
        <button
          onClick={() => router.push('/cart')} 
          className="relative flex items-center justify-center gap-3 bg-[#8A6750]  active:bg-amber-900 transition-all text-white font-medium text-lg rounded-2xl shadow-lg w-full max-w-xs"
        >
          <ShoppingCart className="w-15 h-15" strokeWidth={2} />
          
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-2 shadow-md">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </footer>
  );
}