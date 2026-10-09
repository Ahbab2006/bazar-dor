'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { toBengali, formatUnit } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const { data: session } = useSession();

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pctValue = Math.abs(product.change?.pct || 0);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error('পণ্যের বিস্তারিত তথ্য দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন');
      router.push('/signin');
      return;
    }

    router.push(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-gray-100 hover:border-emerald-300 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between cursor-pointer select-none group"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition">
          {product.image || product.categoryIcon || '🍚'}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm md:text-base leading-snug">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">{formatUnit(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
        <div>
          <span className="text-[11px] text-gray-400 block font-medium">আজকের দাম</span>
          <span className="text-sm md:text-base font-extrabold text-gray-900">
            {toBengali(product.today)} টাকা
          </span>
        </div>

        <div
          className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
            isUp
              ? 'text-rose-600 bg-rose-50'
              : isDown
              ? 'text-emerald-700 bg-emerald-50'
              : 'text-gray-500 bg-gray-100'
          }`}
        >
          <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
          <span>{toBengali(pctValue)}%</span>
        </div>
      </div>
    </div>
  );
}