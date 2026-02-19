import styles from './Loader.module.css';

type Props = {
  label?: string;
};

export default function Loader({ label = 'Loading...' }: Props) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} />
      <span className={styles.text}>{label}</span>
    </div>
  );
}
