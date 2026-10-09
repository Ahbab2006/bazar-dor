'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error('প্রোফাইল দেখতে আগে সাইন ইন করুন');
      router.push('/signin');
    } else if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('নাম ফাঁকা রাখা যাবে না');
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          name: name.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'নাম পরিবর্তন করা যায়নি');
      } else {
        toast.success('নাম সফলভাবে পরিবর্তন করা হয়েছে!');
        // হেডার এবং প্রোফাইলে ডাটা রিফ্রেশ করতে উইন্ডো রিলোড
        window.location.reload();
      }
    } catch (err) {
      toast.error('সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন');
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
      </main>
    );
  }

  if (!session) return null;

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-2xl mx-auto font-bold shadow-inner">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h1 className="text-xl font-extrabold text-gray-900">ব্যবহারকারী প্রোফাইল</h1>
          <p className="text-xs text-gray-400">আপনার ব্যক্তিগত তথ্য হালনাগাদ করুন</p>
        </div>

        <form onSubmit={handleUpdateName} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              ইমেইল (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              type="email"
              disabled
              value={session.user?.email || ''}
              className="w-full bg-gray-50 border border-gray-200 text-gray-500 rounded-xl px-3.5 py-2.5 text-sm cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              আপনার নাম পরিবর্তন করুন
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নতুন নাম লিখুন"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-2.5 rounded-xl text-sm transition shadow-sm cursor-pointer"
          >
            {updating ? 'সংরক্ষণ হচ্ছে...' : 'নাম সংরক্ষণ করুন'}
          </button>
        </form>

        <div className="pt-2 border-t text-center">
          <Link href="/" className="text-xs font-medium text-emerald-600 hover:underline">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}