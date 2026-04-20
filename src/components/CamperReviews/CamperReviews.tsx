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
  const empty = 5 - full;

  return (
    <span className={styles.stars} aria-label={`${full} out of 5 stars`}>
      <span className={styles.starsFilled}>{'★'.repeat(full)}</span>
      <span className={styles.starsEmpty}>{'☆'.repeat(empty)}</span>
    </span>
  );
}

export default function CamperReviews({ reviews }: Props) {
  return (
    <div className={styles.list}>
      {reviews.map((review, idx) => (
        <article key={`${review.reviewer_name}-${idx}`} className={styles.item}>
          <div className={styles.head}>
            <div className={styles.avatar}>{review.reviewer_name.slice(0, 1).toUpperCase()}</div>
            <div className={styles.info}>
              <div className={styles.name}>{review.reviewer_name}</div>
              <Stars rating={review.reviewer_rating} />
            </div>
          </div>
          <p className={styles.text}>{review.comment}</p>
        </article>
      ))}
    </div>
  );
}
