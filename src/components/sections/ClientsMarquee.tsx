import styles from './ClientsMarquee.module.css';

const CLIENTS = [
  'Blizzard Entertainment',
  'Wizards of the Coast',
  'Ubisoft',
  'Epic Games',
  'Activision',
  'Magic: The Gathering',
  'Dungeons & Dragons',
  'Dark Horse Comics',
  'Paizo Publishing',
  'Fantasy Flight Games',
];

export default function ClientsMarquee() {
  return (
    <section id="clients" className={`section-sm ${styles.section}`} aria-label="Client brands">
      <p className={styles.label}>Trusted By</p>
      <div className={styles.track} aria-hidden="true">
        {/* Duplicate for seamless loop */}
        {[0, 1].map((set) => (
          <div key={set} className={styles.set}>
            {CLIENTS.map((c) => (
              <div key={c} className={styles.item}>
                <span className={styles.name}>{c}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
