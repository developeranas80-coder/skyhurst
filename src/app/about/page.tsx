import type { Metadata } from 'next';
import { getShows, getNews, getProjects } from '@/lib/wordpress';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About & Services',
  description: 'Meet Gary Laib and Chris Wilhelm of Skyhurst Studios. Learn about their services, upcoming show schedule, news, and ongoing illustration projects.',
};

export const revalidate = 3600;

const ARTISTS = [
  {
    initial: 'G',
    name: 'Gary Laib',
    role: 'Illustrator & Art Director',
    bio: `Gary Laib is a professional illustrator and art director with over two decades of experience creating fantasy and science-fiction artwork for some of the biggest names in the industry. His work spans concept art for video games, children's book illustration, trading card art, and large-format canvas paintings. Gary's signature style blends detailed linework with rich, painterly color to create images that feel both timeless and alive.`,
    clients: ['Blizzard Entertainment', 'Wizards of the Coast', 'Paizo Publishing', 'Dark Horse Comics'],
  },
  {
    initial: 'C',
    name: 'Chris Wilhelm',
    role: 'Game Artist & Animator',
    bio: `Chris Wilhelm is a game artist and animator whose career has taken him across AAA studios and indie darlings alike. His concept art, character design, and sequential storytelling have earned him credits with studios including Ubisoft, Epic Games, and Activision. Chris brings a dynamic, cinematic energy to every project, treating each frame as a window into a fully-realized world.`,
    clients: ['Ubisoft', 'Epic Games', 'Activision', 'Magic: The Gathering'],
  },
];

const SERVICES = [
  { icon: '✦', title: 'Fantasy Illustration', desc: 'Character art, scene illustration, and cover art for games, books, and print media.' },
  { icon: '✦', title: 'Concept Art', desc: 'Exploratory design work for characters, environments, props, and creatures for games and film.' },
  { icon: '✦', title: 'Sequential Art', desc: 'Full graphic novel, comic book, and storyboard production from script to finished pages.' },
  { icon: '✦', title: 'Art Direction', desc: 'Comprehensive creative direction and visual development for studios and publishers.' },
  { icon: '✦', title: 'Children\'s Books', desc: 'Warm, expressive illustration for children\'s publishing projects of all scales.' },
  { icon: '✦', title: 'Convention Prints', desc: 'Limited-edition fine art prints and canvas works available at shows and via direct order.' },
];

function formatShowDate(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  if (s.getMonth() === e.getMonth()) {
    return `${s.toLocaleDateString('en-US', opts)} – ${e.getDate()}, ${e.getFullYear()}`;
  }
  return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', opts)}, ${e.getFullYear()}`;
}

