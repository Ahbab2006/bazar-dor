'use client';

import React, { useEffect, useState } from 'react';
import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';
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

  useEffect(() => {
    fetch('https://api.api-store.workers.dev/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => console.error('Failed to load marquee data:', err));
  }, []);

  if (!products.length) {
    return null;
  }

  return (
    <div className="bg-emerald-50/70 border-t border-b border-emerald-100 py-1.5 text-xs text-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <MarqueeText direction="left" duration={25}>
          {products.map((item: Product) => {
            const isUp = item.change?.dir === 'up';
            const isDown = item.change?.dir === 'down';
            const pct = Math.abs(item.change?.pct || 0);

            return (
              <span key={item.id} className="inline-flex items-center gap-1.5 mx-4 font-medium">
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
                <span className="text-gray-300 ml-2">•</span>
              </span>
            );
          })}
        </MarqueeText>
      </div>
    </div>
  );
}