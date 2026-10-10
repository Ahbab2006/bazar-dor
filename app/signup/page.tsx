'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signUp, signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('আপনার নাম লিখুন');
      return;
    }
    if (password.length < 8) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password: password,
      });

      if (error) {
        toast.error(error.message || 'অ্যাকাউন্ট তৈরি করা যায়নি');
        setLoading(false);
      } else {
        toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!');

        window.location.href = '/';
      }
    } catch {
      toast.error('সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন');
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    try {
      await signIn.social({
        provider,
        callbackURL: '/',
      });
    } catch {
      toast.error(`${provider} দিয়ে লগইন সম্পন্ন করা যায়নি`);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            বাজার দরের বিস্তারিত তথ্য দেখতে সাইন আপ করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">আপনার নাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">ইমেইল ঠিকানা</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর লিখুন"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-2.5 rounded-xl text-sm transition shadow-sm cursor-pointer"
          >
            {loading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'সাইন আপ'}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <span className="w-full border-t border-gray-200" />
          <span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-wider relative">
            অথবা সোশ্যাল দিয়ে
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleSocialAuth('google')}
            className="w-1/2 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <span>🌐</span> Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialAuth('github')}
            className="w-1/2 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <span>🐙</span> GitHub
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 pt-1">
          ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{' '}
          <Link href="/signin" className="text-emerald-600 font-bold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}