"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!name) {
      toast.error("অনুগ্রহ করে আপনার নাম দিন");
      setLoading(false);
      return;
    }

    try {
      const { data: resdata, error } = await signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "নিবন্ধন করা যায়নি, সঠিক তথ্য দিন");
        setLoading(false);
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে সাইন ইন করুন।");
      router.push("/signin");
    } catch (err: any) {
      toast.error(err?.message || "সার্ভার এরর, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      toast.error(`${provider} দিয়ে লগইন করা যায়নি`);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-xs sm:text-sm text-gray-500">আপনার প্রয়োজনীয় তথ্য দিয়ে সাইন আপ করুন</p>
        </div>

        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          {/* নাম ফিল্ড */}
          <TextField isRequired name="name">
            <Label className="text-xs font-semibold text-gray-700">নাম</Label>
            <Input name="name" placeholder="আপনার পুরো নাম" />
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* ইমেইল ফিল্ড */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল অ্যাড্রেস লিখুন";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-gray-700">ইমেইল</Label>
            <Input name="email" placeholder="john@example.com" />
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* পাসওয়ার্ড ফিল্ড */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে";
              }
              if (!/[A-Z]/.test(value)) {
                return "পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর (A-Z) থাকতে হবে";
              }
              if (!/[0-9]/.test(value)) {
                return "পাসওয়ার্ডে অন্তত একটি সংখ্যা (0-9) থাকতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-gray-700">পাসওয়ার্ড</Label>
            <Input name="password" placeholder="পাসওয়ার্ড লিখুন" />
            <Description className="text-[11px] text-gray-400 mt-1">
              কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর ও একটি সংখ্যা থাকতে হবে
            </Description>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* বাটনসমূহ */}
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              isDisabled={loading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-xl transition"
            >
              {loading ? "নিবন্ধন হচ্ছে..." : "সাইন আপ"}
            </Button>
            <Button type="reset" variant="secondary" className="rounded-xl">
              রিসেট
            </Button>
          </div>
        </Form>

        {/* সোশ্যাল সাইন আপ */}
        <div className="relative flex items-center justify-center">
          <span className="w-full border-t border-gray-200"></span>
          <span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-wider relative">
            অথবা
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="w-1/2 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <span>🌐</span> Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="w-1/2 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <span>🐙</span> GitHub
          </button>
        </div>

        <p className="text-center text-xs text-gray-500">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-emerald-600 font-bold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}