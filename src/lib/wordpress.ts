/**
 * WordPress Headless CMS API client
 * Base URL configured via NEXT_PUBLIC_WP_API_URL env variable.
 * Falls back to mock data if WP is not yet configured.
 */

import { PortfolioItem, Show, NewsItem, Project } from '@/types';

const WP_API = process.env.NEXT_PUBLIC_WP_API_URL || '';
const USE_MOCK = !WP_API;

// ─── Fetch helpers ────────────────────────────────────────────────────────────
async function wpFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${WP_API}/wp-json/wp/v2/${endpoint}`, {
    next: { revalidate: 3600 }, // ISR — revalidate every hour
  });
  if (!res.ok) throw new Error(`WP fetch failed: ${endpoint}`);
  return res.json();
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export async function getPortfolioItems(category?: string): Promise<PortfolioItem[]> {
  if (USE_MOCK) return getMockPortfolio(category);

  const query = category ? `portfolio?acf_filter[category]=${category}&_embed` : 'portfolio?_embed';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = await wpFetch(query);
  return data.map((item) => ({
    id: item.id,
    title: item.title.rendered,
    category: item.acf?.category || 'illustration',
    imageUrl: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    description: item.acf?.description || '',
    year: item.acf?.year,
    featured: item.acf?.featured || false,
    slug: item.slug,
  }));
}

export async function getFeaturedWork(): Promise<PortfolioItem[]> {
  if (USE_MOCK) return getMockPortfolio().filter((p) => p.featured).slice(0, 5);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = await wpFetch('portfolio?acf_filter[featured]=1&per_page=5&_embed');
  return data.map((item) => ({
    id: item.id,
    title: item.title.rendered,
    category: item.acf?.category || 'illustration',
    imageUrl: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    description: item.acf?.description || '',
    featured: true,
    slug: item.slug,
  }));
}

// ─── Shows ────────────────────────────────────────────────────────────────────
export async function getShows(status?: 'upcoming' | 'past'): Promise<Show[]> {
  if (USE_MOCK) {
    const all = getMockShows();
    return status ? all.filter((s) => s.status === status) : all;
  }
  const query = status ? `shows?acf_filter[status]=${status}` : 'shows';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = await wpFetch(query);
  return data.map((item) => ({
    id: item.id,
    title: item.title.rendered,
    location: item.acf?.location || '',
    date_start: item.acf?.date_start || '',
    date_end: item.acf?.date_end || '',
    booth: item.acf?.booth_number,
    website: item.acf?.website_url,
    status: item.acf?.status || 'upcoming',
  }));
}

// ─── News ─────────────────────────────────────────────────────────────────────
export async function getNews(limit = 3): Promise<NewsItem[]> {
  if (USE_MOCK) return getMockNews().slice(0, limit);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = await wpFetch(`posts?per_page=${limit}&_embed`);
  return data.map((item) => ({
    id: item.id,
    title: item.title.rendered,
    excerpt: item.excerpt.rendered.replace(/<[^>]*>/g, ''),
    date: item.date,
    slug: item.slug,
  }));
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  if (USE_MOCK) return getMockProjects();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = await wpFetch('projects?_embed');
  return data.map((item) => ({
    id: item.id,
    title: item.title.rendered,
    status: item.acf?.status || 'ongoing',
    description: item.acf?.description || '',
    imageUrl: item._embedded?.['wp:featuredmedia']?.[0]?.source_url,
  }));
}

// ─── Mock data (used until WP is configured) ──────────────────────────────────
function getMockPortfolio(category?: string): PortfolioItem[] {
  const items: PortfolioItem[] = [
    // ─── Illustration ──────────────────────────────────────────────────────────
    {
      id: 1,
      title: 'Arcane — Piltover & Zaun',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_11_arcane-11x17.jpg',
      description: 'Dynamic key art illustration inspired by League of Legends Arcane.',
      year: 2024,
      featured: true,
    },
    {
      id: 2,
      title: 'Frieren: Beyond Journey’s End',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_13_frieren.jpg',
      description: 'Atmospheric tribute illustration of Frieren and the starry night.',
      year: 2024,
      featured: true,
    },
    {
      id: 3,
      title: 'Reze — The Bomb Demon',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_3_reze-the-bomb-demon.jpg',
      description: 'Explosive high-impact illustration from Chainsaw Man.',
      year: 2024,
      featured: true,
    },
    {
      id: 4,
      title: 'Chainsaw Man — Denji Awakened',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_10_chainsaw-man-standard.jpg',
      description: 'Action-packed poster art featuring Denji in combat.',
      year: 2024,
      featured: false,
    },
    {
      id: 5,
      title: 'Dandadan — Turbo Dash',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_15_dandadan.jpg',
      description: 'Kinetic and vibrant action piece celebrating Dandadan.',
      year: 2024,
      featured: true,
    },
    {
      id: 6,
      title: 'Jujutsu Kaisen — Domain Clash',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_16_jujutsukaisen.jpg',
      description: 'Intense confrontation illustration of sorcerers unleashing cursed techniques.',
      year: 2024,
      featured: false,
    },
    {
      id: 7,
      title: 'Metroid — Hunter’s Arrival',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_4_metroid-illo-ig.jpg',
      description: 'Atmospheric sci-fi tribute illustration featuring Samus Aran.',
      year: 2023,
      featured: false,
    },
    {
      id: 8,
      title: 'Castlevania — Belmont’s Vigil',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_5_castlevania-canvas.jpg',
      description: 'Gothic fantasy canvas piece featuring the vampire hunter.',
      year: 2023,
      featured: false,
    },
    {
      id: 9,
      title: 'Godzilla — King of the Monsters',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_2_godzilla-02-small.jpg',
      description: 'Massive kaiju key art painting depicting Godzilla towering over the city.',
      year: 2024,
      featured: true,
    },
    {
      id: 10,
      title: 'Demon Slayer — Blade & Breath',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_8_demonslayers.jpg',
      description: 'Dynamic battle composition of Demon Slayer corps.',
      year: 2023,
      featured: false,
    },
    {
      id: 11,
      title: 'My Hero Academia — Plus Ultra',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_6_myhero.jpg',
      description: 'Hero tribute illustration full of energy and color.',
      year: 2023,
      featured: false,
    },
    {
      id: 12,
      title: 'Cowboy Bebop — Faye Valentine',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_30_faye-02.jpg',
      description: 'Neo-noir space western tribute character illustration.',
      year: 2023,
      featured: false,
    },
    {
      id: 13,
      title: 'Crosslands: Azoria’s Blade I',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_28_crosslands-azoriasblade-1.jpg',
      description: 'Epic high fantasy key poster for the Crosslands original universe.',
      year: 2024,
      featured: true,
    },
    {
      id: 14,
      title: 'Crosslands: Azoria’s Blade II',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_29_crosslands-azoriasblade-2.jpg',
      description: 'Climactic fantasy battlefield illustration with magical energy.',
      year: 2024,
      featured: false,
    },
    {
      id: 15,
      title: 'Akahoshi the Protector',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_21_akahoshi-the-protector.jpg',
      description: 'Mythic guardian character art with intricate ornate linework.',
      year: 2023,
      featured: false,
    },
    {
      id: 16,
      title: 'Through the Dreadlands',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_25_through-the-dreadlands.jpg',
      description: 'Dark fantasy environmental landscape illustration.',
      year: 2023,
      featured: false,
    },
    {
      id: 17,
      title: 'Nightblade Brigade',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_26_nightblade-brigade-11x14.jpg',
      description: 'Character squad composition for fantasy tabletop lore.',
      year: 2023,
      featured: false,
    },
    {
      id: 18,
      title: 'The Great Debate',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_22_the-great-debate-canvas.jpg',
      description: 'Narrative canvas painting of scholarly wizards in heated deliberation.',
      year: 2023,
      featured: false,
    },
    {
      id: 19,
      title: 'Meeting a Little Dragon',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_36_meetingalittledragon.jpg',
      description: 'Whimsical and heartwarming fantasy character art.',
      year: 2024,
      featured: false,
    },
    {
      id: 20,
      title: 'Planetrise',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_32_planetrise.jpg',
      description: 'Cosmic sci-fi planet vista illustration.',
      year: 2024,
      featured: false,
    },
    {
      id: 21,
      title: 'Ten of Pots (Tarot Series)',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_18_ten-of-pots-11x14-bordered.jpg',
      description: 'Stylized tarot card artwork with decorative golden border.',
      year: 2023,
      featured: false,
    },
    {
      id: 22,
      title: 'Rumi & Jinu',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_19_rumi-n-jinu-02.jpg',
      description: 'Expressive character artwork featuring duo dynamics.',
      year: 2024,
      featured: false,
    },
    {
      id: 23,
      title: 'Stare into the Void',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_24_stare-into-the-void.jpg',
      description: 'Ethereal cosmic fantasy painting.',
      year: 2024,
      featured: false,
    },
    {
      id: 24,
      title: 'Azoria #4 — The Delivery',
      category: 'illustration',
      imageUrl: '/images/Illustration/imgi_27_azoria4-coverposter-delivery.jpg',
      description: 'Original graphic novel issue cover art.',
      year: 2024,
      featured: false,
    },

    // ─── Concept Art ───────────────────────────────────────────────────────────
    {
      id: 25,
      title: 'Ral Zarek — Planeswalker',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_16_gary-laib-3rxcrzkxvcfqrosyldigc-ral-zarek.jpg',
      description: 'Official Magic: The Gathering character concept art by Gary Laib.',
      year: 2024,
      featured: true,
    },
    {
      id: 26,
      title: 'Jodah, Archmage Eternal',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_17_gary-laib-5ws-fd4al5hujegnmixk-jodah.jpg',
      description: 'Magic: The Gathering legendary archmage visual development by Gary Laib.',
      year: 2024,
      featured: true,
    },
    {
      id: 27,
      title: 'Baloth Beast Concept',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_3_gary-laib-2m7ybojcwqts0jze4-ha2-baloth.jpg',
      description: 'Creature design and anatomical study for Magic: The Gathering.',
      year: 2023,
      featured: false,
    },
    {
      id: 28,
      title: 'Grotag Goblins — Zendikar',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_12_gary-laib-bxwdlcinflh-i-2dxty1g-grotag-goblins.jpg',
      description: 'MTG Zendikar goblin character sheet and silhouette studies.',
      year: 2023,
      featured: false,
    },
    {
      id: 29,
      title: 'Grotag Costume Variations',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_13_gary-laib-nujiawg-ak1jmy-4dd2l4-grotag-costume-variations.jpg',
      description: 'Costume exploration and props design by Gary Laib.',
      year: 2023,
      featured: false,
    },
    {
      id: 30,
      title: 'Shivan Goblins — Dominaria',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_22_gary-laib-twplxskdvxpy4p5foc8xh-shivan-goblins.jpg',
      description: 'Red mana goblin concept designs for MTG Dominaria.',
      year: 2023,
      featured: false,
    },
    {
      id: 31,
      title: 'Thalia — Hero Visual Exploration',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_10_christopher-wilhelm-thalia-concept-01.jpg',
      description: 'Character visual development sketches by Christopher Wilhelm.',
      year: 2024,
      featured: false,
    },
    {
      id: 32,
      title: 'Thalia — Final Character Design',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_11_christopher-wilhelm-portfolio-thalia.jpg',
      description: 'Turnaround and polished concept rendering by Christopher Wilhelm.',
      year: 2024,
      featured: true,
    },
    {
      id: 33,
      title: 'Temple of Sahinna',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_4_christopher-wilhelm-templeofsahinna-02.jpg',
      description: 'Ancient temple architecture and mood painting by Christopher Wilhelm.',
      year: 2024,
      featured: true,
    },
    {
      id: 34,
      title: 'Armorer Hero Concept',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_5_christopher-wilhelm-hero-0014-armorer-concept.jpg',
      description: 'Heavy armor and weaponry visual design by Christopher Wilhelm.',
      year: 2023,
      featured: false,
    },
    {
      id: 35,
      title: 'Brave Order Heroes — Thera',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_9_christopher-wilhelm-christopher-wilhelm-braveorderheroes-thera.jpg',
      description: 'Key hero character design for Brave Order game development.',
      year: 2023,
      featured: false,
    },
    {
      id: 36,
      title: 'Orla — Character Development',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_24_garylaibart-8erpeceia3jh-kuvxsrc4-orla-early-concepts.jpg',
      description: 'Early silhouette and facial expression concepts for Orla by Gary Laib.',
      year: 2023,
      featured: false,
    },
    {
      id: 37,
      title: 'Orla’s Backpack & Gear Breakdown',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_25_garylaibart-anneeiig5jjavgycrgv32-orlas-backpack-concept.jpg',
      description: 'Prop and survival gear breakdown for adventure protagonist.',
      year: 2023,
      featured: false,
    },
    {
      id: 38,
      title: 'Character Lineup Study',
      category: 'concept-art',
      imageUrl: '/images/Concept Art/imgi_26_garylaibart-bosnikl4ffg9iansosk6n-character-lineup-2.jpg',
      description: 'Height comparison and style alignment lineup for animation.',
      year: 2023,
      featured: false,
    },

    // ─── Sequential Art ────────────────────────────────────────────────────────
    {
      id: 39,
      title: 'Crosslands: Azoria’s Blade #2 — Page 24',
      category: 'sequential-art',
      imageUrl: '/images/Sequential Art/imgi_2_crosslands-azoriasblade-2-pg24.jpg',
      description: 'Original sequential graphic novel storytelling page.',
      year: 2024,
      featured: false,
    },
    {
      id: 40,
      title: 'Crosslands: Azoria’s Blade #2 — Page 25',
      category: 'sequential-art',
      imageUrl: '/images/Sequential Art/imgi_3_crosslands-azoriasblade-2-pg25.jpg',
      description: 'High-tension character dialogue and pacing page.',
      year: 2024,
      featured: false,
    },
    {
      id: 41,
      title: 'Crosslands: Azoria’s Blade #2 — Page 26',
      category: 'sequential-art',
      imageUrl: '/images/Sequential Art/imgi_4_crosslands-azoriasblade-2-pg26.jpg',
      description: 'Combat sequence panels with dynamic ink work.',
      year: 2024,
      featured: false,
    },
    {
      id: 42,
      title: 'Crosslands: Azoria’s Blade #2 — Page 27',
      category: 'sequential-art',
      imageUrl: '/images/Sequential Art/imgi_5_crosslands-azoriasblade-2-pg27.jpg',
      description: 'Dramatic lighting and environmental panel flow.',
      year: 2024,
      featured: false,
    },
    {
      id: 43,
      title: 'Crosslands: Azoria’s Blade #2 — Page 28',
      category: 'sequential-art',
      imageUrl: '/images/Sequential Art/imgi_6_crosslands-azoriasblade-2-pg28.jpg',
      description: 'Full splash page climax with vivid colors and intricate details.',
      year: 2024,
      featured: true,
    },
    {
      id: 44,
      title: 'Voidwalker — Chapter 1: Page 1',
      category: 'sequential-art',
      imageUrl: '/images/Sequential Art/imgi_7_voidwalkerpages1.jpg',
      description: 'Opening page of the Voidwalker original sci-fi comic series.',
      year: 2024,
      featured: true,
    },
    {
      id: 45,
      title: 'Voidwalker — Chapter 1: Page 2',
      category: 'sequential-art',
      imageUrl: '/images/Sequential Art/imgi_8_voidwalkerpages2.jpg',
      description: 'Sequential panel progression and setting establishment.',
      year: 2024,
      featured: false,
    },
    {
      id: 46,
      title: 'Voidwalker — Chapter 1: Page 3',
      category: 'sequential-art',
      imageUrl: '/images/Sequential Art/imgi_9_voidwalkerpages3.jpg',
      description: 'Dynamic character movement and cinematic camera angles.',
      year: 2024,
      featured: false,
    },
    {
      id: 47,
      title: 'Voidwalker — Chapter 1: Page 4',
      category: 'sequential-art',
      imageUrl: '/images/Sequential Art/imgi_10_voidwalkerpages4.jpg',
      description: 'Action sequencing and sound-effect integration.',
      year: 2024,
      featured: false,
    },
    {
      id: 48,
      title: 'Voidwalker — Chapter 1: Page 5',
      category: 'sequential-art',
      imageUrl: '/images/Sequential Art/imgi_11_voidwalkerpages5.jpg',
      description: 'Chapter ending cliffhanger sequential layout.',
      year: 2024,
      featured: false,
    },
  ];
  return category ? items.filter((i) => i.category === category) : items;
}

function getMockShows(): Show[] {
  return [
    {
      id: 1,
      title: 'Fan Expo Portland',
      location: 'Portland, OR',
      date_start: '2024-09-20',
      date_end: '2024-09-22',
      booth: 'A-214',
      website: 'https://fanexpo.com',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Rose City Comic Con',
      location: 'Portland Convention Center, OR',
      date_start: '2024-10-18',
      date_end: '2024-10-20',
      booth: 'B-108',
      website: 'https://rosecitycomiccon.com',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Emerald City Comic Con',
      location: 'Seattle, WA',
      date_start: '2024-03-14',
      date_end: '2024-03-17',
      booth: 'C-422',
      status: 'past',
    },
    {
      id: 4,
      title: 'San Diego Comic-Con',
      location: 'San Diego, CA',
      date_start: '2024-07-24',
      date_end: '2024-07-28',
      booth: 'D-1201',
      status: 'past',
    },
  ];
}

function getMockNews(): NewsItem[] {
  return [
    {
      id: 1,
      title: 'New Print Series Dropping at Fan Expo Portland',
      excerpt:
        'We\'re releasing an exclusive limited-edition print series at Fan Expo Portland this September. Only 50 copies of each piece — get them while they last!',
      date: '2024-08-15',
      slug: 'new-print-series-fan-expo',
    },
    {
      id: 2,
      title: 'Skyhurst Studios Wraps Blizzard Collaboration',
      excerpt:
        'After six months of collaboration, we\'ve wrapped our concept art work for Blizzard Entertainment\'s upcoming title. We can\'t share details yet — but it\'s epic.',
      date: '2024-07-30',
      slug: 'blizzard-collaboration',
    },
    {
      id: 3,
      title: '\"Echoes of the Rift\" Graphic Novel — Chapter 3 Released',
      excerpt:
        'Chapter 3 of our ongoing graphic novel series is now available. Pick up a copy at our next show or order online through our store.',
      date: '2024-07-01',
      slug: 'echoes-chapter-3',
    },
  ];
}

function getMockProjects(): Project[] {
  return [
    {
      id: 1,
      title: 'Echoes of the Rift',
      status: 'ongoing',
      description:
        'An epic fantasy graphic novel series following twin sorcerers across fractured dimensions. Currently on Chapter 4.',
    },
    {
      id: 2,
      title: 'Children\'s Book Series — "Wyrm & Friends"',
      status: 'ongoing',
      description:
        'A heartwarming illustrated children\'s book series by Gary Laib featuring a lovable young dragon navigating the human world.',
    },
    {
      id: 3,
      title: 'Indie Game — "Void Stalker"',
      status: 'ongoing',
      description:
        'Providing full concept art and character design for a roguelite indie game in development by a Pacific Northwest studio.',
    },
  ];
}
