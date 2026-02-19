import type { Camper } from '@/types/camper';
import CamperGallery from '@/components/CamperGallery/CamperGallery';
import CamperFeatures from '@/components/CamperFeatures/CamperFeatures';
import CamperReviews from '@/components/CamperReviews/CamperReviews';
import BookingForm from '@/components/BookingForm/BookingForm';

import styles from './CamperDetails.module.css';

type Props = {
  camper: Camper;
};

export default function CamperDetails({ camper }: Props) {
  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <CamperGallery gallery={camper.gallery} />
        <CamperFeatures camper={camper} />
        <CamperReviews reviews={camper.reviews} />
      </div>

      <aside className={styles.aside}>
        <BookingForm camperName={camper.name} />
      </aside>
    </div>
  );
}
