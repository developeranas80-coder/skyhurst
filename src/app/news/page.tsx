import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getNews } from '@/lib/wordpress';
import styles from './news.module.css';

export const metadata: Metadata = {
  title: 'News & Press | Skyhurst Studios',
  description: 'Latest updates, convention announcements, print series releases, and concept art studio news from Skyhurst Studios.',
};

export const revalidate = 3600;

export default async function NewsListingPage() {
  const articles = await getNews(20);

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={`container ${styles.headerContent}`}>
          <span className="section-label">Studio Updates &amp; Press</span>
          <h1 className={styles.title}>News &amp; Articles</h1>
          <div className={styles.divider} />
          <p className={styles.sub}>
            Stay up to date with project launches, convention schedules,<br />
            limited print series drops, and creative insights.
          </p>
        </div>
      </header>

      {/* Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.newsGrid}>
            {articles.map((item) => (
              <article key={item.id} className={styles.card}>
                <div className={styles.imgWrapper}>
                  <Image
                    src={item.imageUrl || '/images/show-booth.jpg'}
                    alt={item.title}
                    fill
                    className={styles.img}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {item.category && <span className={styles.categoryTag}>{item.category}</span>}
                </div>

                <div className={styles.cardBody}>
                  <div>
                    <div className={styles.meta}>
                      <span>📅 {item.date}</span>
                      <span>•</span>
                      <span>⏱️ {item.readTime || '3 min read'}</span>
                    </div>
                    <h2 className={styles.cardTitle}>{item.title}</h2>
                    <p className={styles.excerpt}>{item.excerpt}</p>
                  </div>

                  <Link href={`/news/${item.slug}`} className={styles.readMore}>
                    Read Article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
