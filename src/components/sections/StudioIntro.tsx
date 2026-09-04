'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './StudioIntro.module.css';

const artists = [
  {
    initial: 'G',
    name: 'Gary Laib',
    role: 'Illustrator & Art Director',
    bio: 'With over two decades of professional illustration, Gary has created concept art and character design for Blizzard, Wizards of the Coast, and major publishers across the genre spectrum.',
    specialties: ['Fantasy Illustration', 'Character Design', 'Children\'s Books'],
  },
  {
    initial: 'C',
    name: 'Chris Wilhelm',
    role: 'Game Artist & Animator',
    bio: 'Chris brings worlds to life through dynamic game art and animation, with credits spanning AAA titles and independent projects for studios including Ubisoft, Epic Games, and Activision.',
    specialties: ['Concept Art', 'Animation', 'Sequential Art'],
  },
];

export default function StudioIntro() {
  const ref = useRef<HTMLElement>(null);
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

  return (
    <section id="intro" className={`section ${styles.section}`} ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {/* Text side */}
          <div className={styles.textSide}>
            <div className="reveal">
              <span className={styles.tag}>Est. West Coast · U.S.A.</span>
              <h2 className={styles.heading}>
                Where Fine Art Meets<br />
                <em>Legendary Worlds</em>
              </h2>
              <p>
                Skyhurst Studios is a professional art production and trade show studio
                with a combined four decades of experience in concept art, illustration,
                sequential art, and art direction.
              </p>
              <p>
                Bringing together the art of Gary Laib and Chris Wilhelm, we provide
                full-service art production and showcase original prints, books, and
                graphic novels at conventions across the west coast.
              </p>
              <Link href="/about" className={`btn btn-outline ${styles.cta}`}>
                Our Full Story
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>

          {/* Artist cards */}
          <div className={styles.artistSide}>
            {artists.map((a, i) => (
              <div key={a.name} className={`${styles.card} reveal reveal-d${i + 1}`}>
                <div className={styles.avatar}>{a.initial}</div>
                <div className={styles.info}>
                  <h3>{a.name}</h3>
                  <p className={styles.role}>{a.role}</p>
                  <p className={styles.bio}>{a.bio}</p>
                  <div className={styles.tags}>
                    {a.specialties.map((s) => (
                      <span key={s} className={styles.specTag}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
