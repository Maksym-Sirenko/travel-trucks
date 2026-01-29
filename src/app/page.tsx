import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
      <section
        style={{
          border: '1px solid #2a2a2a',
          borderRadius: 16,
          padding: 24,
          display: 'grid',
          gap: 12,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 40 }}>TravelTrucks</h1>
        <p style={{ margin: 0, opacity: 0.85, fontSize: 18 }}>
          Rent a camper and turn the road into your weekend home.
        </p>

        <div style={{ marginTop: 12 }}>
          <Link
            href="/catalog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1px solid #2a2a2a',
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            View Now
          </Link>
        </div>
      </section>
    </main>
  );
}

