import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* লোগো ও ব্র্যান্ড স্লোগান */}
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-lg">🛒</span>
            <span className="font-extrabold text-gray-900 text-base">বাজার দর</span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </span>
          </div>
          <p className="text-xs text-gray-400">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>

        {/* কুইক লিঙ্কস ও কপিরাইট */}
        <div className="flex flex-col sm:items-end gap-1.5 text-xs text-gray-400">
          <div className="flex items-center justify-center gap-4 text-gray-500 font-medium">
            <Link href="/" className="hover:text-emerald-600 transition">
              হোম
            </Link>
            <span>•</span>
            <Link href="/signin" className="hover:text-emerald-600 transition">
              সাইন ইন
            </Link>
            <span>•</span>
            <Link href="/signup" className="hover:text-emerald-600 transition">
              সাইন আপ
            </Link>
          </div>
          <p className="text-[11px] text-gray-400">
            © ২০২৬ বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;