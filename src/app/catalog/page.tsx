'use client';

import { useEffect } from 'react';
import styles from './page.module.css';

import FilterPanel from '@/components/FilterPanel/FilterPanel';
import CamperCard from '@/components/CamperCard/CamperCard';
import Loader from '@/components/ui/Loader/Loader';
import Button from '@/components/ui/Button/Button';

import { useCampersStore } from '@/store/campersStore';

export default function CatalogPage() {
  const campers = useCampersStore((s) => s.campers);
  const fetchCampersList = useCampersStore((s) => s.fetchCampersList);
  const loadMore = useCampersStore((s) => s.loadMore);
  const hasMore = useCampersStore((s) => s.hasMore);
  const isLoading = useCampersStore((s) => s.isLoading);
  const error = useCampersStore((s) => s.error);

  useEffect(() => {
    void fetchCampersList();
  }, [fetchCampersList]);

  return (
    <>
      <h1 className={styles.title}>Catalog</h1>

      <div className={styles.grid}>
        <aside className={styles.sidebar}>
          <FilterPanel />
        </aside>

        <div className={styles.list}>
          {error ? <div className={styles.error}>{error}</div> : null}

          {campers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}

          {isLoading && campers.length === 0 ? (
            <div className={styles.loadingRow}>
              <Loader />
            </div>
          ) : null}

          <div className={styles.footer}>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => void loadMore()}
              disabled={!hasMore || isLoading}
            >
              {isLoading ? 'Loading...' : hasMore ? 'Load more' : 'No more'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}




