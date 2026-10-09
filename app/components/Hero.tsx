import React from 'react';

export default function Hero() {
  return (
    <section className="bg-emerald-50/60 border border-emerald-100 rounded-3xl p-6 sm:p-10 my-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left Content */}
      <div className="space-y-4 max-w-xl text-center md:text-left">
        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold">
          আজকের বাজার দর আপডেট
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          আজকের বাজারের সঠিক দর এক নজরে
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <div>
          <a
            href="#sob-ponno"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm sm:text-base px-6 py-3 rounded-xl shadow transition"
          >
            সব পণ্য দেখুন
          </a>
        </div>
      </div>

      {/* Right Banner Illustration */}
      <div className="shrink-0 flex items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-emerald-100 text-7xl sm:text-8xl">
        🧺
      </div>
    </section>
  );
}