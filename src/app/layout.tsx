import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: {
    default: 'Skyhurst Studios — Fine Art For The Discerning Nerd',
    template: '%s | Skyhurst Studios',
  },
  description:
    'Skyhurst Studios — professional fantasy and anime illustration, concept art, and sequential art by Gary Laib and Chris Wilhelm. West Coast convention art studio.',
  keywords: ['fantasy art', 'anime illustration', 'concept art', 'sequential art', 'Skyhurst Studios', 'Gary Laib', 'Chris Wilhelm'],
  openGraph: {
    siteName: 'Skyhurst Studios',
    type: 'website',
    url: 'https://www.skyhurststudios.com',
    images: [{
      url: 'https://www.skyhurststudios.com/uploads/1/5/4/8/154822741/published/skyhurst-logo-web.png?1769038603',
      alt: 'Skyhurst Studios',
    }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Space+Grotesk:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
