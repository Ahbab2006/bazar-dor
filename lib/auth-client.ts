import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL না দিলে স্বয়ংক্রিয়ভাবে কারেন্ট ব্রাউজার ডোমেইন নিয়ে নেয়, যা Vercel-এ নিখুঁত কাজ করে:
  baseURL: process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : undefined),
});

export const { signIn, signUp, signOut, useSession } = authClient;




// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
// });

// export const { signIn, signUp, useSession, signOut, updateUser } = authClient;