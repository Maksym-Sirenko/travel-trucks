import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const base = process.env.MOCKAPI_BASE_URL;
  if (!base) {
    return NextResponse.json({ error: 'MOCKAPI_BASE_URL is missing' }, { status: 500 });
  }

  const { id } = await ctx.params;

  const upstream = `${base.replace(/\/$/, '')}/campers/${id}`;
  const res = await fetch(upstream, { cache: 'no-store' });

  if (!res.ok) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}




