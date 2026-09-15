import type { Metadata } from 'next';
import Image from 'next/image';
import { getShows } from '@/lib/wordpress';
import ShowsList from './ShowsList';
import styles from './shows.module.css';

export const metadata: Metadata = {
  title: 'Shows & Conventions | Skyhurst Studios',
  description: 'Find Skyhurst Studios at conventions and artist alleys across the West Coast. Catch Gary Laib and Chris Wilhelm live for signings, prints, and commissions.',
};

export const revalidate = 3600;

export default async function ShowsPage() {
  const shows = await getShows();

  return (
    <div className={styles.page}>

      {/* ── CINEMATIC BANNER ── */}
      <header className={styles.banner}>
        <div className={styles.bannerBg}>
          <Image
            src="/images/show-crowd.jpg"
            alt=""
            fill
            sizes="100vw"
            className={styles.bannerBgImg}
            priority
          />
          <div className={styles.bannerOverlay} />
        </div>
        <div className={`wrap ${styles.bannerInner}`}>
          <p className={styles.bannerPre}>Skyhurst Studios — On the Road</p>
          <h1 className={styles.bannerTitle}>Shows</h1>
          <p className={styles.bannerSub}>
            Find our booth at shows all over the West Coast and neighboring states.<br />
            Art prints, canvas drops, live signings — come say hello.
          </p>
        </div>
      </header>

      {/* ── SHOWS LIST (client component for tabs) ── */}
      <section className={styles.main}>
        <div className="wrap">
          <ShowsList shows={shows} />
        </div>
      </section>

    </div>
  );
}
