'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const rootEl = ref?.current || document.body;
    const els = rootEl.querySelectorAll('.reveal');
    if (!els?.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('vis');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ref]);
}

const CLIENT_LOGOS_ROW_1 = [
  { name: 'Magic: The Gathering', src: '/images/clients/logo_mtg.png', w: 180, h: 68 },
  { name: 'Activision Blizzard', src: '/images/clients/logo_activision_blizzard.png', w: 140, h: 90 },
  { name: 'Ubisoft', src: '/images/clients/logo_ubisoft.png', w: 130, h: 90 },
  { name: 'BattleTech', src: '/images/clients/logo_battletech.png', w: 125, h: 95 },
  { name: 'Dungeons & Dragons', src: '/images/clients/logo_dnd.png', w: 160, h: 70 },
  { name: '20th Century Fox', src: '/images/clients/logo_fox.png', w: 135, h: 60 },
  { name: 'Shiny Shoe', src: '/images/clients/logo_shiny_shoe.png', w: 190, h: 48 },
  { name: 'Legend of the Five Rings', src: '/images/clients/logo_l5r.png', w: 175, h: 72 },
];

const CLIENT_LOGOS_ROW_2 = [
  { name: 'Epic Games', src: '/images/clients/logo_epic_games.png', w: 95, h: 95 },
  { name: 'Catalyst Game Labs', src: '/images/clients/logo_catalyst.png', w: 185, h: 80 },
  { name: 'Magic: Legends', src: '/images/clients/logo_magic_legends.png', w: 160, h: 100 },
  { name: 'Dragon Crest', src: '/images/clients/logo_dragon_crest.png', w: 110, h: 120 },
  { name: 'Cryptic Studios', src: '/images/clients/logo_cryptic.png', w: 110, h: 120 },
  { name: 'NCSOFT', src: '/images/clients/logo_ncsoft.png', w: 170, h: 52 },
  { name: 'Crafty Games', src: '/images/clients/logo_crafty_games.png', w: 150, h: 70 },
  { name: 'Arcane Hound', src: '/images/clients/logo_arcane_hound.png', w: 120, h: 130 },
];

const HERO_SLIDES = [
  { cat: 'Illustration · Gary Laib', name: "Dragon's Lament", src: '/images/hero-bg.jpg' },
  { cat: 'Anime · Chris Wilhelm', name: 'The Void Mage', src: '/images/artwork-mage.jpg' },
  { cat: 'Concept Art · Gary Laib', name: 'The Last Knight', src: '/images/artwork-knight.jpg' },
  { cat: 'Sequential · Chris Wilhelm', name: 'Echoes of the Rift', src: '/images/artwork-mage.jpg' },
  { cat: 'Original Fine Art', name: 'Citadel of Ages', src: '/images/hero-bg.jpg' },
  { cat: 'Character Concept', name: 'Infernal Champion', src: '/images/artwork-knight.jpg' },
];

const SHOWS = [
  {
    mo: 'SEP',
    day: '20',
    dateRange: 'Sep 20–22, 2024',
    name: 'Fan Expo Portland',
    venue: 'Oregon Convention Center',
    city: 'Portland, OR',
    booth: 'Booth A-214',
    badge: 'Limited Prints & Originals',
    img: '/images/show-booth.jpg',
  },
  {
    mo: 'OCT',
    day: '18',
    dateRange: 'Oct 18–20, 2024',
    name: 'Rose City Comic Con',
    venue: 'Portland Convention Center',
    city: 'Portland, OR',
    booth: 'Booth B-108',
    badge: 'Artist Alley Row 4',
    img: '/images/show-crowd.jpg',
  },
  {
    mo: 'NOV',
    day: '08',
    dateRange: 'Nov 08–10, 2024',
    name: 'GeekCraft Expo Pacific NW',
    venue: 'Seattle Convention Center',
    city: 'Seattle, WA',
    booth: 'Booth C-305',
    badge: 'Live Signing & Canvases',
    img: '/images/show-signing.jpg',
  },
];

