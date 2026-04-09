import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Use psql or an RPC' });
}
