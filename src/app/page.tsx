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
  { cat: 'Illustration · Key Art', name: 'Arcane — Piltover & Zaun', src: '/images/Illustration/imgi_11_arcane-11x17.jpg' },
  { cat: 'Anime · Skyhurst Studios', name: 'Frieren: Beyond Journey’s End', src: '/images/Illustration/imgi_13_frieren.jpg' },
  { cat: 'Concept Art · Gary Laib', name: 'Ral Zarek — Planeswalker', src: '/images/Concept Art/imgi_16_gary-laib-3rxcrzkxvcfqrosyldigc-ral-zarek.jpg' },
  { cat: 'Illustration · Dynamic Series', name: 'Reze — The Bomb Demon', src: '/images/Illustration/imgi_3_reze-the-bomb-demon.jpg' },
  { cat: 'Sequential · Graphic Novel', name: 'Crosslands: Azoria’s Blade', src: '/images/Illustration/imgi_28_crosslands-azoriasblade-1.jpg' },
  { cat: 'Concept Art · Chris Wilhelm', name: 'Temple of Sahinna', src: '/images/Concept Art/imgi_4_christopher-wilhelm-templeofsahinna-02.jpg' },
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

const SELECTED_WORKS_TABS = [
  { id: 'illustration', label: 'Illustration' },
  { id: 'concept-art', label: 'Concept Art' },
  { id: 'sequential-art', label: 'Sequential Art' },
] as const;

type CategoryTab = (typeof SELECTED_WORKS_TABS)[number]['id'];

const SELECTED_WORKS: Record<CategoryTab, Array<{
  role: string;
  src: string;
  cat: string;
  title: string;
  alt: string;
  pos?: string;
  sizes: string;
}>> = {
  illustration: [
    {
      role: 'g-main',
      src: '/images/Illustration/imgi_2_godzilla-02-small.jpg',
      cat: 'Illustration · Key Art',
      title: 'Godzilla — King of the Monsters',
      alt: 'Godzilla illustration',
      pos: 'center top',
      sizes: '(max-width:900px)100vw,50vw',
    },
    {
      role: 'g-tr',
      src: '/images/Illustration/imgi_15_dandadan.jpg',
      cat: 'Anime · Dynamic Art',
      title: 'Dandadan — Turbo Dash',
      alt: 'Dandadan illustration',
      pos: 'center top',
      sizes: '25vw',
    },
    {
      role: 'g-trr',
      src: '/images/Illustration/imgi_16_jujutsukaisen.jpg',
      cat: 'Anime · Combat Art',
      title: 'Jujutsu Kaisen — Domain Clash',
      alt: 'Jujutsu Kaisen illustration',
      pos: 'center top',
      sizes: '25vw',
    },
    {
      role: 'g-br',
      src: '/images/Illustration/imgi_8_demonslayers.jpg',
      cat: 'Illustration · Battle Scene',
      title: 'Demon Slayer — Blade & Breath',
      alt: 'Demon Slayer illustration',
      pos: 'center top',
      sizes: '(max-width:900px)100vw,50vw',
    },
  ],
  'concept-art': [
    {
      role: 'g-main',
      src: '/images/Concept Art/imgi_17_gary-laib-5ws-fd4al5hujegnmixk-jodah.jpg',
      cat: 'Concept Art · MTG',
      title: 'Jodah, Archmage Eternal',
      alt: 'Jodah Archmage Concept Art',
      pos: 'center top',
      sizes: '(max-width:900px)100vw,50vw',
    },
    {
      role: 'g-tr',
      src: '/images/Concept Art/imgi_11_christopher-wilhelm-portfolio-thalia.jpg',
      cat: 'Character Concept · Chris Wilhelm',
      title: 'Thalia — Hero Visual Design',
      alt: 'Thalia Character Design',
      pos: 'center top',
      sizes: '25vw',
    },
    {
      role: 'g-trr',
      src: '/images/Concept Art/imgi_3_gary-laib-2m7ybojcwqts0jze4-ha2-baloth.jpg',
      cat: 'Creature Concept · Gary Laib',
      title: 'Baloth Beast Exploration',
      alt: 'Baloth Beast Concept Art',
      pos: 'center top',
      sizes: '25vw',
    },
    {
      role: 'g-br',
      src: '/images/Concept Art/imgi_12_gary-laib-bxwdlcinflh-i-2dxty1g-grotag-goblins.jpg',
      cat: 'Concept Art · Zendikar',
      title: 'Grotag Goblins Character Sheet',
      alt: 'Grotag Goblins Character Sheet',
      pos: 'center top',
      sizes: '(max-width:900px)100vw,50vw',
    },
  ],
  'sequential-art': [
    {
      role: 'g-main',
      src: '/images/Sequential Art/imgi_6_crosslands-azoriasblade-2-pg28.jpg',
      cat: 'Sequential Art · Splash Page',
      title: 'Crosslands: Azoria’s Blade #2 — Page 28',
      alt: 'Crosslands Page 28 Splash',
      pos: 'center top',
      sizes: '(max-width:900px)100vw,50vw',
    },
    {
      role: 'g-tr',
      src: '/images/Sequential Art/imgi_7_voidwalkerpages1.jpg',
      cat: 'Comic Series · Gary & Chris',
      title: 'Voidwalker — Issue #1: Page 1',
      alt: 'Voidwalker Comic Page 1',
      pos: 'center top',
      sizes: '25vw',
    },
    {
      role: 'g-trr',
      src: '/images/Sequential Art/imgi_9_voidwalkerpages3.jpg',
      cat: 'Sequential Storytelling',
      title: 'Voidwalker — Issue #1: Page 3',
      alt: 'Voidwalker Comic Page 3',
      pos: 'center top',
      sizes: '25vw',
    },
    {
      role: 'g-br',
      src: '/images/Sequential Art/imgi_4_crosslands-azoriasblade-2-pg26.jpg',
      cat: 'Graphic Novel · Action Sequence',
      title: 'Crosslands: Azoria’s Blade #2 — Page 26',
      alt: 'Crosslands Action Sequence Page 26',
      pos: 'center top',
      sizes: '(max-width:900px)100vw,50vw',
    },
  ],
};

