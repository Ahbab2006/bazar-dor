'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn.email({
        email,
        password,
        fetchOptions: {
  onSuccess: () => {
    toast.success('সফলভাবে সাইন ইন হয়েছে!');
    window.location.href = '/'; 
  },
  onError: (ctx) => {
    toast.error(ctx.error.message || 'ভুল ইমেইল অথবা পাসওয়ার্ড দিয়েছেন!');
  }
},
      });
    } catch {
      setLoading(false);
      toast.error('সাইন ইন করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।');
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    try {
      await signIn.social({
        provider,
        callbackURL: '/',
      });
    } catch {
      toast.error(`${provider} দিয়ে লগইন করতে সমস্যা হয়েছে`);
    }
  };

  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-gray-900">সাইন ইন</h1>
          <p className="text-xs sm:text-sm text-gray-500">আপনার একাউন্টে প্রবেশ করুন</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">ইমেইল</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-2.5 rounded-xl text-sm transition shadow-sm"
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <span className="w-full border-t border-gray-200"></span>
          <span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-wider relative">
            অথবা
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn('google')}
            className="w-1/2 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <span>🌐</span> Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignIn('github')}
            className="w-1/2 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <span>🐙</span> GitHub
          </button>
        </div>

        <p className="text-center text-xs text-gray-500">
          নতুন একাউন্ট খুলতে চান?{' '}
          <Link href="/signup" className="text-emerald-600 font-bold hover:underline">
            নিবন্ধন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}