'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useCampersStore } from '@/store/campersStore';

import CamperGallery from '@/components/CamperGallery/CamperGallery';
import CamperFeatures from '@/components/CamperFeatures/CamperFeatures';
import CamperReviews from '@/components/CamperReviews/CamperReviews';
import BookingForm from '@/components/BookingForm/BookingForm';

import Container from '@/components/ui/Container/Container';
import Section from '@/components/ui/Section/Section';
import Loader from '@/components/ui/Loader/Loader';
import Icon from '@/components/ui/Icons/Icons';

import { formatPrice } from '@/lib/utils/formatPrice';

import styles from './page.module.css';

export default function CamperDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const fetchCamperDetails = useCampersStore((s) => s.fetchCamperDetails);
  const camper = useCampersStore((s) => s.selectedCamper);
  const isLoading = useCampersStore((s) => s.isLoading);
  const error = useCampersStore((s) => s.error);

  const toggleFavorite = useCampersStore((s) => s.toggleFavorite);
  const fav = useCampersStore((s) => (id ? s.favorites.includes(id) : false));

  const [tab, setTab] = useState<'features' | 'reviews'>('features');

  useEffect(() => {
    if (!id) return;
    void fetchCamperDetails(id);
  }, [id, fetchCamperDetails]);

  const priceText = useMemo(() => {
    if (!camper) return '';
    return formatPrice(camper.price);
  }, [camper]);

  return (
    <main className={styles.page}>
      <Section>
        <Container>
          {error ? <div className={styles.error}>{error}</div> : null}

          {isLoading && !camper ? (
            <div className={styles.loading}>
              <Loader />
            </div>
          ) : null}

          {!isLoading && !camper && !error ? (
            <div className={styles.empty}>Camper not found</div>
          ) : null}

          {camper ? (
            <>
              <div className={styles.header}>
                <div className={styles.titleRow}>
                  <h1 className={styles.title}>{camper.name}</h1>

                  <div className={styles.headRight}>
                    <div className={styles.price}>€ {priceText}</div>

                    <button
                      type="button"
                      className={styles.saveBtn}
                      onClick={() => toggleFavorite(id)}
                      aria-pressed={fav}
                      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Icon
                        name="icon-heart"
                        size={24}
                        className={`${styles.saveIcon} ${fav ? styles.saveIconActive : ''}`}
                      />
                      <span className={styles.saveText}>{fav ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>

                <div className={styles.metaRow}>
                  <span className={styles.rating}>★ {camper.rating}</span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.location}>{camper.location}</span>
                </div>
              </div>

              <CamperGallery gallery={camper.gallery} alt={camper.name} />

              <p className={styles.description}>{camper.description}</p>

              <div className={styles.tabHeader}>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${tab === 'features' ? styles.tabBtnActive : ''}`}
                  onClick={() => setTab('features')}
                >
                  Features
                </button>

                <button
                  type="button"
                  className={`${styles.tabBtn} ${tab === 'reviews' ? styles.tabBtnActive : ''}`}
                  onClick={() => setTab('reviews')}
                >
                  Reviews ({camper.reviews?.length ?? 0})
                </button>
              </div>

              <div className={styles.tabContent}>
                {tab === 'features' ? (
                  <div className={styles.bottomGrid}>
                    <div className={styles.leftCard}>
                      <CamperFeatures camper={camper} />
                    </div>

                    <div className={styles.rightCard}>
                      <BookingForm camperName={camper.name} />
                    </div>
                  </div>
                ) : null}

                {tab === 'reviews' ? <CamperReviews reviews={camper.reviews} /> : null}
              </div>

              <div className={styles.bottomBar}>
                <Link href="/catalog" className={styles.backBtn}>
                  Back to catalog
                </Link>
              </div>
            </>
          ) : null}
        </Container>
      </Section>
    </main>
  );
}
