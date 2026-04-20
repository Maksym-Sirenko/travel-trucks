'use client';

import type { BodyType, EngineType, FeatureKey, TransmissionType } from '@/types/filters';
import { initialFilters } from '@/types/filters';
import { useCampersStore } from '@/store/campersStore';
import { BODY_META, ENGINE_META, FEATURE_META, TRANSMISSION_META } from '@/lib/ui/featureMeta';

import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icons/Icons';
import styles from './FilterPanel.module.css';

const FEATURE_OPTIONS: FeatureKey[] = [
  'AC',
  'bathroom',
  'kitchen',
  'TV',
  'radio',
  'refrigerator',
  'microwave',
  'gas',
  'water',
];

const BODY_TYPES: Exclude<BodyType, ''>[] = ['panelTruck', 'fullyIntegrated', 'alcove'];
const TRANSMISSIONS: Exclude<TransmissionType, ''>[] = ['automatic', 'manual'];
const ENGINES: Exclude<EngineType, ''>[] = ['petrol', 'diesel', 'hybrid'];

const BODY_ICONS: Record<Exclude<BodyType, ''>, string> = {
  panelTruck: 'icon-van',
  fullyIntegrated: 'icon-fully',
  alcove: 'icon-alcove',
};

export default function FilterPanel() {
  const filters = useCampersStore((s) => s.filters);
  const setFilters = useCampersStore((s) => s.setFilters);
  const applyFilters = useCampersStore((s) => s.applyFilters);
  const isLoading = useCampersStore((s) => s.isLoading);

  function toggleFeature(feature: FeatureKey) {
    const next = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature];

    setFilters({ features: next });
  }

  function toggleBodyType(type: Exclude<BodyType, ''>) {
    setFilters({ bodyType: filters.bodyType === type ? '' : type });
  }

  function toggleTransmission(transmission: Exclude<TransmissionType, ''>) {
    setFilters({
      transmission: filters.transmission === transmission ? '' : transmission,
    });
  }

  function toggleEngine(engine: Exclude<EngineType, ''>) {
    setFilters({ engine: filters.engine === engine ? '' : engine });
  }

  function onSearch() {
    void applyFilters(filters);
  }

  function onReset() {
    void applyFilters(initialFilters);
  }

  return (
    <div className={styles.panel}>
      <div className={styles.group}>
        <div className={styles.label}>Location</div>
        <input
          className={styles.input}
          value={filters.location}
          onChange={(e) => setFilters({ location: e.target.value })}
          placeholder="City"
        />
      </div>

      <div className={styles.group}>
        <div className={styles.sectionTitle}>Filters</div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Vehicle equipment</div>
        <div className={styles.grid3}>
          {FEATURE_OPTIONS.map((feature) => {
            const active = filters.features.includes(feature);
            return (
              <button
                key={feature}
                type="button"
                className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                onClick={() => toggleFeature(feature)}
              >
                <Icon name={FEATURE_META[feature].icon} size={32} className={styles.chipIcon} />
                <span className={styles.chipText}>{FEATURE_META[feature].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Vehicle type</div>
        <div className={styles.grid3}>
          {BODY_TYPES.map((type) => {
            const active = filters.bodyType === type;
            return (
              <button
                key={type}
                type="button"
                className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                onClick={() => toggleBodyType(type)}
              >
                <Icon name={BODY_ICONS[type]} size={32} className={styles.chipIcon} />
                <span className={styles.chipText}>{BODY_META[type].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Vehicle transmission</div>
        <div className={styles.grid2}>
          {TRANSMISSIONS.map((transmission) => {
            const active = filters.transmission === transmission;
            return (
              <button
                key={transmission}
                type="button"
                className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                onClick={() => toggleTransmission(transmission)}
              >
                <Icon
                  name={TRANSMISSION_META[transmission].icon}
                  size={32}
                  className={styles.chipIcon}
                />
                <span className={styles.chipText}>{TRANSMISSION_META[transmission].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Vehicle engine</div>
        <div className={styles.grid3}>
          {ENGINES.map((engine) => {
            const active = filters.engine === engine;
            return (
              <button
                key={engine}
                type="button"
                className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                onClick={() => toggleEngine(engine)}
              >
                <Icon name={ENGINE_META[engine].icon} size={32} className={styles.chipIcon} />
                <span className={styles.chipText}>{ENGINE_META[engine].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="primary" size="md" onClick={onSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onReset}
          disabled={isLoading}
        >
          Reset filters
        </Button>
      </div>
    </div>
  );
}
