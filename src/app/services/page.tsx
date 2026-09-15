import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Services & Art Direction | Skyhurst Studios',
  description: 'Custom illustration, AAA game concept art, sequential comic production, art direction, and children book illustration by Gary Laib & Chris Wilhelm.',
};

const SERVICES_DATA = [
  {
    id: 'illustration',
    icon: '⚔️',
    title: 'Fantasy & Key Art Illustration',
    desc: 'High-impact key visuals, trading card artwork, book covers, and canvas paintings crafted with painterly detail and rich atmospheric depth.',
    deliverables: ['High-res 300DPI Print Files', 'Layered PSD / TIFF Deliverables', 'Color Variant Options', 'Commercial License Rights'],
    turnaround: '2–4 Weeks',
  },
  {
    id: 'concept-art',
    icon: '🎨',
    title: 'Concept Art & Visual Development',
    desc: 'Worldbuilding assets, character turnarounds, environment mood sketches, and prop breakdowns for AAA video games, indie titles, and film.',
    deliverables: ['Silhouette Explorations', 'Orthographic Turnarounds', 'Color Scripts & Moodboards', 'Production Callout Sheets'],
    turnaround: '1–3 Weeks',
  },
  {
    id: 'sequential',
    icon: '📖',
    title: 'Sequential Art & Graphic Novels',
    desc: 'Full comic book and graphic novel production from visual scripts to finished inked and colored pages ready for publication.',
    deliverables: ['Pencil & Ink Page Spreads', 'Digital Color Grading & FX', 'Lettering & Speech Placement', 'Cover Art & Variant Layouts'],
    turnaround: 'Flexible / Series Based',
  },
  {
    id: 'art-direction',
    icon: '✦',
    title: 'Art Direction & Creative Consultation',
    desc: 'Comprehensive visual leadership for publishers and studios looking to establish an aesthetic benchmark, style guide, or IP vision.',
    deliverables: ['Style Guides & Specs', 'Artist Team Review & Feedback', 'Asset Standard Enforcement', 'IP Bible & Character Lineups'],
    turnaround: 'Monthly Retainer / Project',
  },
  {
    id: 'childrens-books',
    icon: '🐉',
    title: 'Children’s Book Illustration',
    desc: 'Warm, expressive, and heartwarming storybook illustration with rich character expressions designed to captivate young readers.',
    deliverables: ['Full Page Spread Illustrations', 'Character Expressions Sheet', 'Cover & Spine Layouts', 'Print-Ready PDF Specs'],
    turnaround: '4–8 Weeks',
  },
  {
    id: 'prints',
    icon: '🖼️',
    title: 'Fine Art Prints & Convention Sales',
    desc: 'Archival museum-grade canvas prints, signed artist proofs, and limited edition convention runs available for retail and event sales.',
    deliverables: ['Archival Cotton Rag Prints', 'Hand-Signed & Numbered Editions', 'Custom Gallery Canvas Wraps', 'Certificate of Authenticity'],
    turnaround: 'Immediate / In Stock',
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery & Briefing', desc: 'We align on project scope, target aesthetic, technical specs, and timeline requirements.' },
  { step: '02', title: 'Thumbnails & Roughs', desc: 'Exploratory composition thumbnails and gesture sketches sent for early review and direction choice.' },
  { step: '03', title: 'Color Script & Render', desc: 'Full painting phase focusing on lighting, values, texture refinement, and color harmony.' },
  { step: '04', title: 'Final Delivery', desc: 'Delivery of high-resolution master files, print proofs, and commercial licensing sign-off.' },
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={`container ${styles.headerContent}`}>
          <span className="section-label">Capabilities & Studio Offerings</span>
          <h1 className={styles.title}>Services &amp; Art Direction</h1>
          <div className={styles.divider} />
          <p className={styles.sub}>
            From AAA game concept development to fine fantasy canvas painting,<br />
            we bring four decades of combined mastery to every project.
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2>Studio Expertise</h2>
          </div>

          <div className={styles.servicesGrid}>
            {SERVICES_DATA.map((s) => (
              <div key={s.id} id={s.id} className={styles.serviceCard}>
                <div>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>{s.icon}</div>
                    <h2 className={styles.cardTitle}>{s.title}</h2>
                  </div>
                  <p className={styles.cardDesc}>{s.desc}</p>
                  <ul className={styles.deliverablesList}>
                    {s.deliverables.map((item, idx) => (
                      <li key={idx} className={styles.deliverableItem}>
                        <span className={styles.checkIcon}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.turnaround}>Est: {s.turnaround}</span>
                  <Link href="/contact" className={styles.ctaBtn}>
                    Inquire Project &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">How We Work</span>
            <h2>Our Creative Process</h2>
          </div>

          <div className={styles.processGrid}>
            {PROCESS_STEPS.map((p) => (
              <div key={p.step} className={styles.stepCard}>
                <span className={styles.stepNum}>{p.step}</span>
                <h3 className={styles.stepTitle}>{p.title}</h3>
                <p className={styles.stepDesc}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className={styles.ctaBanner}>
            <h2>Ready to Bring Your Vision to Life?</h2>
            <p>
              Whether you need character design for an upcoming title or a hero cover illustration, we’re ready to collaborate.
            </p>
            <Link href="/contact" className={styles.btnGold}>
              Request a Commission Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
