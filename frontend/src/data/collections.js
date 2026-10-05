/**
 * Catalogue groupings used across the homepage.
 * Image keys resolve against `data/images.js`.
 */

export const collections = [
  {
    key: 'necklace',
    name: 'NECKLACE',
    tagline: 'Solitaire pendants, chokers and heirloom chains',
    image: '/images/collections/necklace.png',
    photo: '/images/collections/necklace-photo.png',
    href: '#collections',
    alt: 'Diamond choker necklace on model',
  },
  {
    key: 'rings',
    name: 'RINGS',
    tagline: 'Engagement solitaires, halos and everyday bands',
    image: '/images/collections/rings.png',
    photo: '/images/collections/rings-photo.png',
    href: '#collections',
    alt: 'Solitaire diamond ring on display pedestal',
  },
  {
    key: 'bracelets',
    name: 'BRACELETS',
    tagline: 'Tennis lines, bangles and cuff silhouettes',
    image: '/images/collections/bracelets.png',
    photo: '/images/collections/bracelets-photo.png',
    href: '#collections',
    alt: 'Diamond bracelet on woman\'s wrist',
  },
  {
    key: 'earrings',
    name: 'EARRINGS',
    tagline: 'Studs, jhumkas and cascading drops',
    image: '/images/collections/earrings.png',
    photo: '/images/collections/earrings-photo.png',
    href: '#collections',
    alt: 'Diamond teardrop earrings on stand',
  },
];

export const moments = [
  {
    key: 'wedding',
    label: 'WEDDING',
    title: 'Made for Forever',
    description: 'Celebrate your love with timeless pieces crafted for beginning of forever.',
    image: '/images/moments/moment-wedding.png',
    alt: 'Antique gold and ruby wedding necklace',
  },
  {
    key: 'festive',
    label: 'FESTIVE',
    title: 'Celebrate in Brilliance',
    description: 'Add a touch of timeless sparkle to every celebration.',
    image: '/images/moments/moment-festive.png',
    alt: 'Diamond and sapphire necklace set',
  },
  {
    key: 'anniversary',
    label: 'ANNIVERSARY',
    title: 'LOVE, ALWAYS',
    description: 'Honour the moments you\'ve shared with jewellery as enduring as your story.',
    image: '/images/moments/moment-anniversary.png',
    alt: 'Diamond ring resting on folded white silk',
  },
  {
    key: 'everyday',
    label: 'EVERYDAY',
    title: 'Everyday Elegance',
    description: 'Effortless pieces designed to bring a little luxury to every day.',
    image: '/images/moments/moment-everyday.png',
    alt: 'Delicate gold bracelet on pink satin',
  },
];

export const getCollection = (key) => collections.find((item) => item.key === key);
export const getMoment = (key) => moments.find((item) => item.key === key);
