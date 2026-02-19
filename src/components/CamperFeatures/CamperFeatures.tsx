'use client';

import Icon from '@/components/ui/Icons/Icons';
import { ENGINE_META, FEATURE_META, TRANSMISSION_META } from '@/lib/ui/featureMeta';
import type { Camper } from '@/types/camper';
import type { FeatureKey } from '@/types/filters';

import styles from './CamperFeatures.module.css';

const FEATURE_ORDER: FeatureKey[] = [
  'kitchen',
  'AC',
  'bathroom',
  'TV',
  'radio',
  'refrigerator',
  'microwave',
  'gas',
  'water',
];

function isFeatureEnabled(camper: Camper, key: FeatureKey) {
  return (camper as Record<string, unknown>)[key] === true;
}

export default function CamperFeatures({ camper }: { camper: Camper }) {
  const badges: { icon: string; label: string; key: string }[] = [];

  const tMeta = TRANSMISSION_META[camper.transmission];
  if (tMeta) badges.push({ ...tMeta, key: `t-${camper.transmission}` });

  const eMeta = ENGINE_META[camper.engine];
  if (eMeta) badges.push({ ...eMeta, key: `e-${camper.engine}` });

  for (const f of FEATURE_ORDER) {
    if (!isFeatureEnabled(camper, f)) continue;
    const meta = FEATURE_META[f];
    if (meta) badges.push({ ...meta, key: `f-${f}` });
  }

  return (
    <div className={styles.panel}>
      <ul className={styles.badges} aria-label="Camper features">
        {badges.map((b) => (
          <li key={b.key} className={styles.badge}>
            <Icon name={b.icon} size={18} className={styles.badgeIcon} />
            <span className={styles.badgeText}>{b.label}</span>
          </li>
        ))}
      </ul>

      <h3 className={styles.h3}>Vehicle details</h3>

      <div className={styles.table}>
        <div className={styles.row}>
          <span className={styles.k}>Form</span>
          <span className={styles.v}>{camper.form}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.k}>Length</span>
          <span className={styles.v}>{camper.length}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.k}>Width</span>
          <span className={styles.v}>{camper.width}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.k}>Height</span>
          <span className={styles.v}>{camper.height}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.k}>Tank</span>
          <span className={styles.v}>{camper.tank}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.k}>Consumption</span>
          <span className={styles.v}>{camper.consumption}</span>
        </div>
      </div>
    </div>
  );
}
