'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" className={styles.hero} aria-label="Hero">
      {/* Parallax background */}
      <div className={styles.bgWrap}>
        <div ref={bgRef} className={styles.bgInner}>
          <Image
            src="https://www.skyhurststudios.com/uploads/1/5/4/8/154822741/screen-shot-2021-07-22-at-6-20-12-pm.png"
            alt="Skyhurst Studios artwork collage"
            fill
            priority
            quality={90}
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </div>
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Animated logo */}
        <div className={styles.logoWrap}>
          <Image
            src="https://www.skyhurststudios.com/uploads/1/5/4/8/154822741/published/skyhurst-logo-web.png?1769038603"
            alt="Skyhurst Studios"
            width={260}
            height={260}
            className={styles.logo}
            priority
          />
        </div>

        <h1 className={styles.title}>Skyhurst Studios</h1>

        <div className={styles.divider} aria-hidden="true" />

        <p className={styles.motto}>Fine Art For The Discerning Nerd</p>

        <div className={styles.ctas}>
          <Link href="/portfolio" className="btn btn-primary">
            View Our Work
          </Link>
          <Link href="/about" className="btn btn-outline">
            Meet the Artists
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scroll} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
        <span>Scroll</span>
      </div>
    </section>
  );
}
