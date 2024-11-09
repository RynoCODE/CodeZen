import { NextResponse } from 'next/server';
import { createClient } from 'redis';

const client = createClient({
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
  socket: {
    host: process.env.NEXT_PUBLIC_REDIS_URL,
    port: 10298,
  },
});

client.connect();

client.on('error', (err) => console.log('Redis Client Error', err));

export async function POST(req: Request) {
  const { problemId, userId, code, language } = await req.json();
  try {
    await client.lPush('submissions', JSON.stringify({ problemId, userId, code, language }));
    return NextResponse.json({ message: 'Submission successful' });
  } catch (err) {
    return NextResponse.json({ message: `Submission failed: ${err}` }, { status: 500 });
  }
}
