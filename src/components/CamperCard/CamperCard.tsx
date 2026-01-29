'use client';

import Link from 'next/link';
import type { Camper } from '@/types/camper';
import { formatPrice } from '@/utils/format';
import { useCampersStore } from '@/store/campersStore';
import styles from './CamperCard.module.css';

type Props = { camper: Camper };

export default function CamperCard({ camper }: Props) {
  const toggleFavorite = useCampersStore((s) => s.toggleFavorite);
  const isFavorite = useCampersStore((s) => s.isFavorite);

  const fav = isFavorite(camper.id);

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div>
          <h3 className={styles.title}>{camper.name}</h3>
          <div className={styles.metaRow}>
            <span>⭐ {camper.rating}</span>
            <span>·</span>
            <span>{camper.location}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(camper.id)}
          className={styles.favBtn}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {fav ? '♥ Saved' : '♡ Save'}
        </button>
      </div>

      <div className={styles.priceRow}>
        <div className={styles.price}>€ {formatPrice(camper.price)}</div>
      </div>

      <div className={styles.pills}>
        {camper.transmission && <span className={styles.pill}>{camper.transmission}</span>}
        {camper.engine && <span className={styles.pill}>{camper.engine}</span>}
        {camper.kitchen && <span className={styles.pill}>Kitchen</span>}
        {camper.AC && <span className={styles.pill}>AC</span>}
      </div>

      <p className={styles.desc}>{camper.description}</p>

      <div className={styles.actions}>
        <Link href={`/catalog/${camper.id}`} className={styles.moreBtn}>
          Show more
        </Link>
      </div>
    </article>
  );
}
