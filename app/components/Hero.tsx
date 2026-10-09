'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import HeroPic from '@/public/bazar-hero.png';

export default function Hero() {
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const banglaDate = new Date().toLocaleDateString('bn-BD', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setDate(banglaDate);
  }, []);

  return (
    <section className="bg-white border border-gray-100 rounded-[32px] p-8 sm:p-12 my-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">

      <div className="space-y-4 max-w-xl text-left">

        <div className="inline-block bg-[#eaf5ef] text-[#1e824c] text-xs font-semibold px-3.5 py-1.5 rounded-full">
          {date || 'শুক্রবার, ৯ অক্টোবর, ২০২৬'}
        </div>

        <h1 className="text-3xl sm:text-[38px] font-black text-gray-900 leading-tight">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <div className="pt-2">
          <a
            href="#sob-ponno"
            className="inline-block bg-[#058b42] hover:bg-[#047738] text-white font-medium text-sm px-6 py-2.5 rounded-xl shadow-sm transition"
          >
            সব পণ্য দেখুন
          </a>
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-center">
        <Image
          src={HeroPic}
          height={240}
          width={240}
          alt="Bazar Hero"
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}