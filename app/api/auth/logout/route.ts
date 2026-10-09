import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    // ১. BetterAuth সার্ভার সাইন-আউট কল করা
    await auth.api.signOut({
      headers: req.headers,
    });
  } catch (e) {
    // এরর আসলেও কুকি পরিষ্কার করা জারি থাকবে
  }

  // ২. BetterAuth-এর সেশন কুকিগুলো সার্ভার থেকে নিশ্চিতভাবে ডিলিট করা
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const response = NextResponse.json({ success: true });

  allCookies.forEach((cookie) => {
    if (cookie.name.includes('better-auth') || cookie.name.includes('session')) {
      response.cookies.set(cookie.name, '', {
        path: '/',
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }
  });

  return response;
}