export default async function AboutPage() {
  const [shows, news, projects] = await Promise.all([
    getShows(),
    getNews(5),
    getProjects(),
  ]);

  const upcoming = shows.filter((s) => s.status === 'upcoming');
  const past     = shows.filter((s) => s.status === 'past');

  return (
    <div className={styles.page}>
      {/* ── Page header ────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerBg} />
        <div className={`container ${styles.headerContent}`}>
          <span className="section-label">The People Behind The Art</span>
          <h1 className={styles.title}>About & Services</h1>
          <div className={styles.divider} />
          <p className={styles.sub}>
            Four decades of combined professional experience.<br />Two artists. One vision.
          </p>
        </div>
      </header>

      {/* ── Artist bios ────────────────────────────────── */}
      <section id="artists" className={`section ${styles.section}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Meet The Artists</span>
            <h2>Gary &amp; Chris</h2>
          </div>

          <div className={styles.artistsGrid}>
            {ARTISTS.map((a) => (
              <div key={a.name} className={styles.artistCard}>
                <div className={styles.artistAvatar}>{a.initial}</div>
                <h2 className={styles.artistName}>{a.name}</h2>
                <p className={styles.artistRole}>{a.role}</p>
                <div className={styles.artistDivider} />
                <p className={styles.artistBio}>{a.bio}</p>
                <div className={styles.clientList}>
                  <p className={styles.clientsLabel}>Notable Clients</p>
                  <div className={styles.clientTags}>
                    {a.clients.map((c) => (
                      <span key={c} className={styles.clientTag}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────── */}
      <section id="services" className={`section ${styles.sectionAlt}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2>Services</h2>
            <p>Professional art production services for publishers, game studios, and individual clients.</p>
          </div>
          <div className={styles.servicesGrid}>
            {SERVICES.map((s) => (
              <div key={s.title} className={styles.serviceCard}>
                <span className={styles.serviceIcon}>{s.icon}</span>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Show Schedule ──────────────────────────────── */}
      <section id="shows" className={`section ${styles.section}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Find Us In Person</span>
            <h2>Show Schedule</h2>
            <p>Pick up originals, limited prints, and canvas works — or just say hello!</p>
          </div>

          {upcoming.length > 0 && (
            <>
              <h3 className={styles.showsSubhead}>Upcoming</h3>
              <div className={styles.showsTable}>
                {upcoming.map((show) => (
                  <div key={show.id} className={styles.showRow}>
                    <div className={styles.showDateCol}>
                      <span className={styles.showDate}>{formatShowDate(show.date_start, show.date_end)}</span>
                    </div>
                    <div className={styles.showDetails}>
                      <h4 className={styles.showName}>{show.title}</h4>
                      <p className={styles.showLoc}>{show.location}</p>
                    </div>
                    {show.booth && <span className={styles.showBooth}>Booth {show.booth}</span>}
                    {show.website && (
                      <a href={show.website} target="_blank" rel="noopener noreferrer" className={styles.showLink}>
                        Info →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {past.length > 0 && (
            <>
              <h3 className={`${styles.showsSubhead} ${styles.pastSubhead}`}>Past Shows</h3>
              <div className={`${styles.showsTable} ${styles.pastTable}`}>
                {past.map((show) => (
                  <div key={show.id} className={`${styles.showRow} ${styles.pastRow}`}>
                    <div className={styles.showDateCol}>
                      <span className={styles.showDate}>{formatShowDate(show.date_start, show.date_end)}</span>
                    </div>
                    <div className={styles.showDetails}>
                      <h4 className={styles.showName}>{show.title}</h4>
                      <p className={styles.showLoc}>{show.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── News ───────────────────────────────────────── */}
      {news.length > 0 && (
        <section id="news" className={`section ${styles.sectionAlt}`}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Latest</span>
              <h2>News &amp; Updates</h2>
            </div>
            <div className={styles.newsGrid}>
              {news.map((item) => (
                <article key={item.id} className={styles.newsCard}>
                  <time className={styles.newsDate} dateTime={item.date}>
                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <h3 className={styles.newsTitle}>{item.title}</h3>
                  <p className={styles.newsExcerpt}>{item.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Projects ───────────────────────────────────── */}
      {projects.length > 0 && (
        <section id="projects" className={`section ${styles.section}`}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">In Progress</span>
              <h2>Ongoing Projects</h2>
            </div>
            <div className={styles.projectsGrid}>
              {projects.map((p) => (
                <div key={p.id} className={styles.projectCard}>
                  <div className={styles.projectHeader}>
                    <h3 className={styles.projectTitle}>{p.title}</h3>
                    <span className={`${styles.projectStatus} ${p.status === 'ongoing' ? styles.statusOngoing : styles.statusDone}`}>
                      {p.status === 'ongoing' ? 'In Progress' : 'Completed'}
                    </span>
                  </div>
                  <p className={styles.projectDesc}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact ────────────────────────────────────── */}
      <section id="contact" className={`section ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.contactInner}>
            <span className="section-label" style={{textAlign:'center',display:'block'}}>Get In Touch</span>
            <h2 className={styles.contactTitle}>Work With Us</h2>
            <p className={styles.contactSub}>
              Interested in a commission, collaboration, or just want to say hello?<br />
              We&apos;d love to hear from you.
            </p>
            <a href="mailto:skyhurststudios@gmail.com" className="btn btn-primary">
              Send Us an Email
            </a>
            <a
              href="https://www.instagram.com/skyhurststudios"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline ${styles.igBtn}`}
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
