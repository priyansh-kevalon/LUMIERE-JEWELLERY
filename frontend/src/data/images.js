/**
 * Centralised imagery for the LUMIÈRE JEWELLERY storefront.
 * Uses high-resolution extracted assets from the design.
 */

export const images = {
  hero: '/images/hero/image 5.png',

  collections: {
    necklace: '/images/collections/necklace.png',
    rings: '/images/collections/rings.png',
    bracelets: '/images/collections/bracelets.png',
    earrings: '/images/collections/earrings.png',
    photos: {
      necklace: '/images/collections/necklace-photo.png',
      rings: '/images/collections/rings-photo.png',
      bracelets: '/images/collections/bracelets-photo.png',
      earrings: '/images/collections/earrings-photo.png',
    },
  },

  story: {
    main: '/images/story/story-main.png',
    secondary: '/images/story/story-inset.png',
    bg: '/images/story/story-bg.png',
  },

  arrivals: [
    '/images/arrivals/arrival-1.png',
    '/images/arrivals/arrival-2.png',
    '/images/arrivals/arrival-3.png',
    '/images/arrivals/arrival-4.png',
    '/images/arrivals/arrival-5.png',
  ],

  offers: {
    diamondBanner: '/images/offers/banner-diamond.png',
    emeraldBanner: '/images/offers/banner-emerald.png',
    diamond: '/images/offers/ring.png',
    emerald: '/images/offers/earrings.png',
  },

  moments: {
    wedding: '/images/moments/moment-wedding.png',
    festive: '/images/moments/moment-festive.png',
    anniversary: '/images/moments/moment-anniversary.png',
    everyday: '/images/moments/moment-everyday.png',
  },

  cta: {
    card: '/images/cta/cta-card.png',
  },

  footer: {
    bg: '/images/footer/footer-bg.png',
  },
};

export const toCandidates = (value) => (Array.isArray(value) ? value : [value]);

export function getImage(path) {
  return path.split('.').reduce((node, key) => (node ? node[key] : undefined), images) || images.hero;
}

export default images;
