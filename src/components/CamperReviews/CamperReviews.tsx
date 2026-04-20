import styles from './CamperReviews.module.css';

type Review = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

type Props = {
  reviews: Review[];
};

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className={styles.stars}>
      {'★★★★★'.slice(0, full)}
      {'☆☆☆☆☆'.slice(0, 5 - full)}
    </span>
  );
}

export default function CamperReviews({ reviews }: Props) {
  return (
    <div className={styles.list}>
      {reviews.map((r, idx) => (
        <article key={`${r.reviewer_name}-${idx}`} className={styles.item}>
          <div className={styles.head}>
            <div className={styles.avatar}>{r.reviewer_name.slice(0, 1).toUpperCase()}</div>
            <div className={styles.info}>
              <div className={styles.name}>{r.reviewer_name}</div>
              <Stars rating={r.reviewer_rating} />
            </div>
          </div>
          <p className={styles.text}>{r.comment}</p>
        </article>
      ))}
    </div>
  );
}
