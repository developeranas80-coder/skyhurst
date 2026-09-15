'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <div className="wrap">
        <div className={styles.container}>

          {/* ── Overview Section ── */}
          <header className={styles.header}>
            <span className={styles.headerKicker}>Skyhurst Studios</span>
            <h1 className={styles.title}>Contact &amp; Inquiries</h1>
            <p className={styles.description}>
              Skyhurst Studios is a full service art studio offering commissioned illustrations, contract production art, animation, technical art, and art direction consultation services. We would love to hear about your project and how best we can contribute to its success! Fill out the form below and we will respond as soon as possible. We look forward to hearing from you!
            </p>

            <div className={styles.socialCallout}>
              <a
                href="https://www.instagram.com/skyhurst_studios"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.instagramLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
                </svg>
                <span>Follow us on Instagram!</span>
                <span className={styles.arrow}>↗</span>
              </a>
            </div>
          </header>

          <div className={styles.divider} />

          {/* ── Form Section ── */}
          <section className={styles.formSection}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Reach out to us!</h2>
              <p className={styles.requiredNotice}>* Indicates required field</p>
            </div>

            {submitted ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Thank you!</h3>
                <p className={styles.successText}>
                  Your message has been sent. We will respond as soon as possible!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ firstName: '', lastName: '', email: '', comment: '' });
                  }}
                  className={styles.resetBtn}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                
                {/* Name * */}
                <div className={styles.fieldGroup}>
                  <label className={styles.mainLabel}>
                    Name <span className={styles.reqStar}>*</span>
                  </label>
                  <div className={styles.nameRow}>
                    <div className={styles.subField}>
                      <input
                        type="text"
                        required
                        id="first-name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={styles.input}
                      />
                      <span className={styles.subLabel}>First</span>
                    </div>
                    <div className={styles.subField}>
                      <input
                        type="text"
                        required
                        id="last-name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={styles.input}
                      />
                      <span className={styles.subLabel}>Last</span>
                    </div>
                  </div>
                </div>

                {/* Email * */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.mainLabel}>
                    Email <span className={styles.reqStar}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.input}
                  />
                </div>

                {/* Comment * */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="comment" className={styles.mainLabel}>
                    Comment <span className={styles.reqStar}>*</span>
                  </label>
                  <textarea
                    required
                    id="comment"
                    rows={6}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className={styles.textarea}
                  />
                </div>

                {/* Submit */}
                <div className={styles.submitRow}>
                  <button type="submit" className={styles.submitBtn}>
                    <span>Submit</span>
                    <span className={styles.btnArrow}>→</span>
                  </button>
                </div>

              </form>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
