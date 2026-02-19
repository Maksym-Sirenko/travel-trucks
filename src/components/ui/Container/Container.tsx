import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Container.module.css';

type Props = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'main' | 'section' | 'header';
};

export default function Container({ as: Tag = 'div', className, ...rest }: Props) {
  return <Tag {...rest} className={clsx(styles.container, className)} />;
}
