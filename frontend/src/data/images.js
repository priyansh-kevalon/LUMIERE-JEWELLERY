/**
 * Centralised remote imagery for the LUMIÈRE JEWELLERY storefront.
 *
 * Every entry is a candidate list rather than a single string. `SmartImage`
 * walks the list in order and, if all candidates fail, renders a branded
 * fallback panel so the layout never collapses into a blank box.
 *
 * Primary source: Unsplash (stable CDN, hotlink-friendly, free to use).
 */

const UNSPLASH = (id, w = 1400, h = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const images = {
  hero: [
    '/images/hero/image 5.png',
    UNSPLASH('1599643478518-a784e5dc4c8f', 2000, 1400),
    UNSPLASH('1515562141207-7a88fb7ce338', 2000, 1400),
    UNSPLASH('1611652022419-a9419f74343d', 2000, 1400),
  ],

  /* -------------------------------------------------------------- */
  /* Featured collection cards (tall portrait 4:5)                   */
  /* -------------------------------------------------------------- */

  collections: {
    necklace: [
      UNSPLASH('1599643478518-a784e5dc4c8f', 900, 1125),
      UNSPLASH('1617038220319-276d3cfab638', 900, 1125),
      UNSPLASH('1515562141207-7a88fb7ce338', 900, 1125),
    ],
    rings: [
      UNSPLASH('1605100804763-247f67b3557e', 900, 1125),
      UNSPLASH('1603561596112-db1d8d1408c1', 900, 1125),
      UNSPLASH('1543294001-f7cd5d7fb516', 900, 1125),
    ],
    bracelets: [
      UNSPLASH('1611591437281-460bfbe1220a', 900, 1125),
      UNSPLASH('1602173574767-37ac01994b2a', 900, 1125),
      UNSPLASH('1573408301185-9146fe634ad0', 900, 1125),
    ],
    earrings: [
      UNSPLASH('1535632066927-ab7c9ab60908', 900, 1125),
      UNSPLASH('1630019852942-f89202989a59', 900, 1125),
      UNSPLASH('1617038260897-41a1f14a8ca0', 900, 1125),
    ],
  },

  /* -------------------------------------------------------------- */
  /* Brand story collage                                             */
  /* -------------------------------------------------------------- */

  story: {
    main: [
      UNSPLASH('1611652022419-a9419f74343d', 1200, 1500),
      UNSPLASH('1605100804763-247f67b3557e', 1200, 1500),
      UNSPLASH('1515562141207-7a88fb7ce338', 1200, 1500),
    ],
    secondary: [
      UNSPLASH('1602173574767-37ac01994b2a', 800, 1000),
      UNSPLASH('1535632066927-ab7c9ab60908', 800, 1000),
      UNSPLASH('1573408301185-9146fe634ad0', 800, 1000),
    ],
  },

  /* -------------------------------------------------------------- */
  /* New arrivals — asymmetrical editorial grid (5 frames)           */
  /* -------------------------------------------------------------- */

  arrivals: [
    /* 1 — large, necklace on model */
    [UNSPLASH('1611085583191-a3b181a88401', 1400, 1200), UNSPLASH('1599643478518-a784e5dc4c8f', 1400, 1200)],
    /* 2 — medium, earrings */
    [UNSPLASH('1630019852942-f89202989a59', 900, 1200), UNSPLASH('1535632066927-ab7c9ab60908', 900, 1200)],
    /* 3 — medium, bracelet */
    [UNSPLASH('1611591437281-460bfbe1220a', 900, 1200), UNSPLASH('1602173574767-37ac01994b2a', 900, 1200)],
    /* 4 — small, gemstone necklace detail */
    [UNSPLASH('1596944924616-7b38e7cfac36', 800, 1200), UNSPLASH('1515562141207-7a88fb7ce338', 800, 1200)],
    /* 5 — tall, model wearing earrings */
    [UNSPLASH('1524504388940-b1c1722653e1', 800, 1200), UNSPLASH('1617038220319-276d3cfab638', 800, 1200)],
  ],

  /* -------------------------------------------------------------- */
  /* Offer banners                                                   */
  /* -------------------------------------------------------------- */

  offers: {
    diamond: [
      UNSPLASH('1605100804763-247f67b3557e', 1000, 1200),
      UNSPLASH('1543294001-f7cd5d7fb516', 1000, 1200),
      UNSPLASH('1603561596112-db1d8d1408c1', 1000, 1200),
    ],
    emerald: [
      UNSPLASH('1573408301185-9146fe634ad0', 1000, 1200),
      UNSPLASH('1630019852942-f89202989a59', 1000, 1200),
      UNSPLASH('1535632066927-ab7c9ab60908', 1000, 1200),
    ],
  },

  /* -------------------------------------------------------------- */
  /* Beautiful moments                                              */
  /* -------------------------------------------------------------- */

  moments: {
    wedding: [
      UNSPLASH('1519741497674-611481863552', 900, 1125),
      UNSPLASH('1519225421980-715cb0215aed', 900, 1125),
      UNSPLASH('1606800050612-79c1e2ac1c94', 900, 1125),
    ],
    festive: [
      UNSPLASH('1512389142860-9c449e58a543', 900, 1125),
      UNSPLASH('1487412720507-e7ab37603c6f', 900, 1125),
      UNSPLASH('1509319117193-57bab727e09d', 900, 1125),
    ],
    anniversary: [
      UNSPLASH('1516589178581-6cd7833ae3b2', 900, 1125),
      UNSPLASH('1522673607200-164d1b6ce486', 900, 1125),
      UNSPLASH('1518568814500-bf0f8d125f46', 900, 1125),
    ],
    everyday: [
      UNSPLASH('1490481651871-ab68de25d43d', 900, 1125),
      UNSPLASH('1487412720507-e7ab37603c6f', 900, 1125),
      UNSPLASH('1502716119720-b23a93e5fe1b', 900, 1125),
    ],
  },

  /* -------------------------------------------------------------- */
  /* Final CTA texture                                              */
  /* -------------------------------------------------------------- */

  cta: [
    UNSPLASH('1596944924616-7b38e7cfac36', 1600, 900),
    UNSPLASH('1515562141207-7a88fb7ce338', 1600, 900),
  ],
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Always returns an array, even if a caller passes a bare string. */
export const toCandidates = (value) => (Array.isArray(value) ? value : [value]);

/** Resolve a dotted path such as `collections.necklace`. */
export function getImage(path) {
  return path.split('.').reduce((node, key) => (node ? node[key] : undefined), images) || images.hero;
}

export default images;
