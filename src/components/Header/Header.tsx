'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '@/components/ui/Logo/Logo';
import styles from './Header.module.css';
import Container from '../ui/Container/Container';

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isCatalog = pathname === '/catalog' || pathname.startsWith('/catalog/');

  return (
    <header className={styles.header}>
      <Container>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label="Go to home">
          <Logo className={styles.logo} />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={`${styles.link} ${isHome ? styles.active : ''}`}>
            Home
          </Link>
          <Link href="/catalog" className={`${styles.link} ${isCatalog ? styles.active : ''}`}>
            Catalog
          </Link>
        </nav>
      </div>
      </Container>
    </header> 
  );
}


