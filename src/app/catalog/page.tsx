'use client';

import { useEffect } from 'react';
import CamperCard from '@/components/CamperCard/CamperCard';
import { useCampersStore } from '@/store/campersStore';

export default function CatalogPage() {
  const campers = useCampersStore((s) => s.campers);
  const hasMore = useCampersStore((s) => s.hasMore);
  const isLoading = useCampersStore((s) => s.isLoading);
  const error = useCampersStore((s) => s.error);

  const fetchCampers = useCampersStore((s) => s.fetchCampers);
  const loadMore = useCampersStore((s) => s.loadMore);

  useEffect(() => {
    // initial load
    fetchCampers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: 24, display: 'grid', gap: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Catalog</h1>
        <div style={{ opacity: 0.8, fontSize: 14 }}>
          {isLoading ? 'Loading...' : `${campers.length} items`}
        </div>
      </header>

      {error && (
        <div style={{ border: '1px solid #522', padding: 12, borderRadius: 12 }}>
          {error}
        </div>
      )}

      <section style={{ display: 'grid', gap: 12 }}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </section>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
        <button
          type="button"
          onClick={() => loadMore()}
          disabled={!hasMore || isLoading}
          style={{
            cursor: !hasMore || isLoading ? 'not-allowed' : 'pointer',
            border: '1px solid #2a2a2a',
            background: 'transparent',
            color: 'inherit',
            borderRadius: 12,
            padding: '12px 16px',
            minWidth: 180,
            opacity: !hasMore || isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? 'Loading...' : hasMore ? 'Load More' : 'No more campers'}
        </button>
      </div>
    </main>
  );
}
