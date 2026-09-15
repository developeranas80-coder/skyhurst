import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPortfolioItemById, getPortfolioItems } from '@/lib/wordpress';
import styles from './portfolio-detail.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const items = await getPortfolioItems();
  return items.map((i) => ({ id: i.id.toString() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  const item = await getPortfolioItemById(numericId);
  if (!item) return { title: 'Artwork Not Found' };

  return {
    title: `${item.title} | Portfolio | Skyhurst Studios`,
    description: item.description || `High-resolution fantasy illustration artwork titled ${item.title} by Skyhurst Studios.`,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  const item = await getPortfolioItemById(numericId);

  if (!item) {
    notFound();
  }

  const categoryLabelMap = {
    illustration: 'Fantasy Illustration',
    'concept-art': 'Concept Art & Visual Dev',
    'sequential-art': 'Sequential Art & Graphic Novel',
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/portfolio" className={styles.backLink}>
          &larr; Back to Full Gallery
        </Link>
      </header>

      <main className={styles.detailGrid}>
        {/* Left: High-res artwork preview */}
        <div className={styles.imgContainer}>
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={1200}
            height={900}
            className={styles.img}
            priority
          />
        </div>

        {/* Right: Spec card & order CTA */}
        <div className={styles.specsCard}>
          <span className={styles.categoryTag}>
            {categoryLabelMap[item.category] || item.category}
          </span>
          <h1 className={styles.title}>{item.title}</h1>
          <p className={styles.desc}>
            {item.description || 'Fine fantasy artwork produced by Skyhurst Studios for publication and limited archival canvas print editions.'}
          </p>

          <div className={styles.specTable}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Category</span>
              <span className={styles.specValue}>{categoryLabelMap[item.category]}</span>
            </div>

            <div className={styles.specRow}>
              <span className={styles.specLabel}>Year Created</span>
              <span className={styles.specValue}>{item.year || 2024}</span>
            </div>

            <div className={styles.specRow}>
              <span className={styles.specLabel}>Studio Artists</span>
              <span className={styles.specValue}>{item.artist || 'Gary Laib & Chris Wilhelm'}</span>
            </div>

            <div className={styles.specRow}>
              <span className={styles.specLabel}>Medium / Tools</span>
              <span className={styles.specValue}>{item.medium || 'Digital Painting & Archival Pigment'}</span>
            </div>

            <div className={styles.specRow}>
              <span className={styles.specLabel}>Print Availability</span>
              <span className={styles.specValue} style={{ color: '#4ade80' }}>✓ Available on Canvas</span>
            </div>
          </div>

          <div className={styles.orderCTA}>
            <h2 className={styles.ctaTitle}>Own a Limited Edition Print</h2>
            <p className={styles.ctaDesc}>
              Order a museum-grade archival canvas print of &ldquo;{item.title}&rdquo; signed by the artists.
            </p>
            <Link href={`/order?artwork=${encodeURIComponent(item.title)}`} className={styles.btnGold}>
              Order Canvas Print &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
