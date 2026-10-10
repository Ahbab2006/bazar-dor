'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/app/components/ProductCard';
import { toBengali } from '@/lib/utils';
import { Product } from '@/types';

function CategoryContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    // সরাসরি ক্যাটাগরি URL না ডেকে সব প্রোডাক্ট ফেচ করে ফিল্টার করা
    fetch('https://api.api-store.workers.dev/api/bazardor/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      })
      .then((data: Product[]) => {
        if (Array.isArray(data)) {
          // নির্দিষ্ট slug এর সাথে মিলিয়ে ফিল্টার
          const filtered = data.filter(
            (item) => item.category?.toLowerCase() === slug.toLowerCase()
          );
          setProducts(filtered);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Category fetch error:', err);
        setProducts([]);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-xs font-semibold text-gray-500 hover:text-emerald-600 inline-flex items-center gap-1 mb-2"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {products[0]?.categoryNameBn || 'ক্যাটাগরি পণ্য'}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            মোট {toBengali(products.length)}টি পণ্য পাওয়া গেছে
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center text-gray-400 font-medium">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </main>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}