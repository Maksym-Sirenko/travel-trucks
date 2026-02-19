import { NextResponse } from 'next/server';

const FEATURE_KEYS = [
  'AC',
  'bathroom',
  'kitchen',
  'TV',
  'radio',
  'refrigerator',
  'microwave',
  'gas',
  'water',
] as const;

// type FeatureKey = (typeof FEATURE_KEYS)[number];

function toBool(v: string | null) {
  if (!v) return false;
  const s = v.trim().toLowerCase();
  return s === 'true' || s === '1' || s === 'yes' || s === 'on';
}

function safeNumber(v: string | null, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export async function GET(req: Request) {
  try {
    const base = process.env.MOCKAPI_BASE_URL;
    if (!base) {
      return NextResponse.json(
        { total: 0, items: [], error: 'MOCKAPI_BASE_URL is missing' },
        { status: 500 }
      );
    }

    const url = new URL(req.url);
    const sp = new URLSearchParams();

    const page = safeNumber(url.searchParams.get('page'), 1);
    const limit = safeNumber(url.searchParams.get('limit'), 4);
    sp.set('page', String(page));
    sp.set('limit', String(limit));

    const location = (url.searchParams.get('location') ?? '').trim();
    if (location) sp.set('location', location);

    const form = (url.searchParams.get('form') ?? '').trim();
    if (form) sp.set('form', form);

    const transmission = (url.searchParams.get('transmission') ?? '').trim();
    if (transmission) sp.set('transmission', transmission);

    const engine = (url.searchParams.get('engine') ?? '').trim();
    if (engine) sp.set('engine', engine);

    for (const k of FEATURE_KEYS) {
      if (toBool(url.searchParams.get(k))) {
        sp.set(k, 'true');
      }
    }

    const upstream = `${base.replace(/\/$/, '')}/campers?${sp.toString()}`;
    const res = await fetch(upstream, { cache: 'no-store' });

    if (!res.ok) {
      return NextResponse.json(
        { total: 0, items: [], error: `Upstream failed: ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { total: 0, items: [], error: 'Server error in /api/catalog' },
      { status: 500 }
    );
  }
}


