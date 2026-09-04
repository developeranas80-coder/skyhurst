import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Image
            src="https://www.skyhurststudios.com/uploads/1/5/4/8/154822741/published/skyhurst-logo-web.png?1769038603"
            alt="Skyhurst Studios"
            width={52}
            height={52}
            className={styles.logo}
          />
          <p>
            A professional art production studio bringing fine illustration,
            concept art, and sequential art to conventions across the west coast.
          </p>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/skyhurststudios"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.socialLink}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navigate</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/about">About &amp; Services</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Services</h4>
          <ul>
            <li><a href="/about#services">Illustration</a></li>
            <li><a href="/about#services">Concept Art</a></li>
            <li><a href="/about#services">Sequential Art</a></li>
            <li><a href="/about#services">Art Direction</a></li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} Skyhurst Studios. All rights reserved.</p>
        <p className={styles.motto}>&ldquo;Fine Art For The Discerning Nerd&rdquo;</p>
      </div>
    </footer>
  );
}
