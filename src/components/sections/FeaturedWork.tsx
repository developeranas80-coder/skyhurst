'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './FeaturedWork.module.css';
import { PortfolioItem } from '@/types';

interface Props { items: PortfolioItem[] }

const categoryLabel: Record<string, string> = {
  illustration:   'Illustration',
  'concept-art':  'Concept Art',
  'sequential-art': 'Sequential Art',
};

export default function FeaturedWork({ items }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    if (!els?.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Layout: big tile left (first), 2-col right grid (rest)
  const [hero, ...rest] = items.slice(0, 5);

  return (
    <section id="featured" className={`section ${styles.section}`} ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Selected Works</span>
          <h2>Featured Art</h2>
          <p>A curated glimpse into the worlds Gary and Chris build — one brushstroke at a time.</p>
        </div>

        <div className={styles.grid}>
          {/* Large feature tile */}
          {hero && (
            <Link href="/portfolio" className={`${styles.tile} ${styles.tileLarge} reveal`}>
              <Image
                src={hero.imageUrl}
                alt={hero.title}
                fill
                sizes="(max-width:900px) 100vw, 55vw"
                style={{ objectFit: 'cover' }}
                className={styles.img}
              />
              <div className={styles.overlay}>
                <span className={styles.cat}>{categoryLabel[hero.category]}</span>
                <span className={styles.tileTitle}>{hero.title}</span>
              </div>
            </Link>
          )}

          {/* Right column */}
          <div className={styles.col}>
            {rest.map((item, i) => (
              <Link key={item.id} href="/portfolio" className={`${styles.tile} ${styles.tileSmall} reveal reveal-d${i + 1}`}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width:900px) 100vw, 45vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.img}
                />
                <div className={styles.overlay}>
                  <span className={styles.cat}>{categoryLabel[item.category]}</span>
                  <span className={styles.tileTitle}>{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={`${styles.cta} reveal`}>
          <Link href="/portfolio" className="btn btn-outline">
            View Full Portfolio
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
