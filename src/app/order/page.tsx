import type { Metadata } from 'next';
import OrderForm from './OrderForm';
import styles from './order.module.css';

// !! This page is NOT linked in nav and must not be indexed !!
export const metadata: Metadata = {
  title: 'Canvas Print Order | Skyhurst Studios',
  description: 'Order limited-edition canvas prints from Skyhurst Studios — available exclusively at conventions and via this direct link.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

const ARTWORKS = [
  "Dragon's Lament",
  "The Last Paladin",
  "Starfall Chronicles",
  "Wandering Mystic",
  "Echoes of the Rift — Chapter 3 Cover",
  "Void Stalker",
  "Elven Cartography",
  "Other (describe in notes)",
];

const SIZES = [
  '8×10 in',
  '11×14 in',
  '16×20 in',
  '18×24 in',
  '24×36 in (Large Format)',
];

const EDITIONS = ['Standard Print', 'Artist Proof (signed)', 'Limited Edition (numbered + signed)'];

export default function OrderPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerBg} />
        <div className={`container ${styles.headerContent}`}>
          <div className={styles.badge}>🔒 Private — Link Access Only</div>
          <span className="section-label">Direct Order</span>
          <h1 className={styles.title}>Canvas Print Order</h1>
          <div className={styles.divider} />
          <p className={styles.sub}>
            Order limited-edition canvas prints directly from Skyhurst Studios.<br />
            We&apos;ll contact you within 2–3 business days to confirm and arrange payment.
          </p>
        </div>
      </header>

      <section className={`section ${styles.formSection}`}>
        <div className="container">
          <OrderForm artworks={ARTWORKS} sizes={SIZES} editions={EDITIONS} />
        </div>
      </section>
    </div>
  );
}
