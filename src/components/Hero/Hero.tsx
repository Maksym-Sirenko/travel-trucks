'use client';

import Link from 'next/link';
import styles from './Hero.module.css';
import Container from '../ui/Container/Container';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>

          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>

          <Link href="/catalog" className={styles.button}>
            View Now
          </Link>
        </div>
      </Container>
    </section>
  );
}

