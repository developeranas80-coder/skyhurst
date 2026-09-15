import type { Metadata } from 'next';
import Image from 'next/image';
import PortfolioGallery from '@/components/ui/PortfolioGallery';
import { getPortfolioItems } from '@/lib/wordpress';
import styles from './portfolio.module.css';

export const metadata: Metadata = {
  title: 'Work & Portfolio | Skyhurst Studios',
  description: 'Browse the full portfolio of Skyhurst Studios — fantasy illustration, concept art, sequential art by Gary Laib and Chris Wilhelm.',
};

export const revalidate = 3600;

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <div className={styles.page}>

      {/* ── CINEMATIC BANNER ── */}
      <header className={styles.banner}>
        {/* Background artwork */}
        <div className={styles.bannerBg}>
          <Image
            src="/images/Illustration/imgi_26_nightblade-brigade-11x14.jpg"
            alt=""
            fill
            sizes="100vw"
            className={styles.bannerBgImg}
            priority
          />
          <div className={styles.bannerOverlay} />
        </div>

        {/* Content */}
        <div className={`wrap ${styles.bannerInner}`}>
          <p className={styles.bannerPre}>Skyhurst Studios</p>
          <h1 className={styles.bannerTitle}>Work</h1>
          <p className={styles.bannerSub}>
            Fantasy illustration, AAA concept art, and sequential graphic novels<br />
            — by Gary Laib &amp; Chris Wilhelm.
          </p>

          {/* Stats row */}
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>60+</span>
              <span className={styles.statLabel}>Works in Archive</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>Disciplines</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>20+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── GALLERY ── */}
      <section className={styles.gallerySection}>
        <div className="wrap">
          <PortfolioGallery items={items} />
        </div>
      </section>

    </div>
  );
}
