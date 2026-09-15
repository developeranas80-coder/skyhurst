'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={`wrap ${styles.container}`}>

        {/* ── Top Editorial Statement ── */}
        <div className={styles.statementRow}>
          <div className={styles.statementLeft}>
            <span className={styles.statementKicker}>Skyhurst Studios Atelier</span>
            <h2 className={styles.statementTitle}>
              Fine Art For The Discerning Nerd.
            </h2>
          </div>
          <div className={styles.statementRight}>
            <span className={styles.inquiryLabel}>Direct Inquiries</span>
            <a
              href="mailto:info@skyhurststudios.com"
              className={styles.inquiryEmail}
            >
              info@skyhurststudios.com
              <span className={styles.arrowIcon}>↗</span>
            </a>
          </div>
        </div>

        <div className={styles.divider} />

        {/* ── Main Nav & Brand Bar ── */}
        <div className={styles.mainNavRow}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink} aria-label="Skyhurst Studios Home">
              <Image
                src="https://www.skyhurststudios.com/uploads/1/5/4/8/154822741/published/skyhurst-logo-web.png?1769038603"
                alt="Skyhurst Studios Logo"
                width={170}
                height={52}
                className={styles.logo}
              />
            </Link>
            <p className={styles.brandSub}>
              Gary Laib &amp; Christopher Wilhelm · Portland &amp; Seattle
            </p>
          </div>

          {/* Exact Header Nav Items */}
          <nav className={styles.menu} aria-label="Footer Navigation">
            <Link href="/" className={styles.menuLink}>
              Home
            </Link>
            <Link href="/portfolio" className={styles.menuLink}>
              Work
            </Link>
            <Link href="/shows" className={styles.menuLink}>
              Shows
            </Link>
            <Link href="/about" className={styles.menuLink}>
              About
            </Link>
            <Link href="/contact" className={styles.menuLink}>
              Contact
            </Link>
            <a
              href="https://www.instagram.com/skyhurst_studios"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.menuLink} ${styles.socialLink}`}
            >
              Instagram <span className={styles.arrowSmall}>↗</span>
            </a>
          </nav>
        </div>

        {/* ── Large Editorial Typographic Statement ── */}
        <div className={styles.watermarkWrap} aria-hidden="true">
          <span className={styles.watermarkText}>SKYHURST</span>
        </div>

        <div className={styles.divider} />

        {/* ── Bottom Baseline ── */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {year} Skyhurst Studios LLC. All rights reserved.
          </p>

          <div className={styles.legalLinks}>
            <button
              type="button"
              className={styles.legalBtn}
              onClick={() => setModalType('privacy')}
            >
              Privacy Policy
            </button>
            <span className={styles.legalSep}>·</span>
            <button
              type="button"
              className={styles.legalBtn}
              onClick={() => setModalType('terms')}
            >
              Terms of Service
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className={styles.backToTop}
            aria-label="Back to top"
          >
            <span>Top</span>
            <span className={styles.topArrow}>↑</span>
          </button>
        </div>

      </div>

      {/* ── Privacy / Terms Modal ── */}
      {modalType && (
        <div
          className={styles.modalOverlay}
          onClick={() => setModalType(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {modalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setModalType(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              {modalType === 'privacy' ? (
                <>
                  <p>
                    Skyhurst Studios LLC values your privacy. We collect minimal information solely for the purpose of communicating regarding inquiries, commissions, convention updates, and order deliveries.
                  </p>
                  <p>
                    We never sell, rent, or distribute personal information to third parties. Any details submitted via our contact or order forms are handled confidentially by Gary Laib and Chris Wilhelm.
                  </p>
                  <p>
                    For inquiries regarding your stored information or order data, please contact <strong>info@skyhurststudios.com</strong>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    All original illustrations, concept paintings, graphic novel pages, and artwork presented on this site are the intellectual property of Skyhurst Studios LLC and their respective client copyright holders.
                  </p>
                  <p>
                    Artworks may not be reproduced, modified, resold, or used for machine learning / AI model training without express written consent from Skyhurst Studios.
                  </p>
                  <p>
                    Archival canvas and print orders are fulfilled directly by the artists. If you have questions regarding rights or licensing, please contact <strong>info@skyhurststudios.com</strong>.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
