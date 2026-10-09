'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface NavLinksProps {
  categories: Category[];
}

export default function NavLinks({ categories = [] }: NavLinksProps) {
  const pathname = usePathname();

  return (
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
  );
}