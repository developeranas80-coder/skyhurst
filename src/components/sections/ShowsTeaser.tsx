'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './ShowsTeaser.module.css';
import { Show } from '@/types';

interface Props { shows: Show[] }

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate().toString(),
  };
}

export default function ShowsTeaser({ shows }: Props) {
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

  const upcoming = shows.filter((s) => s.status === 'upcoming').slice(0, 2);

  return (
    <section id="shows" className={`section ${styles.section}`} ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          {/* Headline panel */}
          <div className={`${styles.headline} reveal`}>
            <span className="section-label">Find Us At</span>
            <h2>Upcoming Shows</h2>
            <p>
              Meet Gary and Chris in person, browse original prints, and pick up
              limited-edition canvas works exclusive to convention appearances.
            </p>
            <Link href="/about#shows" className="btn btn-primary">
              Full Show Schedule
            </Link>
          </div>

          {/* Show cards */}
          <div className={styles.cards}>
            {upcoming.length > 0 ? (
              upcoming.map((show, i) => {
                const { month, day } = formatDate(show.date_start);
                return (
                  <div key={show.id} className={`${styles.card} reveal reveal-d${i + 1}`}>
                    <div className={styles.dateBlock}>
                      <span className={styles.month}>{month}</span>
                      <span className={styles.day}>{day}</span>
                    </div>
                    <div className={styles.showInfo}>
                      <h3>{show.title}</h3>
                      <p>{show.location}</p>
                      {show.booth && <p className={styles.booth}>Booth {show.booth}</p>}
                    </div>
                    {show.website && (
                      <a href={show.website} target="_blank" rel="noopener noreferrer" className={styles.extLink} aria-label={`Visit ${show.title} website`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    )}
                  </div>
                );
              })
            ) : (
              <div className={`${styles.card} reveal`}>
                <div className={styles.showInfo}>
                  <h3>More shows coming soon!</h3>
                  <p>Check back or subscribe to our newsletter for announcements.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
