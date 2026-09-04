import type { Metadata } from 'next';
import PortfolioGallery from '@/components/ui/PortfolioGallery';
import { getPortfolioItems } from '@/lib/wordpress';
import styles from './portfolio.module.css';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Browse the full portfolio of Skyhurst Studios — fantasy illustration, concept art, sequential art, and more by Gary Laib and Chris Wilhelm.',
};

export const revalidate = 3600;

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <div className={styles.page}>
      {/* Page header */}
      <header className={styles.header}>
        <div className={styles.headerBg} />
        <div className={`container ${styles.headerContent}`}>
          <span className="section-label">Our Work</span>
          <h1 className={styles.title}>Portfolio</h1>
          <div className={styles.divider} />
          <p className={styles.sub}>
            Four decades of combined experience — one brushstroke at a time.
          </p>
        </div>
      </header>

      {/* Gallery */}
      <section className={`section ${styles.gallery}`}>
        <div className="container">
          <PortfolioGallery items={items} />
        </div>
      </section>
    </div>
  );
}
