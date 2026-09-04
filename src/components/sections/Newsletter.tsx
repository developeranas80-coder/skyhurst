import styles from './Newsletter.module.css';

export default function Newsletter() {
  return (
    <section id="newsletter" className={`section ${styles.section}`} aria-label="Newsletter signup">
      <div className="container">
        <div className={styles.inner}>
          {/* Ornament */}
          <div className={styles.ornament} aria-hidden="true">
            <span className={styles.ornLine} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" color="var(--gold)">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className={styles.ornLine} />
          </div>

          <span className="section-label" style={{display:'block',textAlign:'center'}}>Stay Updated</span>
          <h2 className={styles.title}>Keep Up With The Studio</h2>
          <p className={styles.sub}>
            New works, upcoming shows, limited prints, and the latest chapter drops —
            delivered directly to your inbox.
          </p>

          <form
            className={styles.form}
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            aria-label="Email newsletter signup"
          >
            <input
              type="email"
              name="email"
              id="newsletter-email"
              placeholder="Your email address"
              required
              autoComplete="email"
              className={styles.input}
              aria-label="Email address"
            />
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
              Subscribe
            </button>
          </form>

          <p className={styles.note}>No spam, ever. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
