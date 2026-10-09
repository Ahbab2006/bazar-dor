'use client';

import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import { toBengali } from '@/lib/utils';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.api-store.workers.dev/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  const risers = products
    .filter((item: any) => item.change?.dir === 'up')
    .sort((a: any, b: any) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  const fallers = products
    .filter((item: any) => item.change?.dir === 'down')
    .sort((a: any, b: any) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 pb-16 space-y-10">
        <Hero />
        <div className="py-20 text-center text-gray-500 font-medium animate-pulse">
          বাজারের তথ্য লোড হচ্ছে...
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 pb-16 space-y-10">

      <Hero />

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-rose-600 font-bold text-sm">▲</span>
          <h2 className="text-lg md:text-xl font-bold text-gray-800">আজ দাম বেড়েছে</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {risers.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold text-sm">▼</span>
          <h2 className="text-lg md:text-xl font-bold text-gray-800">আজ দাম কমেছে</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {fallers.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section id="sob-ponno" className="scroll-mt-24 space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800">সব পণ্য</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5">
            মোট {toBengali(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {products.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}