import { NextResponse } from 'next/server';
import client from '@/lib/redisClient';

export async function POST(req: Request) {
  const { problemId, userId, code, language } = await req.json();
  try {
    await client.lPush('submissions', JSON.stringify({ problemId, userId, code, language }));
    return NextResponse.json({ message: 'Submission successful' });
  } catch (err) {
    return NextResponse.json({ message: `Submission failed: ${err}` }, { status: 500 });
  }
}
