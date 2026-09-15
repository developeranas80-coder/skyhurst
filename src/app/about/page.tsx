import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Gary & Chris | Skyhurst Studios',
  description: 'Meet Gary Laib and Chris Wilhelm of Skyhurst Studios — professional concept artists, illustrators, and animators with four decades of combined experience.',
};

export const revalidate = 3600;

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

const GARY_WORKS = [
  { src: '/images/Concept Art/imgi_16_gary-laib-3rxcrzkxvcfqrosyldigc-ral-zarek.jpg', label: 'Ral Zarek' },
  { src: '/images/Concept Art/imgi_17_gary-laib-5ws-fd4al5hujegnmixk-jodah.jpg', label: 'Jodah' },
  { src: '/images/Concept Art/imgi_3_gary-laib-2m7ybojcwqts0jze4-ha2-baloth.jpg', label: 'Baloth' },
  { src: '/images/Concept Art/imgi_6_gary-laib-srkefxl59jmn8-zit5pic-portfolio-14.jpg', label: 'Portfolio' },
];

const CHRIS_WORKS = [
  { src: '/images/Concept Art/imgi_4_christopher-wilhelm-templeofsahinna-02.jpg', label: 'Temple of Sahinna' },
  { src: '/images/Concept Art/imgi_11_christopher-wilhelm-portfolio-thalia.jpg', label: 'Thalia' },
  { src: '/images/Concept Art/imgi_9_christopher-wilhelm-christopher-wilhelm-braveorderheroes-thera.jpg', label: 'Brave Order' },
  { src: '/images/Concept Art/imgi_5_christopher-wilhelm-hero-0014-armorer-concept.jpg', label: 'Armorer Concept' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>

      {/* ── CINEMATIC BANNER ── */}
      <header className={styles.banner}>
        {/* Full-bleed artwork background */}
        <div className={styles.bannerBg}>
          <Image
            src="/images/Illustration/imgi_28_crosslands-azoriasblade-1.jpg"
            alt=""
            fill
            sizes="100vw"
            className={styles.bannerBgImg}
            priority
          />
          <div className={styles.bannerOverlay} />
        </div>

        {/* Text block */}
        <div className={`wrap ${styles.bannerInner}`}>
          <p className={styles.bannerPre}>Skyhurst Studios</p>
          <h1 className={styles.bannerTitle}>Meet the Artists</h1>
          <p className={styles.bannerSub}>
            Two illustrators. Four decades of combined experience.<br />
            Games, publishing, animation & the convention floor.
          </p>

          {/* Split portrait strip */}
          <div className={styles.bannerPortraits}>
            <div className={styles.bannerPortrait}>
              <div className={styles.bannerPortraitImg}>
                <Image
                  src="/images/web-gary-laib-196.jpg"
                  alt="Gary Laib"
                  fill
                  sizes="220px"
                  className={styles.bannerPortraitPhoto}
                  priority
                />
              </div>
              <div className={styles.bannerPortraitInfo}>
                <span className={styles.bannerPortraitNum}>01</span>
                <span className={styles.bannerPortraitName}>Gary Laib</span>
                <span className={styles.bannerPortraitRole}>Illustrator · Author</span>
              </div>
            </div>

            <div className={styles.bannerDividerVert} />

            <div className={styles.bannerPortrait}>
              <div className={styles.bannerPortraitImg}>
                <Image
                  src="/images/Chris Wilhelm.jpg"
                  alt="Chris Wilhelm"
                  fill
                  sizes="220px"
                  className={styles.bannerPortraitPhoto}
                  priority
                />
              </div>
              <div className={styles.bannerPortraitInfo}>
                <span className={styles.bannerPortraitNum}>02</span>
                <span className={styles.bannerPortraitName}>Chris Wilhelm</span>
                <span className={styles.bannerPortraitRole}>Game Artist · Animator</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── GARY LAIB ─────────────────────────────────────────── */}
      <section className={styles.artistSection}>
        <div className="wrap">
          <div className={styles.artistLayout}>

            {/* Left: Photo + quick facts */}
            <div className={styles.artistLeft}>
              <div className={styles.photoWrap}>
                <Image
                  src="/images/web-gary-laib-196.jpg"
                  alt="Gary Laib"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className={styles.photo}
                  priority
                />
              </div>
              <div className={styles.quickFacts}>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>Role</span>
                  <span className={styles.factValue}>Illustrator · Author · VO</span>
                </div>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>Experience</span>
                  <span className={styles.factValue}>20+ years</span>
                </div>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>Books</span>
                  <span className={styles.factValue}>Roon fantasy series</span>
                </div>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>Location</span>
                  <span className={styles.factValue}>West Coast, USA</span>
                </div>
              </div>
              <a
                href="https://dot.cards/garylaibart"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactBtn}
              >
                Contact Gary ↗
              </a>
            </div>

            {/* Right: Bio + works */}
            <div className={styles.artistRight}>
              <div className={styles.nameBlock}>
                <span className={styles.artistIndex}>01</span>
                <h2 className={styles.artistName}>Gary Laib</h2>
              </div>

              <p className={styles.artistBio}>
                Gary is an award-winning fantasy and children&apos;s book illustrator, concept artist, 
                and author with over twenty years in the entertainment industry. He&apos;s worked with 
                Blizzard Entertainment, Wizards of the Coast, Ubisoft, NCSoft, and Fox TV — 
                bringing iconic characters and worlds to life through intricate linework and 
                rich painterly color. He&apos;s also the creator of the <em>Roon</em> fantasy book series 
                and a working voice-over artist.
              </p>

              <div className={styles.tags}>
                <span className={styles.tag}>Fantasy Key Art</span>
                <span className={styles.tag}>MTG Card Art</span>
                <span className={styles.tag}>Children&apos;s Books</span>
                <span className={styles.tag}>Character Design</span>
                <span className={styles.tag}>Creature Design</span>
              </div>

              <div className={styles.worksRow}>
                <p className={styles.worksLabel}>Selected Works</p>
                <div className={styles.worksStrip}>
                  {GARY_WORKS.map((w, i) => (
                    <div key={i} className={styles.workThumb}>
                      <Image
                        src={w.src}
                        alt={w.label}
                        fill
                        sizes="160px"
                        className={styles.workImg}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/portfolio" className={styles.portfolioLink}>
                Browse full portfolio →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className={styles.divider}>
        <div className="wrap"><span className={styles.dividerLine} /></div>
      </div>

      {/* ── CHRIS WILHELM ─────────────────────────────────────── */}
      <section className={styles.artistSection}>
        <div className="wrap">
          <div className={`${styles.artistLayout} ${styles.artistLayoutFlip}`}>

            {/* Left: Bio + works (flipped to right on desktop) */}
            <div className={styles.artistRight}>
              <div className={styles.nameBlock}>
                <span className={styles.artistIndex}>02</span>
                <h2 className={styles.artistName}>Chris Wilhelm</h2>
              </div>

              <p className={styles.artistBio}>
                Chris is a game artist, illustrator, and animator with two decades across AAA 
                studios and top indie projects. He&apos;s served as concept artist, illustrator, and 
                art director for franchises like <em>Dungeons &amp; Dragons</em>, <em>Shadowrun</em>, <em>BattleTech</em>, 
                and <em>Magic: The Gathering</em>. His range spans 2D digital painting, 3D asset creation, 
                character turnarounds, environment concept art, and cinematic sequential storytelling.
              </p>

              <div className={styles.tags}>
                <span className={styles.tag}>AAA Concept Art</span>
                <span className={styles.tag}>Environment Design</span>
                <span className={styles.tag}>Sequential Art</span>
                <span className={styles.tag}>2D / 3D Animation</span>
                <span className={styles.tag}>Character Turnarounds</span>
              </div>

              <div className={styles.worksRow}>
                <p className={styles.worksLabel}>Selected Works</p>
                <div className={styles.worksStrip}>
                  {CHRIS_WORKS.map((w, i) => (
                    <div key={i} className={styles.workThumb}>
                      <Image
                        src={w.src}
                        alt={w.label}
                        fill
                        sizes="160px"
                        className={styles.workImg}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/portfolio" className={styles.portfolioLink}>
                Browse full portfolio →
              </Link>
            </div>

            {/* Right: Photo + quick facts */}
            <div className={styles.artistLeft}>
              <div className={styles.photoWrap}>
                <Image
                  src="/images/Chris Wilhelm.jpg"
                  alt="Chris Wilhelm"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className={styles.photo}
                  priority
                />
              </div>
              <div className={styles.quickFacts}>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>Role</span>
                  <span className={styles.factValue}>Game Artist · Animator</span>
                </div>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>Experience</span>
                  <span className={styles.factValue}>20+ years</span>
                </div>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>Specialty</span>
                  <span className={styles.factValue}>AAA Visual Development</span>
                </div>
                <div className={styles.factRow}>
                  <span className={styles.factLabel}>Location</span>
                  <span className={styles.factValue}>West Coast, USA</span>
                </div>
              </div>
              <a
                href="https://dot.cards/artofthechill"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactBtn}
              >
                Contact Chris ↗
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Brands & Clients Marquee */}
      <section id="brands" className="brands-section" style={{ background: '#090D11', border: 'none', padding: '5rem 0' }}>
        <div className="wrap">
          <div className="brands-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className={styles.sectionHeading}>
              Trusted by the Industry&apos;s Best
            </h2>
            <p className={styles.sectionDesc}>
              From Magic: The Gathering and Blizzard to D&amp;D and Ubisoft — two decades of iconic collaboration.
            </p>
          </div>
        </div>

        <div className="brands-marquee-wrap" aria-label="Client Brands Row 1">
          <div className="brands-track track-left" aria-hidden="true">
            {[...CLIENT_LOGOS_ROW_1, ...CLIENT_LOGOS_ROW_1].map((b, idx) => (
              <div key={`${b.name}-${idx}`} className="brand-logo-item" title={b.name}>
                <Image src={b.src} alt={b.name} width={b.w} height={b.h} className="brand-logo-img" />
              </div>
            ))}
          </div>
        </div>

        <div className="brands-marquee-wrap" aria-label="Client Brands Row 2" style={{ marginTop: '1.5rem' }}>
          <div className="brands-track track-right" aria-hidden="true">
            {[...CLIENT_LOGOS_ROW_2, ...CLIENT_LOGOS_ROW_2].map((b, idx) => (
              <div key={`${b.name}-${idx}`} className="brand-logo-item" title={b.name}>
                <Image src={b.src} alt={b.name} width={b.w} height={b.h} className="brand-logo-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Convention Booth */}
      <section className={styles.boothSection}>
        <div className="wrap">
          <h2 className={styles.boothHeading}>Live in Artist Alley</h2>
          <p className={styles.boothDesc}>
            Find our booth at shows all over the West coast and neighboring states! We offer a wide selection of art prints and more. Join our mailing list and follow us on Instagram, and come say hello!
          </p>
          <div className={styles.boothImgWrapper}>
            <Image
              src="/images/img-2502_orig.jpg"
              alt="Skyhurst Studios Convention Booth & Artist Alley"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </section>

    </div>
  );
}
