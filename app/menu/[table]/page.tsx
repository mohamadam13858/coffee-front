'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const categories = [
  { title: 'بار گرم', slug: 'hot' },
  { title: 'بار سرد', slug: 'cold' },
  { title: 'دمنوش', slug: 'herbal-tea' },
  { title: 'دسر و کیک', slug: 'dessert' },
  { title: 'صبحانه', slug: 'breakfast' },
];

export default function MenuPage() {
  const params = useParams();
  const encodedTable = params.table as string;
  const table = decodeURIComponent(encodedTable);
  const router = useRouter();

  return (
    <div className="items-center px-5 py-12 md:py-16 min-h-screen">
      <div className="w-full max-w-2xl flex flex-col items-center text-center mx-auto">
        <div className="mt-10 mb-20 md:mb-24">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wider text-white drop-shadow-lg">
            منو کافه سان کروسان
          </h1>

        
          <div className="mt-6 flex flex-row-reverse items-center justify-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-6 py-3 bg-amber-800/30 hover:bg-amber-700/80 text-white text-xl font-medium rounded-xl shadow-md transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="بازگشت به انتخاب شماره میز"
            >
              <span className="text-2xl">←</span>  
              بازگشت
            </button>

            <p className="text-xl text-white">
              میز شماره {table}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/menu/${table}/category/${cat.slug}`}
              className="w-fit min-w-55 max-w-[90%] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-3xl"
            >
              <div className="bg-[#8A6750] backdrop-blur-md border border-amber-800/50 rounded-3xl shadow-xl px-10 py-5 md:px-12 md:py-6 cursor-pointer">
                <div className="text-center text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md whitespace-nowrap">
                  {cat.title}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-amber-200/80 text-lg font-light">
            کافه کروسان • با عشق برای شما ☕✨
          </p>
        </div>
      </div>
    </div>
  );
}