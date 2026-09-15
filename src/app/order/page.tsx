import type { Metadata } from 'next';
import OrderForm from './OrderForm';
import styles from './order.module.css';

// !! This page is strictly private — link-access only for convention attendees !!
export const metadata: Metadata = {
  title: 'Convention Canvas Orders | Skyhurst Studios',
  description: 'Private direct purchase link for convention attendees — order archival canvas prints directly from Gary Laib and Chris Wilhelm.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

const ARTWORKS = [
  { id: 'arcane', title: 'Arcane — Piltover & Zaun', img: '/images/Illustration/imgi_11_arcane-11x17.jpg' },
  { id: 'frieren', title: 'Frieren: Beyond Journey’s End', img: '/images/Illustration/imgi_26_frieren.jpg' },
  { id: 'reze', title: 'Reze — The Bomb Demon (Chainsaw Man)', img: '/images/Illustration/imgi_14_chainsawman-bombdevil.jpg' },
  { id: 'denji', title: 'Chainsaw Man — Denji Awakened', img: '/images/Illustration/imgi_13_chainsaw-man.jpg' },
  { id: 'dandadan', title: 'Dandadan — Turbo Dash', img: '/images/Illustration/imgi_15_dandadan.jpg' },
  { id: 'jujutsu', title: 'Jujutsu Kaisen — Domain Clash', img: '/images/Illustration/imgi_16_jujutsukaisen.jpg' },
  { id: 'godzilla', title: 'Godzilla — King of the Monsters', img: '/images/Illustration/imgi_2_godzilla-02-small.jpg' },
  { id: 'demon-slayer', title: 'Demon Slayer — Blade & Breath', img: '/images/Illustration/imgi_8_demonslayers.jpg' },
  { id: 'metroid', title: 'Metroid — Hunter’s Arrival', img: '/images/Illustration/imgi_1_metroid.jpg' },
  { id: 'castlevania', title: 'Castlevania — Belmont’s Vigil', img: '/images/Illustration/imgi_20_castlevania.jpg' },
  { id: 'crosslands', title: 'Crosslands: Azoria’s Blade I & II', img: '/images/Illustration/imgi_28_crosslands-azoriasblade-1.jpg' },
  { id: 'jodah', title: 'Jodah, Archmage Eternal (MTG)', img: '/images/Concept Art/imgi_17_gary-laib-5ws-fd4al5hujegnmixk-jodah.jpg' },
  { id: 'ral-zarek', title: 'Ral Zarek — Planeswalker (MTG)', img: '/images/Concept Art/imgi_16_gary-laib-3rxcrzkxvcfqrosyldigc-ral-zarek.jpg' },
  { id: 'temple', title: 'Temple of Sahinna (Key Art)', img: '/images/Concept Art/imgi_4_christopher-wilhelm-templeofsahinna-02.jpg' },
  { id: 'thalia', title: 'Thalia — Character Design', img: '/images/Concept Art/imgi_11_christopher-wilhelm-portfolio-thalia.jpg' },
];

const SIZES = [
  { id: '11x14', label: '11×14 in — Gallery Small', basePrice: 75 },
  { id: '16x20', label: '16×20 in — Exhibition Standard', basePrice: 135 },
  { id: '18x24', label: '18×24 in — Studio Masterpiece', basePrice: 195 },
  { id: '24x36', label: '24×36 in — Grand Format Archival', basePrice: 285 },
];

const EDITIONS = [
  { id: 'standard', label: 'Standard Archival Canvas', extraPrice: 0 },
  { id: 'signed-artist-proof', label: 'Hand-Signed Artist Proof', extraPrice: 25 },
  { id: 'limited-edition', label: 'Limited Edition (Numbered & Dual-Signed by Gary & Chris)', extraPrice: 50 },
];

export default function OrderPage() {
  return (
    <div className={styles.page}>
      <div className="wrap">
        <div className={styles.container}>

          {/* ── Private Banner Header ── */}
          <header className={styles.header}>
            <h1 className={styles.title}>Convention Canvas Orders</h1>
            <p className={styles.sub}>
              Thank you for visiting our booth! Order museum-grade canvas masterworks directly from Skyhurst Studios.
              Each canvas is printed with 100-year archival pigment inks on heavyweight gallery canvas and individually inspected by Gary Laib &amp; Chris Wilhelm.
            </p>
          </header>

          <div className={styles.divider} />

          {/* ── Purchase Flow Component ── */}
          <OrderForm artworks={ARTWORKS} sizes={SIZES} editions={EDITIONS} />

        </div>
      </div>
    </div>
  );
}
