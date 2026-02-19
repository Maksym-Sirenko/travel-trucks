'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './LinkButton.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> &
  Pick<LinkProps, 'href' | 'prefetch' | 'replace' | 'scroll'> & {
    variant?: Variant;
    size?: Size;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    disabled?: boolean;
    children: ReactNode;
  };

export default function LinkButton({
  href,
  prefetch,
  replace,
  scroll,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  leftIcon,
  rightIcon,
  onClick,
  ...rest
}: Props) {
  const classes = clsx(styles.btn, styles[variant], styles[size], className);

  return (
    <Link
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      className={classes}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
      }}
      {...rest}
    >
      {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
      <span className={styles.label}>{children}</span>
      {rightIcon ? <span className={styles.icon}>{rightIcon}</span> : null}
    </Link>
  );
}
