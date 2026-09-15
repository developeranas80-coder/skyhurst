'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Show } from '@/types';
import styles from './shows.module.css';

function formatDateRange(start: string, end: string) {
  if (!start) return '';
  const s = new Date(start);
  const e = end ? new Date(end) : null;
  const sMonth = s.toLocaleDateString('en-US', { month: 'short' });
  const year = (e ?? s).getFullYear();
  if (!e || start === end) {
    return `${sMonth} ${s.getDate()}, ${year}`;
  }
  const eMonth = e.toLocaleDateString('en-US', { month: 'short' });
  if (sMonth === eMonth) {
    return `${sMonth} ${s.getDate()}–${e.getDate()}, ${year}`;
  }
  return `${sMonth} ${s.getDate()} – ${eMonth} ${e.getDate()}, ${year}`;
}

interface Props { shows: Show[] }

export default function ShowsList({ shows }: Props) {
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  const upcoming = shows.filter((s) => s.status === 'upcoming');
  const past = shows.filter((s) => s.status === 'past');
  const filtered = filter === 'upcoming' ? upcoming : past;

  return (
    <div>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${filter === 'upcoming' ? styles.activeTab : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
          {upcoming.length > 0 && <span className={styles.tabCount}>{upcoming.length}</span>}
        </button>
        <button
          className={`${styles.tabBtn} ${filter === 'past' ? styles.activeTab : ''}`}
          onClick={() => setFilter('past')}
        >
          Past
          {past.length > 0 && <span className={styles.tabCount}>{past.length}</span>}
        </button>
      </div>

      {/* Shows */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No {filter} shows listed yet — check back soon.</p>
        </div>
      ) : (
        <div className={styles.showsList}>
          {filtered.map((show, idx) => (
            <div
              key={show.id}
              className={`${styles.showRow} ${!show.imageUrl ? styles.showRowNoImg : ''}`}
            >

              {/* Image */}
              {show.imageUrl && (
                <div className={styles.showImgWrap}>
                  <Image
                    src={show.imageUrl}
                    alt={show.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 280px"
                    className={styles.showImg}
                  />
                  {show.status === 'upcoming' && (
                    <span className={styles.showImgBadge}>Upcoming</span>
                  )}
                </div>
              )}

              {/* Info */}
              <div className={styles.showInfo}>
                <div className={styles.showMeta}>
                  <span className={styles.showIdx}>{String(idx + 1).padStart(2, '0')}</span>
                  <span className={styles.showDate}>
                    {formatDateRange(show.date_start, show.date_end)}
                  </span>
                  {show.booth && <span className={styles.showBooth}>{show.booth}</span>}
                  {show.badge && <span className={styles.showBadge}>{show.badge}</span>}
                </div>
                <h2 className={styles.showTitle}>{show.title}</h2>
                <p className={styles.showLocation}>{show.location}</p>
                {show.description && (
                  <p className={styles.showDesc}>{show.description}</p>
                )}
                {show.signingTimes && show.signingTimes.length > 0 && (
                  <div className={styles.signingRow}>
                    <span className={styles.signingLabel}>Signing</span>
                    <span className={styles.signingTimes}>
                      {show.signingTimes.join('  ·  ')}
                    </span>
                  </div>
                )}
                {show.website && (
                  <a
                    href={show.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.showLink}
                  >
                    Official Site ↗
                  </a>
                )}
              </div>

              <div className={styles.rowLine} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
