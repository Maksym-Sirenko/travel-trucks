'use client';

import Image from 'next/image';
import Link from 'next/link';

import Icon from '@/components/ui/Icons/Icons';
import { getCamperOptionItems } from '@/lib/ui/camperOptionItems';
import type { Camper } from '@/types/camper';

import { useCampersStore } from '@/store/campersStore';

import styles from './CamperCard.module.css';
import { formatPrice } from '@/lib/utils/formatPrice';

type Props = {
  camper: Camper;
};

function getFirstPhoto(camper: Camper): string {
  const first = (camper as unknown as { gallery?: unknown[] }).gallery?.[0];

  if (!first) return '/hero.jpg';
  if (typeof first === 'string') return first;

  if (typeof first === 'object' && first !== null) {
    const obj = first as Record<string, unknown>;
    if (typeof obj.original === 'string') return obj.original;
    if (typeof obj.thumb === 'string') return obj.thumb;
    if (typeof obj.src === 'string') return obj.src;
    if (typeof obj.url === 'string') return obj.url;
  }

  return '/hero.jpg';
}

function OptionsRow({ camper }: { camper: Camper }) {
  const items = getCamperOptionItems(camper);

  return (
    <ul className={styles.optionsRow} aria-label="Camper options">
      {items.map((it) => (
        <li key={it.key} className={styles.optionItem}>
          <Icon name={it.icon} size={16} className={styles.optionIcon} />
          <span className={styles.optionLabel}>{it.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CamperCard({ camper }: Props) {
  const toggleFavorite = useCampersStore((s) => s.toggleFavorite);
  const favorites = useCampersStore((s) => s.favorites);
  const fav = favorites.includes(camper.id);

  const imgSrc = getFirstPhoto(camper);

  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <Image
          className={styles.image}
          src={imgSrc}
          alt={camper.name}
          width={292}
          height={320}
          sizes="292px"
          priority={false}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <h2 className={styles.title}>{camper.name}</h2>

          <div className={styles.rightTop}>
            <div className={styles.price}>€ {formatPrice(camper.price)}</div>

            <button
              type="button"
              className={styles.favBtn}
              onClick={() => toggleFavorite(camper.id)}
              aria-pressed={fav}
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon
                name="icon-heart"
                size={24}
                className={`${styles.favSvg} ${fav ? styles.favActive : ''}`}
              />
            </button>
          </div>
        </div>

        <div className={styles.meta}>
          <span className={styles.rating}>★ {camper.rating}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.location}>{camper.location}</span>
        </div>

        <p className={styles.desc}>{camper.description}</p>

        <OptionsRow camper={camper} />

        <div className={styles.footer}>
          <Link className={styles.moreBtn} href={`/catalog/${camper.id}`}>
            Show more
          </Link>
        </div>
      </div>
    </article>
  );
}
