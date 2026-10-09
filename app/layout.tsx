import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'বাজার দর - নিত্যপণ্যের বাজারদর',
  description: 'দৈনিক বাজারদরের আপডেট তথ্য',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="bg-gray-50 min-h-screen text-gray-900 antialiased">
        <Toaster position="top-right" />
        
        <Suspense fallback={<div className="h-16 bg-white border-b" />}>
          <Header />
        </Suspense>

        <main>{children}</main>
      </body>
    </html>
  );
}