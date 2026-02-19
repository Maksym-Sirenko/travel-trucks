import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Section.module.css';

type Props = HTMLAttributes<HTMLElement> & {
  title?: ReactNode;
};

export default function Section({ title, className, children, ...rest }: Props) {
  return (
    <section {...rest} className={clsx(styles.section, className)}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {children}
    </section>
  );
}
