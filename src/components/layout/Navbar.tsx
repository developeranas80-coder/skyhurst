'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    setActivePath(window.location.pathname);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      id="site-nav"
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link href="/" className={styles.logo} aria-label="Skyhurst Studios — Home">
        <Image
          src="https://www.skyhurststudios.com/uploads/1/5/4/8/154822741/published/skyhurst-logo-web.png?1769038603"
          alt="Skyhurst Studios Logo"
          width={44}
          height={44}
          className={styles.logoImg}
          priority
        />
        <span className={styles.logoText}>Skyhurst Studios</span>
      </Link>

      {/* Desktop links */}
      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`} role="list">
        {navLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`${styles.link} ${activePath === l.href ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        className={styles.toggle}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
      </button>
    </nav>
  );
}
