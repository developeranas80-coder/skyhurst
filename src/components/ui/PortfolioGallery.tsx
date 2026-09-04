'use client';
import { useState, useEffect, useRef } from 'react';
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
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = active === 'all' ? items : items.filter((i) => i.category === active);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    if (!els?.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    if (lightbox) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <div ref={ref}>
      {/* Filter tabs */}
      <div className={styles.filters} role="tablist" aria-label="Filter portfolio by category">
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

      {/* Gallery grid */}
      <div className={styles.grid}>
        {filtered.map((item, i) => (
          <button
            key={item.id}
            className={`${styles.tile} reveal reveal-d${(i % 4) + 1}`}
            onClick={() => setLightbox(item)}
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
              <span className={styles.cat}>{CATEGORIES.find(c=>c.value===item.category)?.label}</span>
              <span className={styles.title}>{item.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightboxBackdrop} onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label={lightbox.title}>
          <div className={styles.lightbox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lbImgWrap}>
              <Image src={lightbox.imageUrl} alt={lightbox.title} fill style={{ objectFit: 'contain' }} sizes="90vw" />
            </div>
            <div className={styles.lbInfo}>
              <span className={styles.lbCat}>{CATEGORIES.find(c=>c.value===lightbox.category)?.label}</span>
              <h2 className={styles.lbTitle}>{lightbox.title}</h2>
              {lightbox.description && <p className={styles.lbDesc}>{lightbox.description}</p>}
              {lightbox.year && <span className={styles.lbYear}>{lightbox.year}</span>}
            </div>
            <button className={styles.lbClose} onClick={() => setLightbox(null)} aria-label="Close lightbox">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
