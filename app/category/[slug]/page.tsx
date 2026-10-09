'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/app/components/ProductCard';
import { toBengali } from '@/lib/utils';
import { Category, Product } from '@/app/types';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<'default' | 'asc' | 'desc'>('default');
  const [categoryInfo, setCategoryInfo] = useState<{ nameBn: string; icon: string }>({
    nameBn: '',
    icon: '🛍️',
  });

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        const catRes = await fetch('https://api.api-store.workers.dev/api/bazardor/categories');
        const categories = await catRes.json();
        const matchedCat = categories.find((c: Category) => c.slug === slug || c.id === slug);

        if (matchedCat) {
          setCategoryInfo({
            nameBn: matchedCat.nameBn,
            icon: matchedCat.icon || '🛍️',
          });
        }
        const prodRes = await fetch('https://api.api-store.workers.dev/api/bazardor/products');
        const allProducts = await prodRes.json();

        const filtered = allProducts.filter((item: Product) => {
          return (
            item.category?.toLowerCase() === slug.toLowerCase() ||
            (matchedCat && item.categoryNameBn === matchedCat.nameBn)
          );
        });

        setProducts(filtered);
      } catch (err) {
        console.error('Error fetching data:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a.today;
    const priceB = b.today;

    if (sortOption === 'asc') return priceA - priceB;
    if (sortOption === 'desc') return priceB - priceA;

    return 0;
  });

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white border rounded-2xl p-4 h-36 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </main>
    );
  }
  
  if (products.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="text-6xl mb-2">📦</div>
        <h2 className="text-2xl font-bold text-gray-800">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
        </h2>
        <p className="text-sm text-gray-500">
          অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl bg-emerald-50 w-12 h-12 flex items-center justify-center rounded-2xl border border-emerald-100">
            {categoryInfo.icon}
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              {categoryInfo.nameBn || slug}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              মোট {toBengali(products.length)}টি পণ্য তালিকাভুক্ত
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="sort" className="text-sm font-medium text-gray-600">
            সাজান:
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => {
                const value = e.target.value;

                if (value === 'default' || value === 'asc' || value === 'desc') {
                  setSortOption(value);
                }
              }}
              className="appearance-none bg-white border border-gray-300 rounded-xl px-3 py-1.5 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:border-emerald-500 shadow-sm cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              ▼
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}