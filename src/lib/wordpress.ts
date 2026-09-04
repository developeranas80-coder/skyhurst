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
    {
      id: 1,
      title: 'Dragon&apos;s Lament',
      category: 'illustration',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
      description: 'Epic fantasy illustration featuring an ancient dragon at dusk.',
      year: 2024,
      featured: true,
    },
    {
      id: 2,
      title: 'The Last Paladin',
      category: 'illustration',
      imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80',
      description: 'Character concept for a doomed paladin standing his last ground.',
      year: 2024,
      featured: true,
    },
    {
      id: 3,
      title: 'Starfall Chronicles',
      category: 'concept-art',
      imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
      description: 'Sci-fi concept art for an original IP space opera.',
      year: 2023,
      featured: true,
    },
    {
      id: 4,
      title: 'Wandering Mystic',
      category: 'illustration',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
      description: 'Character art for a roaming mage in an ancient forest.',
      year: 2023,
      featured: false,
    },
    {
      id: 5,
      title: 'Echoes of the Rift',
      category: 'sequential-art',
      imageUrl: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=800&q=80',
      description: 'Sequential pages from our ongoing graphic novel series.',
      year: 2024,
      featured: true,
    },
    {
      id: 6,
      title: 'Void Stalker',
      category: 'concept-art',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      description: 'Game character concept for a roguelite indie project.',
      year: 2023,
      featured: false,
    },
    {
      id: 7,
      title: 'Elven Cartography',
      category: 'illustration',
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      description: 'Intricate map illustration for a fantasy world-building project.',
      year: 2022,
      featured: false,
    },
    {
      id: 8,
      title: 'Mech Dawn',
      category: 'concept-art',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      description: 'Mecha design for a sci-fi tabletop game.',
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
