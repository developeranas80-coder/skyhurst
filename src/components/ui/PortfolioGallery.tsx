'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './PortfolioGallery.module.css';
import { PortfolioItem } from '@/types';

const CATEGORIES = [
  { value: 'all', label: 'All Works' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'concept-art', label: 'Concept Art' },
  { value: 'sequential-art', label: 'Sequential Art' },
];

interface Props { items: PortfolioItem[] }

export default function PortfolioGallery({ items }: Props) {
  const [active, setActive] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = active === 'all' ? items : items.filter((i) => i.category === active);

  const openAt = (idx: number) => setLightboxIdx(idx);
  const close = () => setLightboxIdx(null);
  const prev = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);
  const next = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : null));
  }, [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxIdx, next, prev]);

  // Reset index when filter changes
  useEffect(() => { close(); }, [active]);

  const lightboxItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <div>
      {/* ── Filter tabs ── */}
      <div className={styles.filters} role="tablist" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            role="tab"
            aria-selected={active === cat.value}
            className={`${styles.filterBtn} ${active === cat.value ? styles.activeFilter : ''}`}
            onClick={() => setActive(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Gallery grid ── */}
      <div className={styles.grid}>
        {filtered.map((item, i) => (
          <button
            key={item.id}
            className={styles.tile}
            onClick={() => openAt(i)}
            aria-label={`View ${item.title}`}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width:640px) 100vw, (max-width:900px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className={styles.img}
            />
            <div className={styles.overlay}>
              <span className={styles.cat}>{CATEGORIES.find(c => c.value === item.category)?.label}</span>
              <span className={styles.tileTitle}>{item.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightboxItem && (
        <div
          className={styles.lightboxBackdrop}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
        >
          {/* Prev */}
          <button
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          {/* Lightbox panel */}
          <div className={styles.lightbox} onClick={(e) => e.stopPropagation()}>
            {/* Image — full area, click outside closes */}
            <div className={styles.lbImgWrap}>
              <Image
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 900px) 100vw, 70vw"
              />
            </div>

            {/* Info strip at bottom */}
            <div className={styles.lbInfo}>
              <div className={styles.lbMeta}>
                <span className={styles.lbCat}>{CATEGORIES.find(c => c.value === lightboxItem.category)?.label}</span>
                {lightboxItem.year && <span className={styles.lbYear}>{lightboxItem.year}</span>}
              </div>
              <h2 className={styles.lbTitle}>{lightboxItem.title}</h2>
              {lightboxItem.description && (
                <p className={styles.lbDesc}>{lightboxItem.description}</p>
              )}
            </div>

            {/* Counter */}
            <div className={styles.lbCounter}>
              {(lightboxIdx ?? 0) + 1} / {filtered.length}
            </div>

            {/* Close */}
            <button className={styles.lbClose} onClick={close} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Next */}
          <button
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
