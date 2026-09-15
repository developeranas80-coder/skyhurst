import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsBySlug, getNews } from '@/lib/wordpress';
import styles from '../news.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getNews(20);
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | Skyhurst Studios`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className={styles.articlePage}>
      <header className={styles.articleHeader}>
        <Link href="/news" className={styles.backLink}>
          &larr; Back to News &amp; Updates
        </Link>
        <div className={styles.articleMeta}>
          {article.category && <span style={{ color: '#d4a853', fontWeight: 600 }}>{article.category}</span>}
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime || '3 min read'}</span>
        </div>
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem' }}>By {article.author || 'Skyhurst Studios'}</p>
      </header>

      {article.imageUrl && (
        <div className={styles.articleHeroImg}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      <div className={styles.articleContent}>
        {/* Render markdown-ish text lines */}
        {article.content?.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return <h3 key={idx}>{paragraph.replace('### ', '')}</h3>;
          }
          if (paragraph.startsWith('> ')) {
            return <blockquote key={idx}>{paragraph.replace('> ', '')}</blockquote>;
          }
          if (paragraph.startsWith('* ')) {
            const items = paragraph.split('\n').map((li) => li.replace('* ', ''));
            return (
              <ul key={idx}>
                {items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </div>
    </article>
  );
}
