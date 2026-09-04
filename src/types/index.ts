export interface Artist {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  initial: string;
  instagram?: string;
  email?: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: 'illustration' | 'concept-art' | 'sequential-art';
  imageUrl: string;
  description?: string;
  year?: number;
  featured?: boolean;
  // WP REST fields when using WP headless
  slug?: string;
  acf?: Record<string, unknown>;
}

export interface Show {
  id: number;
  title: string;
  location: string;
  date_start: string;
  date_end: string;
  booth?: string;
  website?: string;
  status: 'upcoming' | 'past';
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  content?: string;
}

export interface Project {
  id: number;
  title: string;
  status: 'ongoing' | 'completed';
  description: string;
  imageUrl?: string;
}

export interface CanvasOrder {
  artwork: string;
  size: string;
  edition: string;
  quantity: number;
  name: string;
  email: string;
  phone?: string;
  address: string;
  notes?: string;
}
