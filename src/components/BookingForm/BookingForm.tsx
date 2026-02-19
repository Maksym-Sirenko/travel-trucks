'use client';

import toast from 'react-hot-toast';
import { useRef, useState } from 'react';
import styles from './BookingForm.module.css';

import Button from '@/components/ui/Button/Button';

type Props = {
  camperName: string;
};

type FormState = {
  name: string;
  email: string;
  date: string;
  comment: string;
};

const initial: FormState = { name: '', email: '', date: '', comment: '' };
const todayISO = new Date().toISOString().slice(0, 10);

export default function BookingForm({ camperName }: Props) {
  const [form, setForm] = useState<FormState>(initial);
  const [isSending, setIsSending] = useState(false);

  const dateRef = useRef<HTMLInputElement | null>(null);

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function validate() {
    if (!form.name.trim()) return 'Name is required';
    if (!form.email.trim()) return 'Email is required';
    if (!form.email.includes('@')) return 'Email looks invalid';
    if (!form.date.trim()) return 'Booking date is required';
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    setIsSending(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      toast.success(`Booking successful: ${camperName}`);
      setForm(initial);
    } finally {
      setIsSending(false);
    }
  }

  function openPicker() {
    const el = dateRef.current;
    if (!el) return;
    el.focus();
    try {
      el.showPicker?.();
    } catch {
      // Safari/Firefox можуть не мати showPicker
    }
  }

  return (
    <form className={styles.card} onSubmit={onSubmit}>
      <div>
        <h3 className={styles.title}>Book your campervan now</h3>
        <p className={styles.subtitle}>Stay connected! We are always ready to help you.</p>
      </div>

      <input
        className={styles.input}
        value={form.name}
        onChange={(e) => onChange('name', e.target.value)}
        placeholder="Name*"
        required
      />

      <input
        className={styles.input}
        type="email"
        value={form.email}
        onChange={(e) => onChange('email', e.target.value)}
        placeholder="Email*"
        required
      />

      <div className={styles.dateWrap} onClick={openPicker} onKeyDown={(e) => e.key === 'Enter' && openPicker()} role="button" tabIndex={0}>
        {!form.date ? <span className={styles.datePlaceholder}>Booking date*</span> : null}

        <input
          ref={dateRef}
          className={styles.dateInput}
          type="date"
          value={form.date}
          min={todayISO}
          onChange={(e) => onChange('date', e.target.value)}
          required
        />
      </div>

      <textarea
        className={styles.textarea}
        value={form.comment}
        onChange={(e) => onChange('comment', e.target.value)}
        placeholder="Comment"
        rows={4}
      />

      <div className={styles.actions}>
        <Button type="submit" variant="primary" size="md" isLoading={isSending} className={styles.submitBtn}>
          {isSending ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  );
}

