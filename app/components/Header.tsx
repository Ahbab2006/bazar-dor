'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Logo from '@/public/logo-icon.png';
// import { useSession, signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useSession } from '@/lib/auth-client';

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
export default function Header() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [date, setDate] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const banglaDate = new Date().toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setDate(banglaDate);

    fetch('https://api.api-store.workers.dev/api/bazardor/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to fetch categories:', err));
  }, []);

  const handleSignOut = async () => {
    try {

      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      await signOut();

      toast.success('সফলভাবে সাইন আউট হয়েছে');
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {

      window.location.href = '/';
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-2xl flex items-center justify-center shadow-sm">
            <Image
              height={40}
              width={40}
              src={Logo}
              alt="Logo"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">বাজার দর</h2>
            <p className="text-xs text-gray-500 font-medium min-h-[16px]">{date}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
  
          {!isPending && session?.user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl hover:bg-emerald-100 transition text-xs sm:text-sm font-semibold shadow-sm"
              >
                <span>👤</span>
                <span className="max-w-[120px] truncate">{session.user.name || 'প্রোফাইল'}</span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-xl transition cursor-pointer"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition shadow-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      <nav className="bg-gray-50/80 border-t overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 py-2">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 transition whitespace-nowrap ${
              pathname === '/'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>🏠</span>
            <span>সব পণ্য</span>
          </Link>

          {categories?.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 transition whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}