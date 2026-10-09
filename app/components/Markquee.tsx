'use client';

import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Product } from '../types';

const toBengali = (num: number | string) => {
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bn[+d]);
};

const formatUnit = (unit: string) => {
  switch (unit?.toLowerCase()) {
    case 'kg':
      return 'কেজি';
    case 'liter':
    case 'litre':
      return 'লিটার';
    case 'dozen':
      return 'ডজন';
    case 'pc':
    case 'piece':
      return 'পিস';
    default:
      return unit || 'কেজি';
  }
};

export default function Markquee() {
  const [products, setProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('https://api.api-store.workers.dev/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => console.error('Failed to load marquee data:', err));
  }, []);

  // SSR হাইড্রেশন এরর এড়াতে মাউন্ট হওয়ার পর রেন্ডার
  if (!mounted || !products.length) {
    return null;
  }

  return (
    <div className="bg-emerald-50/70 border-t border-b border-emerald-100 py-2 text-xs text-gray-800">
      <Marquee pauseOnHover={true} speed={60} gradient={false}>
        {products.map((item: Product) => {
          const isUp = item.change?.dir === 'up';
          const isDown = item.change?.dir === 'down';
          const pct = Math.abs(item.change?.pct || 0);

          return (
            <span key={item.id} className="inline-flex items-center gap-1.5 mx-5 font-medium shrink-0">
              <span>{item.image || item.categoryIcon || '🛍️'}</span>
              <span className="font-semibold text-gray-900">{item.nameBn}</span>
              <span className="text-gray-700">
                {toBengali(item.today)} টাকা/{formatUnit(item.unit)}
              </span>
              <span
                className={`font-bold inline-flex items-center gap-0.5 ${
                  isUp ? 'text-rose-600' : isDown ? 'text-emerald-700' : 'text-gray-500'
                }`}
              >
                <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
                <span>{toBengali(pct)}%</span>
              </span>
              <span className="text-gray-300 ml-3">•</span>
            </span>
          );
        })}
      </Marquee>
    </div>
  );
}