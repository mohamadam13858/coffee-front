
import React from 'react';

export const metadata = {
  title: 'منوی کافه سان کروسان',
  description: 'بار گرم، بار سرد، دمنوش، دسر و کیک، صبحانه – کافه سان کروسان',
};

export default function MenuPage() {
  return (
    <div className=" items-center px-5 py-12 md:py-16">
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        <div className=" mt-10 mb-20 md:mb-24">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wider text-white  drop-shadow-lg">
             منو کافه کروسان
          </h1>
        </div>

        <div className="w-full flex flex-col items-center gap-6 md:gap-8 scroll-auto overflow-auto">
          <div className="bg-[#8A6750] backdrop-blur-md border border-amber-800/40 rounded-3xl shadow-xl overflow-hidden w-fit min-w-35 max-w-5  px-8 py-3 md:px-10 md:py-4">
            <div className="text-center text-2xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md whitespace-nowrap">
              بار گرم
            </div>
          </div>


          <div className="bg-[#8A6750] backdrop-blur-md border border-amber-800/40 rounded-3xl shadow-xl overflow-hidden w-fit min-w-35  max-w-5  px-8 py-3 md:px-10 md:py-4">
            <div className="text-center text-2xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md whitespace-nowrap">
              بار سرد
            </div>
          </div>


          <div className="bg-[#8A6750] border border-amber-800/40 rounded-3xl shadow-xl overflow-hidden w-fit min-w-35 max-w-5 px-8 py-3 md:px-10 md:py-4">
            <div className="text-center text-2xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md whitespace-nowrap">
              دمنوش
            </div>
          </div>


          <div className="bg-[#8A6750]  border border-amber-800/40 rounded-3xl shadow-xl overflow-hidden w-fit min-w-35 max-w-5 px-8 py-3 md:px-10 md:py-4">
            <div className="text-center text-2xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md whitespace-nowrap">
              دسر و کیک
            </div>
          </div>


          <div className="bg-[#8A6750]  border border-amber-800/40 rounded-3xl shadow-xl overflow-hidden w-fit min-w-35  max-w-5  px-8 py-3 md:px-10 md:py-4">
            <div className=" text-center text-2xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md whitespace-nowrap">
              صبحانه
            </div>
          </div>


          {/* <div className="mt-12 md:mt-16 text-center"> */}
            {/* <p className="text-amber-200/70 text-base md:text-lg font-light">
              کافه سان‌کروسان • با عشق برای شما ☕✨
            </p>
            <p className="mt-2 text-amber-300/60 text-sm">
              قیمت‌ها به زودی اضافه می‌شوند
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}