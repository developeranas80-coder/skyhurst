'use client';
import { useState } from 'react';
import styles from './order.module.css';

interface Props {
  artworks: string[];
  sizes: string[];
  editions: string[];
}

export default function OrderForm({ artworks, sizes, editions }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.successBox}>
        <div className={styles.successIcon}>✦</div>
        <h2>Order Received!</h2>
        <p>Thank you — we&apos;ll be in touch within 2–3 business days to confirm your order and arrange payment.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="Canvas print order form">
      <div className={styles.formGrid}>
        {/* Artwork */}
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="order-artwork" className={styles.label}>Artwork *</label>
          <select id="order-artwork" name="artwork" required className={styles.select}>
            <option value="">Select an artwork…</option>
            {artworks.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        {/* Size */}
        <div className={styles.field}>
          <label htmlFor="order-size" className={styles.label}>Canvas Size *</label>
          <select id="order-size" name="size" required className={styles.select}>
            <option value="">Select a size…</option>
            {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Edition */}
        <div className={styles.field}>
          <label htmlFor="order-edition" className={styles.label}>Edition *</label>
          <select id="order-edition" name="edition" required className={styles.select}>
            <option value="">Select edition…</option>
            {editions.map((ed) => <option key={ed} value={ed}>{ed}</option>)}
          </select>
        </div>

        {/* Quantity */}
        <div className={styles.field}>
          <label htmlFor="order-qty" className={styles.label}>Quantity *</label>
          <input id="order-qty" name="quantity" type="number" min="1" max="10" defaultValue="1" required className={styles.input} />
        </div>

        {/* Divider */}
        <div className={`${styles.formDivider} ${styles.fullWidth}`}>
          <span>Your Information</span>
        </div>

        {/* Name */}
        <div className={styles.field}>
          <label htmlFor="order-name" className={styles.label}>Full Name *</label>
          <input id="order-name" name="name" type="text" required autoComplete="name" className={styles.input} placeholder="Jane Smith" />
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label htmlFor="order-email" className={styles.label}>Email Address *</label>
          <input id="order-email" name="email" type="email" required autoComplete="email" className={styles.input} placeholder="jane@example.com" />
        </div>

        {/* Phone */}
        <div className={styles.field}>
          <label htmlFor="order-phone" className={styles.label}>Phone (optional)</label>
          <input id="order-phone" name="phone" type="tel" autoComplete="tel" className={styles.input} placeholder="+1 (555) 000-0000" />
        </div>

        {/* Address */}
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="order-address" className={styles.label}>Shipping Address *</label>
          <textarea id="order-address" name="address" required rows={3} className={styles.textarea} placeholder="Street, City, State, ZIP, Country" />
        </div>

        {/* Notes */}
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="order-notes" className={styles.label}>Additional Notes</label>
          <textarea id="order-notes" name="notes" rows={3} className={styles.textarea} placeholder="Any special requests, questions, or details about the artwork you&apos;d like…" />
        </div>

        {/* Submit */}
        <div className={`${styles.fullWidth} ${styles.submitRow}`}>
          {status === 'error' && (
            <p className={styles.errorMsg}>Something went wrong. Please email us directly at skyhurststudios@gmail.com</p>
          )}
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'} id="order-submit">
            {status === 'sending' ? 'Sending…' : 'Submit Order →'}
          </button>
          <p className={styles.disclaimer}>
            No payment is taken here. We&apos;ll contact you to confirm pricing and arrange payment.
          </p>
        </div>
      </div>
    </form>
  );
}
