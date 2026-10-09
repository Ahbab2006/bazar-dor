import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { Product } from '@/app/types';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    await client.connect();
    const db = client.db('better-auth-db2');
    const result = await db.collection('user').updateOne(
      { email: email },
      { $set: { name: name } }
    );

    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
  }
}