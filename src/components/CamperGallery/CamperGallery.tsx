'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import styles from './CamperGallery.module.css';

type GalleryItem =
  | string
  | {
      original?: string;
      thumb?: string;
      src?: string;
      url?: string;
    };

type Props = {
  gallery?: GalleryItem[];
  alt?: string;
};

function pickSrc(item: GalleryItem): string | null {
  if (!item) return null;
  if (typeof item === 'string') return item;
  return item.original ?? item.src ?? item.url ?? item.thumb ?? null;
}

export default function CamperGallery({ gallery = [], alt = 'Camper photo' }: Props) {
  const images = useMemo(() => gallery.map(pickSrc).filter(Boolean) as string[], [gallery]);

  const items = images.length ? images : ['/hero.jpg', '/hero.jpg', '/hero.jpg', '/hero.jpg'];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  function prev() {
    setIndex((p) => (p - 1 + items.length) % items.length);
  }

  function next() {
    setIndex((p) => (p + 1) % items.length);
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, items.length]);

  const active = items[index];

  return (
    <>
      <div
        className={`${styles.grid} ${items.length > 4 ? styles.gridScroll : ''}`}
        aria-label="Camper gallery"
      >
        {items.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            className={styles.thumbBtn}
            onClick={() => openAt(idx)}
            aria-label="Open photo"
          >
            <Image
              className={styles.img}
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 292px"
            />
          </button>
        ))}
      </div>

      {open ? (
        <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={close}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.close} onClick={close} aria-label="Close">
              ✕
            </button>

            {items.length > 1 ? (
              <>
                <button type="button" className={styles.navLeft} onClick={prev} aria-label="Previous photo">
                  ‹
                </button>
                <button type="button" className={styles.navRight} onClick={next} aria-label="Next photo">
                  ›
                </button>
              </>
            ) : null}

            <div className={styles.modalImgWrap}>
              <Image
                className={styles.modalImg}
                src={active}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 90vw, 900px"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}


