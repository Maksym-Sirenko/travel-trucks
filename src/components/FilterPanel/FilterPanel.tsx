'use client';

import type { BodyType, EngineType, FeatureKey, TransmissionType } from '@/types/filters';
import { initialFilters } from '@/types/filters';
import { useCampersStore } from '@/store/campersStore';

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

const FEATURE_ICONS: Record<FeatureKey, string> = {
  AC: 'icon-wind',
  bathroom: 'icon-shower',
  kitchen: 'icon-kitchen',
  TV: 'icon-tv',
  radio: 'icon-radio',
  refrigerator: 'icon-fridge',
  microwave: 'icon-microwave',
  gas: 'icon-gas',
  water: 'icon-water',
};

const BODY_ICONS: Record<Exclude<BodyType, ''>, string> = {
  panelTruck: 'icon-van',
  fullyIntegrated: 'icon-fully',
  alcove: 'icon-alcove',
};

const TRANSMISSION_ICONS: Record<Exclude<TransmissionType, ''>, string> = {
  automatic: 'icon-automatic-gearbox',
  manual: 'icon-manual-gearbox',
};

const ENGINE_ICONS: Record<Exclude<EngineType, ''>, string> = {
  petrol: 'icon-petrol',
  diesel: 'icon-disel',
  hybrid: 'icon-hybrid',
};

function prettyLabel(value: string) {
  const map: Record<string, string> = {
    panelTruck: 'Van',
    fullyIntegrated: 'Fully Integrated',
    alcove: 'Alcove',
    automatic: 'Automatic',
    manual: 'Manual',
    petrol: 'Petrol',
    diesel: 'Diesel',
    hybrid: 'Hybrid',
  };
  return map[value] ?? value;
}

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

  function toggleTransmission(t: Exclude<TransmissionType, ''>) {
    setFilters({ transmission: filters.transmission === t ? '' : t });
  }

  function toggleEngine(e: Exclude<EngineType, ''>) {
    setFilters({ engine: filters.engine === e ? '' : e });
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
                <Icon name={FEATURE_ICONS[feature]} size={32} className={styles.chipIcon} />
                <span className={styles.chipText}>{prettyLabel(feature)}</span>
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
                <span className={styles.chipText}>{prettyLabel(type)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Vehicle transmission</div>
        <div className={styles.grid2}>
          {TRANSMISSIONS.map((t) => {
            const active = filters.transmission === t;
            return (
              <button
                key={t}
                type="button"
                className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                onClick={() => toggleTransmission(t)}
              >
                <Icon name={TRANSMISSION_ICONS[t]} size={32} className={styles.chipIcon} />
                <span className={styles.chipText}>{prettyLabel(t)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Vehicle engine</div>
        <div className={styles.grid3}>
          {ENGINES.map((e) => {
            const active = filters.engine === e;
            return (
              <button
                key={e}
                type="button"
                className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                onClick={() => toggleEngine(e)}
              >
                <Icon name={ENGINE_ICONS[e]} size={32} className={styles.chipIcon} />
                <span className={styles.chipText}>{prettyLabel(e)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="primary" size="md" onClick={onSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>

        <Button type="button" variant="secondary" size="md" onClick={onReset} disabled={isLoading}>
          Reset filters
        </Button>
      </div>
    </div>
  );
}







