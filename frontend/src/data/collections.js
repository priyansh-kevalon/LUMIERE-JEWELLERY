/**
 * Catalogue groupings used across the homepage.
 * Image keys resolve against `data/images.js` — never hardcode URLs here.
 */

export const collections = [
  {
    key: 'necklace',
    name: 'NECKLACE',
    tagline: 'Solitaire pendants, chokers and heirloom chains',
    image: 'collections.necklace',
    href: '#collections',
    alt: 'Diamond pendant necklace resting on dark silk',
  },
  {
    key: 'rings',
    name: 'RINGS',
    tagline: 'Engagement solitaires, halos and everyday bands',
    image: 'collections.rings',
    href: '#collections',
    alt: 'Diamond engagement ring in close-up detail',
  },
  {
    key: 'bracelets',
    name: 'BRACELETS',
    tagline: 'Tennis lines, bangles and cuff silhouettes',
    image: 'collections.bracelets',
    href: '#collections',
    alt: 'Gold and diamond bracelet on a dark backdrop',
  },
  {
    key: 'earrings',
    name: 'EARRINGS',
    tagline: 'Studs, jhumkas and cascading drops',
    image: 'collections.earrings',
    href: '#collections',
    alt: 'Diamond drop earrings worn by a model',
  },
];

export const moments = [
  {
    key: 'wedding',
    label: 'WEDDINGS',
    title: 'Made for Forever',
    description: 'Bridal sets, mangalsutras and heirloom pieces for the day you say yes.',
    image: 'moments.wedding',
    alt: 'Bride wearing a fine jewellery set on her wedding day',
  },
  {
    key: 'festive',
    label: 'FESTIVE',
    title: 'Celebrate in Brilliance',
    description: 'Temple silhouettes and kundan work built for the season of celebration.',
    image: 'moments.festive',
    alt: 'Woman in festive attire wearing traditional gold jewellery',
  },
  {
    key: 'anniversary',
    label: 'ANNIVERSARY',
    title: 'LOVE, ALWAYS',
    description: 'Elegant keepsakes that mark another year, and the decades ahead.',
    image: 'moments.anniversary',
    alt: 'Couple celebrating their anniversary with jewellery gifts',
  },
  {
    key: 'everyday',
    label: 'EVERYDAY',
    title: 'Everyday Elegance',
    description: 'Quiet, refined pieces designed to be worn from morning to evening.',
    image: 'moments.everyday',
    alt: 'Model in minimalist everyday jewellery and soft tailoring',
  },
];

export const getCollection = (key) => collections.find((item) => item.key === key);
export const getMoment = (key) => moments.find((item) => item.key === key);
