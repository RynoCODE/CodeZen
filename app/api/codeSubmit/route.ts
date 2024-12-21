import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/redisClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { problemId, userId, code, language } = body;

    console.log('Request body:', body);

    await client.lPush('submisions', JSON.stringify({ problemId, userId, code, language }));
    console.log('Submission successful');

    return NextResponse.json({ message: 'Submission successful' }, { status: 200 });
  } catch (err) {
    console.error(`Submission failed: ${err}`);
    return NextResponse.json({ message: `Submission failed: ${err}` }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method GET is not allowed' }, { status: 405 });
}
