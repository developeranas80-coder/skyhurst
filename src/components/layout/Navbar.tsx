'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const leftLinks = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Work' },
  ];

  const rightLinks = [
    { href: '/shows', label: 'Shows' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header className={`nav-header ${solid ? 'nav-scrolled' : 'nav-top'}`} aria-label="Navigation">
        <div className="nav-inner">
          {/* Left Menu Items */}
          <nav className="nav-menu nav-menu-left" aria-label="Left menu">
            {leftLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${isActive(l.href) ? 'active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Centered Brand Logo */}
          <div className="nav-brand">
            <Link href="/" className="nav-logo-link" aria-label="Skyhurst Studios Home">
              <Image
                src="https://www.skyhurststudios.com/uploads/1/5/4/8/154822741/published/skyhurst-logo-web.png?1769038603"
                alt="Skyhurst Studios"
                width={300}
                height={100}
                className="nav-logo-img"
                priority
              />
            </Link>
          </div>

          {/* Right Menu Items */}
          <nav className="nav-menu nav-menu-right" aria-label="Right menu">
            {rightLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${isActive(l.href) ? 'active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className={`nav-link nav-link-cta ${isActive('/contact') ? 'active' : ''}`}>
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`nav-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            padding: '40px',
          }}
        >
          <Link href="/" className="nav-link" onClick={() => setMobileOpen(false)} style={{ fontSize: '20px' }}>
            Home
          </Link>
          <Link href="/portfolio" className="nav-link" onClick={() => setMobileOpen(false)} style={{ fontSize: '20px' }}>
            Work
          </Link>
          <Link href="/shows" className="nav-link" onClick={() => setMobileOpen(false)} style={{ fontSize: '20px' }}>
            Shows
          </Link>
          <Link href="/about" className="nav-link" onClick={() => setMobileOpen(false)} style={{ fontSize: '20px' }}>
            About
          </Link>
          <Link href="/contact" className="nav-link nav-link-cta" onClick={() => setMobileOpen(false)} style={{ fontSize: '16px', marginTop: '12px' }}>
            Contact
          </Link>
        </div>
      )}
    </>
  );
}