export default function HomePage() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeWorkTab, setActiveWorkTab] = useState<CategoryTab>('illustration');

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
            <div>
              <h2 className="gallery-wall-title reveal">Selected<br />Works</h2>
            </div>
            {/* Category Tabs */}
            <div className="gallery-tabs-wrap reveal d2" role="tablist" aria-label="Filter selected works">
              {SELECTED_WORKS_TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeWorkTab === tab.id}
                  className={`gallery-tab-btn ${activeWorkTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveWorkTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-grid" key={activeWorkTab}>
            {SELECTED_WORKS[activeWorkTab].map((item, idx) => (
              <div key={`${activeWorkTab}-${idx}`} className={`g-item ${item.role}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={item.sizes}
                  style={{ objectFit: 'cover', objectPosition: item.pos || 'center top' }}
                />
                <div className="g-label">
                  <p className="g-cat">{item.cat}</p>
                  <p className="g-title">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="gallery-wall-footer reveal">
            <Link href="/portfolio" className="gallery-view-more-btn">
              <span>View Full Portfolio</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ BRANDS & CLIENTS SHOWCASE ══════════ */}
      <section id="brands" className="brands-section" ref={secBrands}>
        <div className="wrap">
          <div className="brands-header">
            <div className="brands-eyebrow">
              <span className="brands-dot" />
              Industry Credits
            </div>
            <h2 className="brands-title">Trusted by the Industry’s Best</h2>
            <p className="brands-desc">
              From Magic: The Gathering and Blizzard to Dungeons &amp; Dragons and Ubisoft — our artists craft key art, character concepts, and official illustrations for the most iconic worlds in gaming and publishing.
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
              <span>Meet The Artists</span>
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
              Convention Tour
            </div>
            <div className="shows-top-right">
              <h2 className="shows-title">Meet Us In Artist Alley</h2>
              <p className="shows-desc">
                Catch Gary and Chris on the road all season long — pick up limited-run canvases, exclusive convention prints, and get your graphic novels signed in person.
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



    </>
  );
}
