import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/lib/wordpress';
import styles from './projects.module.css';

export const metadata: Metadata = {
  title: 'Original Projects & Studio IPs | Skyhurst Studios',
  description: 'Explore Skyhurst Studios original intellectual properties including Echoes of the Rift graphic novel, Wyrm & Friends children book series, and Void Stalker concept art.',
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={`container ${styles.headerContent}`}>
          <span className="section-label">Original Creations &amp; IP Development</span>
          <h1 className={styles.title}>Studio Projects</h1>
          <div className={styles.divider} />
          <p className={styles.sub}>
            Step into the original worlds built by Gary Laib and Chris Wilhelm —<br />
            from graphic novels to illustrated storybooks and game visual development.
          </p>
        </div>
      </header>

      {/* Projects Showcase */}
      <section className="section">
        <div className="container">
          <div className={styles.projectList}>
            {projects.map((p) => (
              <article key={p.id} className={styles.projectCard}>
                <div className={styles.projectImgWrapper}>
                  <Image
                    src={p.imageUrl || '/images/Illustration/imgi_28_crosslands-azoriasblade-1.jpg'}
                    alt={p.title}
                    fill
                    className={styles.projectImg}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>

                <div>
                  <div className={styles.projectMeta}>
                    <span className={styles.statusBadge}>{p.status}</span>
                    <span className={styles.genreTag}>{p.genre}</span>
                  </div>

                  <h2 className={styles.projectTitle}>{p.title}</h2>
                  {p.chapter && <p className={styles.chapterInfo}>📌 {p.chapter}</p>}
                  <p className={styles.fullSummary}>{p.fullSummary || p.description}</p>

                  {p.artists && (
                    <div className={styles.artistsList}>
                      <span>Created By:</span>
                      {p.artists.map((artist, idx) => (
                        <span key={idx} className={styles.artistTag}>{artist}</span>
                      ))}
                    </div>
                  )}

                  {p.gallery && p.gallery.length > 0 && (
                    <div>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Visual Preview:</span>
                      <div className={styles.galleryGrid}>
                        {p.gallery.map((thumb, idx) => (
                          <div key={idx} className={styles.galleryThumb}>
                            <Image
                              src={thumb}
                              alt={`${p.title} preview ${idx + 1}`}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
