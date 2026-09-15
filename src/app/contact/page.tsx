'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Illustration & Key Art',
    budget: '$1,000 – $3,000',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>

      {/* ── PAGE HEADER ── */}
      <header className={styles.header}>
        <div className="wrap">
          <p className={styles.headerPre}>Skyhurst Studios</p>
          <h1 className={styles.headerTitle}>Get in Touch</h1>
          <p className={styles.headerSub}>
            Commission inquiries, licensing, convention bookings, or just want to say hello —<br />
            we respond within 24–48 hours.
          </p>
        </div>
        <div className={styles.headerRule} />
      </header>

      {/* ── MAIN LAYOUT ── */}
      <section className={styles.main}>
        <div className="wrap">
          <div className={styles.layout}>

            {/* ── LEFT: Info ── */}
            <div className={styles.infoCol}>

              {/* Direct contacts */}
              <div className={styles.block}>
                <p className={styles.blockLabel}>Direct Contacts</p>

                <a href="mailto:info@skyhurststudios.com" className={styles.contactRow}>
                  <span className={styles.contactName}>General &amp; Licensing</span>
                  <span className={styles.contactEmail}>info@skyhurststudios.com</span>
                </a>
                <div className={styles.rowLine} />

                <a href="https://dot.cards/garylaibart" target="_blank" rel="noopener noreferrer" className={styles.contactRow}>
                  <span className={styles.contactName}>Gary Laib — Illustrator &amp; Author</span>
                  <span className={styles.contactEmail}>dot.cards/garylaibart ↗</span>
                </a>
                <div className={styles.rowLine} />

                <a href="https://dot.cards/artofthechill" target="_blank" rel="noopener noreferrer" className={styles.contactRow}>
                  <span className={styles.contactName}>Chris Wilhelm — Game Artist</span>
                  <span className={styles.contactEmail}>dot.cards/artofthechill ↗</span>
                </a>
                <div className={styles.rowLine} />
              </div>

              {/* FAQ */}
              <div className={styles.block}>
                <p className={styles.blockLabel}>Common Questions</p>

                <div className={styles.faqItem}>
                  <p className={styles.faqQ}>What are typical turnaround times?</p>
                  <p className={styles.faqA}>Single key illustrations take 2–3 weeks. Full concept art packages or graphic novel chapters run on a custom milestone schedule.</p>
                </div>
                <div className={styles.faqItem}>
                  <p className={styles.faqQ}>Do you accept personal commissions?</p>
                  <p className={styles.faqA}>Yes — personal commissions are open depending on schedule and convention availability.</p>
                </div>
                <div className={styles.faqItem}>
                  <p className={styles.faqQ}>How do canvas print orders work?</p>
                  <p className={styles.faqA}>Order via our Canvas Order Form or pick them up in person at our convention booths across the West Coast.</p>
                </div>
              </div>

            </div>

            {/* ── RIGHT: Form ── */}
            <div className={styles.formCol}>
              <p className={styles.blockLabel}>Send an Inquiry</p>

              {submitted ? (
                <div className={styles.successMsg}>
                  <span className={styles.successCheck}>✓</span>
                  <p>Message received. We&apos;ll be in touch within 24–48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Name</label>
                      <input
                        type="text"
                        required
                        className={styles.input}
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Email</label>
                      <input
                        type="email"
                        required
                        className={styles.input}
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Project Type</label>
                      <select
                        className={styles.select}
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      >
                        <option>Illustration &amp; Key Art</option>
                        <option>Game Concept Art &amp; Visual Dev</option>
                        <option>Sequential Comic / Graphic Novel</option>
                        <option>Art Direction &amp; Style Guide</option>
                        <option>Children&apos;s Book Illustration</option>
                        <option>Convention Booking / Appearance</option>
                        <option>Other Inquiry</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Budget Range</label>
                      <select
                        className={styles.select}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option>Under $1,000</option>
                        <option>$1,000 – $3,000</option>
                        <option>$3,000 – $7,500</option>
                        <option>$7,500 – $15,000+</option>
                        <option>N/A (General Inquiry)</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Message</label>
                    <textarea
                      required
                      className={styles.textarea}
                      placeholder="Tell us about your project, timeline, and deliverables..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Send Message →
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
