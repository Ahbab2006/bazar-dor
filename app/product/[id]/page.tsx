'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { toBengali, formatUnit } from '@/lib/utils';
import toast from 'react-hot-toast';

function ProductDetailContent() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error('পণ্যের বিস্তারিত তথ্য দেখতে আগে সাইন ইন করুন');
      router.push('/signin');
    }
  }, [session, isPending, router]);


  useEffect(() => {
    if (!id || !session?.user) return;

    setLoading(true);
    fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('পণ্য লোড করা যায়নি');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setProduct(null);
        setLoading(false);
      });
  }, [id, session]);

  if (isPending || (session?.user && loading)) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div className="h-44 bg-gray-200 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="text-5xl">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800">পণ্যটি পাওয়া যায়নি</h2>
        <Link
          href="/"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = Math.abs(product.change?.pct || 0);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/"
        className="text-xs font-semibold text-gray-500 hover:text-emerald-600 inline-flex items-center gap-1"
      >
        ← সব পণ্যে ফিরে যান
      </Link>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
        <div className="text-6xl p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center shrink-0">
          {product.image || product.categoryIcon || '🍚'}
        </div>
        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1 rounded-lg font-semibold">
              {product.categoryNameBn || 'নিত্যপ্রয়োজনীয়'}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-lg font-semibold">
              {formatUnit(product.unit)}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{product.nameBn}</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            সর্বশেষ বাজার পর্যালোচনা ও বিভিন্ন জেলার বর্তমান খুচরা দর
          </p>
        </div>

        <div
          className={`px-4 py-2 rounded-2xl flex items-center gap-1.5 font-bold text-sm shrink-0 ${
            isUp
              ? 'text-rose-600 bg-rose-50 border border-rose-100'
              : isDown
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-100'
              : 'text-gray-600 bg-gray-100'
          }`}
        >
          <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
          <span>{toBengali(pct)}% পরিবর্তন</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
          <span className="text-[11px] sm:text-xs text-gray-400 block font-medium mb-1">আজকের গড় দর</span>
          <span className="text-base sm:text-2xl font-extrabold text-gray-900">
            {toBengali(product.today)} <span className="text-xs font-normal">টাকা</span>
          </span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
          <span className="text-[11px] sm:text-xs text-gray-400 block font-medium mb-1">গতকালের দর</span>
          <span className="text-base sm:text-2xl font-extrabold text-gray-700">
            {toBengali(product.yesterday || product.today)} <span className="text-xs font-normal">টাকা</span>
          </span>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
          <span className="text-[11px] sm:text-xs text-gray-400 block font-medium mb-1">গত মাসের দর</span>
          <span className="text-base sm:text-2xl font-extrabold text-emerald-600">
            {toBengali(product.lastMonth || product.today)} <span className="text-xs font-normal">টাকা</span>
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="border-b pb-3">
          <h2 className="font-bold text-gray-900 text-lg">বাজারভিত্তিক রেট ও পরিসীমা</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-400 text-xs uppercase font-semibold">
                <th className="pb-3">বাজারের নাম</th>
                <th className="pb-3">বিভাগ / অঞ্চল</th>
                <th className="pb-3 text-right">দর পরিসীমা</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              {product.markets?.map((m: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50/70">
                  <td className="py-3.5 font-medium text-gray-900">{m.market}</td>
                  <td className="py-3.5 text-gray-500">{m.division}</td>
                  <td className="py-3.5 text-right font-bold text-emerald-600">
                    {toBengali(m.min)} – {toBengali(m.max)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
          <div className="h-44 bg-gray-200 rounded-3xl animate-pulse" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
          </div>
        </main>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}