export default function HomePage() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const secManifesto = useRef<HTMLElement>(null);
  const secGallery   = useRef<HTMLElement>(null);
  const secBrands    = useRef<HTMLElement>(null);
  const secShows     = useRef<HTMLElement>(null);
  const secFooter    = useRef<HTMLElement>(null);

  useReveal(secManifesto);
  useReveal(secGallery);
  useReveal(secBrands);
  useReveal(secShows);
  useReveal(secFooter);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleUnlinkedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {/* ══════════ STICKY HEADER — CENTERED LOGO & SPLIT MENU ══════════ */}
      <header className={`nav-header ${solid ? 'nav-scrolled' : 'nav-top'}`} aria-label="Navigation">
        <div className="nav-inner">
          {/* Left Menu Items (Unlinked) */}
          <nav className="nav-menu nav-menu-left" aria-label="Left menu">
            <a href="#" onClick={handleUnlinkedClick} className="nav-link">Home</a>
            <a href="#" onClick={handleUnlinkedClick} className="nav-link">Portfolio</a>
            <a href="#" onClick={handleUnlinkedClick} className="nav-link">About Us</a>
          </nav>

          {/* Centered Brand Logo (Bigger at top, shrinking on scroll) */}
          <div className="nav-brand">
            <a href="#" onClick={handleUnlinkedClick} className="nav-logo-link" aria-label="Skyhurst Studios Home">
              <Image
                src="https://www.skyhurststudios.com/uploads/1/5/4/8/154822741/published/skyhurst-logo-web.png?1769038603"
                alt="Skyhurst Studios"
                width={300}
                height={100}
                className="nav-logo-img"
                priority
              />
            </a>
          </div>

          {/* Right Menu Items (Unlinked) */}
          <nav className="nav-menu nav-menu-right" aria-label="Right menu">
            <a href="#" onClick={handleUnlinkedClick} className="nav-link">Services</a>
            <a href="#" onClick={handleUnlinkedClick} className="nav-link">Shows</a>
            <a href="#" onClick={handleUnlinkedClick} className="nav-link nav-link-cta">Contact Us</a>
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

        {/* Mobile Full Screen Menu Drawer */}
        <div className={`nav-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
          <div className="nav-mobile-links">
            <a href="#" onClick={(e) => { handleUnlinkedClick(e); setMobileOpen(false); }} className="nav-mobile-link">Home</a>
            <a href="#" onClick={(e) => { handleUnlinkedClick(e); setMobileOpen(false); }} className="nav-mobile-link">Portfolio</a>
            <a href="#" onClick={(e) => { handleUnlinkedClick(e); setMobileOpen(false); }} className="nav-mobile-link">About Us</a>
            <a href="#" onClick={(e) => { handleUnlinkedClick(e); setMobileOpen(false); }} className="nav-mobile-link">Services</a>
            <a href="#" onClick={(e) => { handleUnlinkedClick(e); setMobileOpen(false); }} className="nav-mobile-link">Shows</a>
            <a href="#" onClick={(e) => { handleUnlinkedClick(e); setMobileOpen(false); }} className="nav-mobile-link nav-mobile-cta">Contact Us</a>
          </div>
        </div>
      </header>

      {/* ══════════ CINEMA HERO SECTION (MATCHING REFERENCE) ══════════ */}
      <section id="hero" className="hero-cinema">
        {/* Top: Giant Bold Cinema Title */}
        <div className="hero-cinema-header">
          <h1 className="hero-cinema-title">Skyhurst Studios</h1>
        </div>

        {/* Middle: Continuous Moving Artwork Slides (Marquee) */}
        <div className="hero-slider-wrap" aria-label="Featured Artwork Showcase">
          <div className="hero-track">
            {[...HERO_SLIDES, ...HERO_SLIDES].map((slide, idx) => (
              <div key={`${slide.name}-${idx}`} className="hero-slide-card">
                <Image
                  src={slide.src}
                  alt={slide.name}
                  fill
                  sizes="(max-width:768px) 220px, 280px"
                  style={{ objectFit: 'cover' }}
                />
                <div className="hero-slide-info">
                  <p className="hero-slide-cat">{slide.cat}</p>
                  <p className="hero-slide-name">{slide.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Centered Statement Paragraph */}
        <div className="hero-cinema-bottom">
          <p className="hero-cinema-p">
            Fine art for the discerning nerd. We are an independent art production house &amp; trade show studio crafting original fantasy, anime, and sequential fine artworks for collectors around the world.
          </p>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="hero-cinema-meta">
          <span>Pacific Northwest</span>
          <span>Portland, OR · Show Season 2024–2025</span>
        </div>
      </section>

      {/* ══════════ MANIFESTO — EDITORIAL HUMAN DESIGN ══════════ */}
      <section className="manifesto" ref={secManifesto}>
        <div className="wrap">
          <div className="manifesto-grid">
            <div><p className="manifesto-side-label reveal">The Studio</p></div>
            <div className="manifesto-content">
              <h2 className="reveal">
                Four decades of<br />combined craft.<br />
                <strong>Two artists.</strong><br />
                One obsession.
              </h2>
              <div className="manifesto-cols">
                <p className="manifesto-p reveal d1">
                  Gary Laib and Chris Wilhelm have spent their careers inside the worlds others
                  only dream of — painting cards for Magic: The Gathering, illustrating concepts
                  for Blizzard, and building sequential worlds in ink and color.
                </p>
                <p className="manifesto-p reveal d2">
                  Skyhurst Studios is where those journeys converge: a professional art production
                  house and trade show presence bringing original fine art prints, graphic novels,
                  and concept work to collectors across the West Coast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ GALLERY WALL ══════════ */}
      <section id="featured" className="gallery-wall" ref={secGallery}>
        <div className="wrap">
          <div className="gallery-wall-head">
            <h2 className="gallery-wall-title reveal">Selected<br />Works</h2>
            <a href="#featured" className="gallery-wall-cta reveal d2">Explore Collection →</a>
          </div>

          <div className="gallery-grid">
            <div className="g-item g-main">
              <Image src="/images/hero-bg.jpg" alt="Dragon's Lament illustration" fill sizes="(max-width:900px)100vw,50vw" style={{ objectFit:'cover', objectPosition:'center 20%' }} />
              <div className="g-label"><p className="g-cat">Illustration</p><p className="g-title">Dragon&apos;s Lament</p></div>
            </div>
            <div className="g-item g-tr">
              <Image src="/images/artwork-mage.jpg" alt="The Void Mage" fill sizes="25vw" style={{ objectFit:'cover', objectPosition:'center top' }} />
              <div className="g-label"><p className="g-cat">Anime · Character Art</p><p className="g-title">The Void Mage</p></div>
            </div>
            <div className="g-item g-trr">
              <Image src="/images/artwork-knight.jpg" alt="Last Knight" fill sizes="25vw" style={{ objectFit:'cover' }} />
              <div className="g-label"><p className="g-cat">Concept Art</p><p className="g-title">Last Knight</p></div>
            </div>
            <div className="g-item g-br">
              <Image src="/images/artwork-mage.jpg" alt="Echoes of the Rift" fill sizes="(max-width:900px)100vw,50vw" style={{ objectFit:'cover', objectPosition:'center 60%' }} />
              <div className="g-label"><p className="g-cat">Sequential Art</p><p className="g-title">Echoes of the Rift — Chapter 3</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ BRANDS & CLIENTS SHOWCASE ══════════ */}
      <section id="brands" className="brands-section" ref={secBrands}>
        <div className="wrap">
          <div className="brands-header">
            <div className="brands-eyebrow">
              <span className="brands-dot" />
              Clients &amp; Collaborations
            </div>
            <h2 className="brands-title">Skyhurst Studios Clients</h2>
            <p className="brands-desc">
              From AAA game powerhouses to legendary tabletop &amp; sci-fi publishers, our directors and artists have crafted key art, character concepts, and official illustrations for the most iconic franchises in entertainment.
            </p>
          </div>
        </div>

        {/* Brands Marquee Track 1 (Left Scrolling) */}
        <div className="brands-marquee-wrap" aria-label="Client Brands Row 1">
          <div className="brands-track track-left" aria-hidden="true">
            {[...CLIENT_LOGOS_ROW_1, ...CLIENT_LOGOS_ROW_1].map((b, idx) => (
              <div key={`${b.name}-${idx}`} className="brand-logo-item" title={b.name}>
                <Image
                  src={b.src}
                  alt={b.name}
                  width={b.w}
                  height={b.h}
                  className="brand-logo-img"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Brands Marquee Track 2 (Right Scrolling) */}
        <div className="brands-marquee-wrap" aria-label="Client Brands Row 2">
          <div className="brands-track track-right" aria-hidden="true">
            {[...CLIENT_LOGOS_ROW_2, ...CLIENT_LOGOS_ROW_2].map((b, idx) => (
              <div key={`${b.name}-${idx}`} className="brand-logo-item" title={b.name}>
                <Image
                  src={b.src}
                  alt={b.name}
                  width={b.w}
                  height={b.h}
                  className="brand-logo-img"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button Under Brands */}
        <div className="wrap">
          <div className="brands-cta-area">
            <a
              href="#"
              onClick={handleUnlinkedClick}
              className="brands-find-artist-btn"
            >
              <span>Find The Artists</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className="brands-cta-note">
              Explore individual artist portfolios, project credits &amp; studio bios
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ FIND US LIVE — SHOWS ══════════ */}
      <section id="shows" className="shows-v2" ref={secShows}>
        <div className="wrap">

          {/* Section Header */}
          <div className="shows-top">
            <div className="shows-label">
              <span className="shows-label-line" />
              Live Appearances
            </div>
            <div className="shows-top-right">
              <h2 className="shows-title">Where to Find Us</h2>
              <p className="shows-desc">
                Gary and Chris hit the convention floor every season — bringing original
                paintings, signed prints, and exclusive canvas works you won&apos;t find anywhere online.
                Come say hi.
              </p>
            </div>
          </div>

          {/* Shows Grid — image left, info right */}
          <div className="shows-grid">
            {SHOWS.map((show) => (
              <article
                key={show.name}
                className="show-entry"
                onClick={handleUnlinkedClick}
              >
                <div className="show-entry-img">
                  <Image
                    src={show.img}
                    alt={show.name}
                    fill
                    sizes="(max-width:768px) 100vw, 360px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="show-entry-img-overlay" />
                </div>
                <div className="show-entry-info">
                  <div className="show-entry-date">
                    <span className="show-entry-mo">{show.mo}</span>
                    <span className="show-entry-day">{show.day}</span>
                  </div>
                  <div className="show-entry-text">
                    <div className="show-entry-meta">
                      <span className="show-entry-booth">{show.booth}</span>
                      <span className="show-entry-badge">{show.badge}</span>
                    </div>
                    <h3 className="show-entry-name">{show.name}</h3>
                    <p className="show-entry-loc">{show.venue} · {show.city}</p>
                  </div>
                  <div className="show-entry-action">
                    <span className="show-entry-dates">{show.dateRange}</span>
                    <div className="show-entry-arrow" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Inquire Strip */}
          <div className="shows-bottom-bar">
            <p className="shows-bottom-text">
              Planning convention pickup or custom commission handover at an upcoming show?
            </p>
            <a href="#" onClick={handleUnlinkedClick} className="shows-bottom-link">
              Inquire with Studio Management <span>→</span>
            </a>
          </div>

        </div>
      </section>

      {/* ══════════ NEWSLETTER — KEEP IN TOUCH ══════════ */}
      <section id="newsletter" className="newsletter-strip">
        <div className="wrap">
          <div className="newsletter-card">
            <div className="newsletter-glow" aria-hidden="true" />
            <div className="newsletter-inner">
              <div className="newsletter-left">
                <p className="newsletter-eyebrow">
                  <span className="newsletter-dot" />
                  Studio Dispatches
                </p>
                <h2 className="newsletter-title">
                  First access to rare drops &amp; con exclusives.
                </h2>
                <p className="newsletter-sub">
                  Subscribe to the Skyhurst Studio newsletter for secret print runs, limited convention pre-orders, and behind-the-scenes glimpses into our latest canvas works.
                </p>
                <ul className="newsletter-perks">
                  <li>
                    <span className="newsletter-perk-ico">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span>24-hour early access to limited edition con prints</span>
                  </li>
                  <li>
                    <span className="newsletter-perk-ico">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span>Direct previews of new original oil &amp; digital art</span>
                  </li>
                  <li>
                    <span className="newsletter-perk-ico">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span>Monthly curated studio digest — zero marketing spam</span>
                  </li>
                </ul>
              </div>

              <div className="newsletter-right">
                <div className="newsletter-box">
                  <form
                    className="newsletter-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("You're in! Welcome to the Skyhurst inner circle.");
                    }}
                  >
                    <div className="newsletter-form-head">
                      <label className="newsletter-form-label" htmlFor="nl-email">Collector Email List</label>
                      <span className="newsletter-free-pill">Free Access</span>
                    </div>
                    <div className="newsletter-form-row">
                      <input
                        type="email"
                        id="nl-email"
                        required
                        placeholder="Enter your email address..."
                        aria-label="Email address"
                        className="newsletter-input"
                      />
                      <button type="submit" className="newsletter-btn">
                        <span>Subscribe</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <p className="newsletter-privacy">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      No spam. Unsubscribe anytime with one click.
                    </p>
                  </form>

                  <div className="newsletter-stats">
                    <div className="newsletter-stat">
                      <span className="newsletter-stat-num">2,400+</span>
                      <span className="newsletter-stat-label">Collectors</span>
                    </div>
                    <div className="newsletter-stat-div" />
                    <div className="newsletter-stat">
                      <span className="newsletter-stat-num">Monthly</span>
                      <span className="newsletter-stat-label">Frequency</span>
                    </div>
                    <div className="newsletter-stat-div" />
                    <div className="newsletter-stat">
                      <span className="newsletter-stat-num">100% Free</span>
                      <span className="newsletter-stat-label">Dispatches</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ══════════ FOOTER — ULTRA-LUXURY STUDIO FOOTER ══════════ */}
      <footer className="footer" ref={secFooter}>
        <div className="footer-ambient-glow" />
        <div className="footer-watermark" aria-hidden="true">SKYHURST STUDIOS</div>
        
        <div className="wrap footer-wrap">
          {/* Top Banner: Studio Invitation & Availability */}
          <div className="footer-hero-bar">
            <div className="footer-hero-left">
              <div className="footer-avail-badge">
                <span className="footer-avail-pulse" />
                <span>Studio Availability: Open For Select Commissions &amp; Projects</span>
              </div>
              <h3 className="footer-hero-heading">
                Crafting Legendary Worlds For The Discerning Nerd
              </h3>
              <p className="footer-hero-sub">
                Original fantasy illustrations, limited museum-grade prints, and visual development from the Pacific Northwest.
              </p>
            </div>

            <div className="footer-hero-right">
              <a
                href="mailto:contact@skyhurststudios.com"
                className="footer-inquire-btn"
              >
                <span>Direct Studio Inquiries</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="footer-back-top-btn"
                aria-label="Scroll back to top"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
                <span>Back to Top</span>
              </button>
            </div>
          </div>

          <div className="footer-divider-glow" />

          {/* Main 4-Column Luxury Grid */}
          <div className="footer-main-grid">
            {/* Col 1: Studio Identity & Provenance */}
            <div className="footer-col-brand">
              <div className="footer-brand-header">
                <Image
                  src="https://www.skyhurststudios.com/uploads/1/5/4/8/154822741/published/skyhurst-logo-web.png?1769038603"
                  alt="Skyhurst Studios"
                  width={180}
                  height={54}
                  className="footer-logo-img"
                  style={{ width: 'auto', height: '52px' }}
                />
              </div>
              <p className="footer-brand-statement">
                A premier fine art &amp; concept atelier. Specializing in high-fantasy key art, character illustration, and archival convention canvases for global collectors and publishers.
              </p>
              
              <div className="footer-location-card">
                <div className="footer-loc-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="footer-loc-text">
                  <span className="footer-loc-label">Studio &amp; Archive HQ</span>
                  <span className="footer-loc-val">Portland, Oregon · Pacific Northwest</span>
                </div>
              </div>
            </div>

            {/* Col 2: Navigation / Explore */}
            <div className="footer-col-links">
              <h4 className="footer-heading">Explore</h4>
              <ul className="footer-links-list">
                <li>
                  <a href="#hero" className="footer-link-item">
                    <span>Home</span>
                    <span className="footer-link-arr">→</span>
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="footer-link-item">
                    <span>Portfolio &amp; Gallery</span>
                    <span className="footer-link-arr">→</span>
                  </a>
                </li>
                <li>
                  <a href="#manifesto" className="footer-link-item">
                    <span>The Studio</span>
                    <span className="footer-link-arr">→</span>
                  </a>
                </li>
                <li>
                  <a href="#brands" className="footer-link-item">
                    <span>Clients &amp; Brands</span>
                    <span className="footer-link-arr">→</span>
                  </a>
                </li>
                <li>
                  <a href="#shows" className="footer-link-item">
                    <span>Where to Find Us</span>
                    <span className="footer-link-arr">→</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Disciplines & Services */}
            <div className="footer-col-links">
              <h4 className="footer-heading">Disciplines</h4>
              <ul className="footer-links-list">
                <li>
                  <a href="#gallery" className="footer-link-item">
                    <span>Concept Art &amp; Worldbuilding</span>
                    <span className="footer-link-arr">→</span>
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="footer-link-item">
                    <span>Original Fantasy Illustration</span>
                    <span className="footer-link-arr">→</span>
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="footer-link-item">
                    <span>Sequential &amp; Comic Works</span>
                    <span className="footer-link-arr">→</span>
                  </a>
                </li>
                <li>
                  <a href="#shows" className="footer-link-item">
                    <span>Limited Archival Canvases</span>
                    <span className="footer-link-arr">→</span>
                  </a>
                </li>
                <li>
                  <a href="#brands" className="footer-link-item">
                    <span>Creative Art Direction</span>
                    <span className="footer-link-arr">→</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Connect & Social Channels */}
            <div className="footer-col-connect">
              <h4 className="footer-heading">Connect</h4>
              <div className="footer-social-grid">
                <a
                  href="https://www.instagram.com/skyhurststudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-card"
                  aria-label="Instagram"
                >
                  <div className="footer-soc-ico">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <div className="footer-soc-meta">
                    <span className="footer-soc-title">Instagram</span>
                    <span className="footer-soc-desc">@skyhurststudios</span>
                  </div>
                  <span className="footer-soc-arrow">↗</span>
                </a>

                <a
                  href="https://www.facebook.com/skyhurststudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-card"
                  aria-label="Facebook"
                >
                  <div className="footer-soc-ico">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div className="footer-soc-meta">
                    <span className="footer-soc-title">Facebook</span>
                    <span className="footer-soc-desc">Community &amp; Shows</span>
                  </div>
                  <span className="footer-soc-arrow">↗</span>
                </a>

                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-card"
                  aria-label="YouTube"
                >
                  <div className="footer-soc-ico">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div className="footer-soc-meta">
                    <span className="footer-soc-title">YouTube</span>
                    <span className="footer-soc-desc">Studio Vlogs &amp; Demos</span>
                  </div>
                  <span className="footer-soc-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Provenance Bar */}
          <div className="footer-bottom-bar">
            <div className="footer-bottom-left">
              <span className="footer-copyright">
                &copy; {new Date().getFullYear()} Skyhurst Studios LLC. All rights reserved.
              </span>
              <span className="footer-bot-dot">&bull;</span>
              <span className="footer-motto">Fine Art For The Discerning Nerd</span>
            </div>

            <div className="footer-bottom-right">
              <a href="#" onClick={handleUnlinkedClick} className="footer-legal-link">Privacy Policy</a>
              <a href="#" onClick={handleUnlinkedClick} className="footer-legal-link">Terms of Service</a>
              <a href="#" onClick={handleUnlinkedClick} className="footer-legal-link">Licensing</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
