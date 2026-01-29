'use client';

import { useState } from 'react';
import { useCampersStore } from '@/store/campersStore';
import styles from './FiltersPanel.module.css';

const FEATURE_OPTIONS = ['AC', 'kitchen', 'bathroom', 'TV', 'radio', 'refrigerator', 'microwave', 'gas', 'water'];
const BODY_TYPES = ['panelTruck', 'fullyIntegrated', 'alcove'];

export default function FiltersPanel() {
  const setFilters = useCampersStore((s) => s.setFilters);
  const resetSearch = useCampersStore((s) => s.resetSearch);
  const fetchCampers = useCampersStore((s) => s.fetchCampers);

  const [location, setLocation] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [features, setFeatures] = useState<string[]>([]);

  function toggleFeature(feature: string) {
    setFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]));
  }

  async function handleSearch() {
    setFilters({ location, bodyType, features });
    resetSearch();
    await fetchCampers();
  }

  return (
    <div className={styles.panel}>
      <div className={styles.group}>
        <div className={styles.label}>Location</div>
        <input
          className={styles.input}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City"
        />
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Vehicle type</div>
        <div className={styles.grid3}>
          {BODY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setBodyType((prev) => (prev === type ? '' : type))}
              className={`${styles.chip} ${bodyType === type ? styles.chipActive : ''}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Vehicle equipment</div>
        <div className={styles.grid3}>
          {FEATURE_OPTIONS.map((feature) => (
            <button
              key={feature}
              type="button"
              onClick={() => toggleFeature(feature)}
              className={`${styles.chip} ${features.includes(feature) ? styles.chipActive : ''}`}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={handleSearch} className={styles.searchBtn}>
          Search
        </button>
      </div>
    </div>
  );
}

