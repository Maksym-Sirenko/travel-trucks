'use client';

import Icon from '@/components/ui/Icons/Icons';
import { getCamperOptionItems } from '@/lib/ui/camperOptionItems';
import type { Camper } from '@/types/camper';

import styles from './CamperFeatures.module.css';

export default function CamperFeatures({ camper }: { camper: Camper }) {
  const badges = getCamperOptionItems(camper);

  return (
    <div className={styles.panel}>
      <ul className={styles.badges} aria-label="Camper features">
        {badges.map((badge) => (
          <li key={badge.key} className={styles.badge}>
            <Icon name={badge.icon} size={18} className={styles.badgeIcon} />
            <span className={styles.badgeText}>{badge.label}</span>
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
