export const categories = [{
        key: 'GOLD',
        label: 'GOLD',
        image: '/images/about/Rectangle 34624212.png',
        alt: 'Delicate gold necklace close-up',
    },
    {
        key: 'DIAMOND',
        label: 'DIAMOND',
        image: '/images/collections/rings-photo.png',
        alt: 'Solitaire diamond ring on display pedestal',
    },
    {
        key: 'SILVER',
        label: 'SILVER',
        image: '/images/collections/bracelets-photo.png',
        alt: 'Dainty bracelet on a woman\'s wrist',
    },
    {
        key: 'BRIDAL',
        label: 'BRIDAL',
        image: '/images/moments/moment-wedding.png',
        alt: 'Antique gold and ruby wedding necklace',
    },

];

export const filterGroups = [
    { key: 'type', label: 'JEWELLERY TYPE', options: ['Rings', 'Earrings', 'Necklaces', 'Pendants', 'Bracelets', 'Bangles', 'Chains', 'Sets'] },
    { key: 'metal', label: 'METAL', options: ['18K Gold', '22K Gold', '14K Gold', 'Sterling Silver'] },
    { key: 'diamondShape', label: 'DIAMOND SHAPE', options: ['Round', 'Oval', 'Princess', 'Emerald'] },
    { key: 'diamondType', label: 'DIAMOND TYPE', options: ['Natural', 'Lab-Grown'] },
    { key: 'occasion', label: 'OCCASION', options: ['Everyday', 'Office', 'Party', 'Wedding', 'Engagement', 'Festive'] },
    { key: 'style', label: 'STYLE', options: ['Minimal', 'Classic', 'Traditional', 'Contemporary', 'Statement'] },
    { key: 'availability', label: 'AVAILABILITY', options: ['In Stock', 'Made to Order'] },
];

export const products = [{
        id: 1,
        name: 'Gold Prestige Intertwined Earrings',
        category: 'GOLD',
        type: 'Earrings',
        metal: '22K Gold',
        occasion: 'Festive',
        style: 'Traditional',
        availability: 'In Stock',
        price: 84500,
        popularity: 96,
        rating: 4.8,
        image: '/images/arrivals/arrival-2.png',
        alt: 'Traditional gold chandelier earrings with pink gemstone tops on burgundy velvet',
    },
    {
        id: 2,
        name: 'Diamond Solitaire Ring',
        category: 'DIAMOND',
        type: 'Rings',
        metal: '18K Gold',
        diamondShape: 'Round',
        diamondType: 'Natural',
        occasion: 'Engagement',
        style: 'Classic',
        availability: 'In Stock',
        price: 125000,
        compareAt: 148000,
        badge: 'Bestseller',
        popularity: 100,
        rating: 4.9,
        variants: ['#C6A16A', '#E8E2DA'],
        image: '/images/collections/rings-photo.png',
        alt: 'Solitaire diamond ring on display pedestal',
    },
    {
        id: 3,
        name: 'Rose Gold Diamond Band',
        category: 'DIAMOND',
        type: 'Rings',
        metal: '14K Gold',
        diamondShape: 'Round',
        diamondType: 'Natural',
        occasion: 'Engagement',
        style: 'Minimal',
        availability: 'In Stock',
        price: 62000,
        popularity: 78,
        rating: 4.6,
        variants: ['#C98A6B', '#E8E2DA'],
        image: '/images/moments/moment-anniversary.png',
        alt: 'Diamond ring resting on folded white silk',
    },
    {
        id: 4,
        name: 'Gold Hoop Earrings',
        category: 'GOLD',
        type: 'Earrings',
        metal: '22K Gold',
        occasion: 'Everyday',
        style: 'Minimal',
        availability: 'In Stock',
        price: 28900,
        popularity: 82,
        rating: 4.7,
        image: '/images/about/Rectangle 34624212.png',
        alt: 'Close-up of a delicate gold jewellery detail',
    },
    {
        id: 5,
        name: 'Ruby Diamond Ring',
        category: 'GOLD',
        type: 'Rings',
        metal: '18K Gold',
        diamondShape: 'Oval',
        diamondType: 'Natural',
        occasion: 'Party',
        style: 'Statement',
        availability: 'Made to Order',
        price: 98000,
        compareAt: 110000,
        popularity: 71,
        rating: 4.5,
        variants: ['#B3222E', '#E8E2DA'],
        image: '/images/offers/ring.png',
        alt: 'Statement gold ring with a deep red gemstone on a dark surface',
    },
    {
        id: 6,
        name: 'Geometric Diamond Earrings',
        category: 'DIAMOND',
        type: 'Earrings',
        metal: '18K Gold',
        diamondShape: 'Princess',
        diamondType: 'Lab-Grown',
        occasion: 'Party',
        style: 'Contemporary',
        availability: 'In Stock',
        price: 74500,
        popularity: 88,
        rating: 4.8,
        image: '/images/collections/earrings-photo.png',
        alt: 'Diamond teardrop earrings on a stand',
    },
    {
        id: 7,
        name: 'Minimal Gold Pendant',
        category: 'GOLD',
        type: 'Pendants',
        metal: '18K Gold',
        occasion: 'Everyday',
        style: 'Minimal',
        availability: 'In Stock',
        price: 19900,
        popularity: 75,
        rating: 4.6,
        image: '/images/about/Rectangle 34624223.png',
        alt: 'Vertical detail of a fine gold pendant chain',
    },
    {
        id: 8,
        name: 'Classic Diamond Ring',
        category: 'DIAMOND',
        type: 'Rings',
        metal: '18K Gold',
        diamondShape: 'Emerald',
        diamondType: 'Natural',
        occasion: 'Engagement',
        style: 'Classic',
        availability: 'In Stock',
        price: 112000,
        compareAt: 135000,
        popularity: 84,
        rating: 4.7,
        image: '/images/about/Rectangle 34624213.png',
        alt: 'Hands wearing elegant gold rings',
    },
    {
        id: 9,
        name: 'Contemporary Gold Earrings',
        category: 'GOLD',
        type: 'Earrings',
        metal: '22K Gold',
        occasion: 'Festive',
        style: 'Contemporary',
        availability: 'In Stock',
        price: 68500,
        popularity: 73,
        rating: 4.5,
        variants: ['#C6A16A', '#5E7A4A'],
        image: '/images/arrivals/arrival-5.png',
        alt: 'Model wearing long gold chandelier earrings with green gemstones',
    },
    {
        id: 10,
        name: 'Heritage Gold Necklace Set',
        category: 'GOLD',
        type: 'Sets',
        metal: '22K Gold',
        occasion: 'Wedding',
        style: 'Traditional',
        availability: 'In Stock',
        price: 189000,
        compareAt: 210000,
        badge: 'New',
        popularity: 90,
        rating: 4.9,
        image: '/images/arrivals/arrival-1.png',
        alt: 'Traditional gold necklace with matching earrings and ring on cream stands',
    },
    {
        id: 11,
        name: 'Gold Bracelet Stack',
        category: 'GOLD',
        type: 'Bracelets',
        metal: '22K Gold',
        occasion: 'Office',
        style: 'Contemporary',
        availability: 'In Stock',
        price: 47500,
        popularity: 68,
        rating: 4.4,
        image: '/images/arrivals/arrival-3.png',
        alt: 'Model wearing delicate gold bracelets in a cream satin outfit',
    },
    {
        id: 12,
        name: 'Ruby Pendant Necklace',
        category: 'BRIDAL',
        type: 'Pendants',
        metal: '22K Gold',
        occasion: 'Wedding',
        style: 'Traditional',
        availability: 'Made to Order',
        price: 156000,
        popularity: 80,
        rating: 4.8,
        variants: ['#B3222E', '#C6A16A'],
        image: '/images/arrivals/arrival-4.png',
        alt: 'Statement gold necklace with a deep ruby-red rectangular gemstone pendant',
    },
    {
        id: 13,
        name: 'Tennis Diamond Bracelet',
        category: 'DIAMOND',
        type: 'Bracelets',
        metal: '18K Gold',
        diamondShape: 'Round',
        diamondType: 'Natural',
        occasion: 'Office',
        style: 'Classic',
        availability: 'In Stock',
        price: 164000,
        compareAt: 182000,
        popularity: 86,
        rating: 4.7,
        image: '/images/collections/bracelets-photo.png',
        alt: 'Diamond bracelet on a woman\'s wrist',
    },
    {
        id: 14,
        name: 'Diamond Choker Necklace',
        category: 'DIAMOND',
        type: 'Necklaces',
        metal: '18K Gold',
        diamondShape: 'Round',
        diamondType: 'Lab-Grown',
        occasion: 'Office',
        style: 'Contemporary',
        availability: 'In Stock',
        price: 138000,
        compareAt: 152000,
        popularity: 77,
        rating: 4.6,
        image: '/images/collections/necklace-photo.png',
        alt: 'Diamond choker necklace',
    },
    {
        id: 15,
        name: 'Bridal Heritage Necklace',
        category: 'BRIDAL',
        type: 'Necklaces',
        metal: '22K Gold',
        occasion: 'Wedding',
        style: 'Traditional',
        availability: 'Made to Order',
        price: 320000,
        popularity: 92,
        rating: 4.9,
        image: '/images/moments/moment-wedding.png',
        alt: 'Antique gold and ruby wedding necklace',
    },
    {
        id: 16,
        name: 'Sapphire Diamond Set',
        category: 'BRIDAL',
        type: 'Sets',
        metal: '18K Gold',
        diamondShape: 'Emerald',
        diamondType: 'Natural',
        occasion: 'Festive',
        style: 'Statement',
        availability: 'Made to Order',
        price: 245000,
        popularity: 65,
        rating: 4.5,
        variants: ['#1E3A8A', '#C6A16A'],
        image: '/images/moments/moment-festive.png',
        alt: 'Diamond and sapphire necklace set',
    },
    {
        id: 17,
        name: 'Everyday Gold Bracelet',
        category: 'GOLD',
        type: 'Bracelets',
        metal: '22K Gold',
        occasion: 'Everyday',
        style: 'Minimal',
        availability: 'In Stock',
        price: 22400,
        popularity: 70,
        rating: 4.5,
        image: '/images/moments/moment-everyday.png',
        alt: 'Delicate gold bracelet on pink satin',
    },
    {
        id: 18,
        name: 'Classic Gold Choker',
        category: 'GOLD',
        type: 'Necklaces',
        metal: '22K Gold',
        occasion: 'Party',
        style: 'Classic',
        availability: 'In Stock',
        price: 94000,
        popularity: 74,
        rating: 4.6,
        image: '/images/about/Rectangle 34624211.png',
        alt: 'Woman wearing a gold choker necklace',
    },
    {
        id: 19,
        name: 'Emerald Drop Earrings',
        category: 'DIAMOND',
        type: 'Earrings',
        metal: '18K Gold',
        diamondShape: 'Emerald',
        diamondType: 'Natural',
        occasion: 'Festive',
        style: 'Statement',
        availability: 'In Stock',
        price: 128000,
        compareAt: 142000,
        badge: 'New',
        popularity: 79,
        rating: 4.7,
        variants: ['#2E7D5B', '#C6A16A'],
        image: '/images/offers/earrings.png',
        alt: 'Emerald drop earrings captured in warm light',
    },
    {
        id: 20,
        name: 'Sterling Silver Bracelet',
        category: 'SILVER',
        type: 'Bracelets',
        metal: 'Sterling Silver',
        occasion: 'Office',
        style: 'Minimal',
        availability: 'In Stock',
        price: 11500,
        popularity: 64,
        rating: 4.4,
        image: '/images/collections/bracelets-photo.png',
        alt: 'Dainty bracelet on a woman\'s wrist',
    },
    {
        id: 21,
        name: 'Silver Minimal Studs',
        category: 'SILVER',
        type: 'Earrings',
        metal: 'Sterling Silver',
        occasion: 'Everyday',
        style: 'Minimal',
        availability: 'In Stock',
        price: 8900,
        popularity: 66,
        rating: 4.5,
        image: '/images/about/Rectangle 34624213.png',
        alt: 'Hands wearing elegant gold rings',
    },
    {
        id: 22,
        name: "Men's Groom Chain",
        category: "MEN'S",
        type: 'Chains',
        metal: '22K Gold',
        occasion: 'Wedding',
        style: 'Classic',
        availability: 'Made to Order',
        price: 185000,
        popularity: 72,
        rating: 4.6,
        image: '/images/about/Rectangle 34624223.png',
        alt: 'Vertical detail of a fine gold chain',
    },
    {
        id: 23,
        name: "Men's Gold Signet Ring",
        category: "MEN'S",
        type: 'Rings',
        metal: '22K Gold',
        occasion: 'Office',
        style: 'Classic',
        availability: 'In Stock',
        price: 54000,
        popularity: 69,
        rating: 4.5,
        image: '/images/offers/ring.png',
        alt: 'Statement gold ring on a dark surface',
    },
];

export const PER_PAGE = 9;
export const ALL_CATEGORY = 'ALL';

export function formatINR(value) {
    if (value == null || Number.isNaN(Number(value))) return '';
    const digits = Math.round(Number(value)).toString();
    const tail = digits.slice(-3);
    const head = digits.slice(0, -3);
    const grouped = head ? head.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + tail : tail;
    return `₹${grouped}`;
}

export function discountPercent(product) {
    if (!product.compareAt) return null;
    return Math.round((1 - product.price / product.compareAt) * 100);
}

/* ------------------------------------------------------------------ */
/* Product detail helpers                                              */
/* ------------------------------------------------------------------ */

/* Supporting shots per jewellery type so each product opens with a
   coherent, type-appropriate gallery within the demo asset set. */
const galleryPools = {
    Rings: [
        '/images/collections/rings-photo.png',
        '/images/offers/ring.png',
        '/images/moments/moment-anniversary.png',
        '/images/about/Rectangle 34624213.png',
    ],
    Earrings: [
        '/images/collections/earrings-photo.png',
        '/images/offers/earrings.png',
        '/images/arrivals/arrival-2.png',
        '/images/arrivals/arrival-5.png',
    ],
    Necklaces: [
        '/images/collections/necklace-photo.png',
        '/images/arrivals/arrival-4.png',
        '/images/about/Rectangle 34624211.png',
        '/images/arrivals/arrival-1.png',
    ],
    Bracelets: [
        '/images/collections/bracelets-photo.png',
        '/images/arrivals/arrival-3.png',
        '/images/moments/moment-everyday.png',
        '/images/about/Rectangle 34624212.png',
    ],
    Bangles: [
        '/images/collections/bracelets-photo.png',
        '/images/arrivals/arrival-3.png',
        '/images/about/Rectangle 34624220.png',
        '/images/moments/moment-everyday.png',
    ],
    Pendants: [
        '/images/about/Rectangle 34624223.png',
        '/images/arrivals/arrival-4.png',
        '/images/moments/moment-festive.png',
        '/images/about/Rectangle 34624211.png',
    ],
    Chains: [
        '/images/about/Rectangle 34624223.png',
        '/images/about/Rectangle 34624222.png',
        '/images/arrivals/arrival-1.png',
        '/images/moments/moment-wedding.png',
    ],
    Sets: [
        '/images/arrivals/arrival-1.png',
        '/images/moments/moment-wedding.png',
        '/images/moments/moment-festive.png',
        '/images/collections/necklace-photo.png',
    ],
};

export function getProductById(id) {
    return products.find((product) => product.id === id) || null;
}

export function getGallery(product) {
    const pool = [product.image, ...(galleryPools[product.type] || [])];
    const unique = [];
    for (const source of pool) {
        if (source && !unique.includes(source)) unique.push(source);
    }
    return unique.slice(0, 4);
}

export function getRelated(product, count = 4) {
    const sameType = products.filter((p) => p.id !== product.id && p.type === product.type);
    const sameCategory = products.filter(
        (p) => p.id !== product.id && p.category === product.category && p.type !== product.type,
    );
    const rest = products.filter((p) => p.id !== product.id && p.category !== product.category);

    const seen = new Set([product.id]);
    const result = [];
    for (const candidate of [...sameType, ...sameCategory, ...rest]) {
        if (!seen.has(candidate.id)) {
            seen.add(candidate.id);
            result.push(candidate);
        }
        if (result.length === count) break;
    }
    return result;
}

const stylePhrase = {
    Minimal: 'effortless everyday elegance',
    Classic: 'timeless sophistication',
    Traditional: 'rich heritage craft',
    Contemporary: 'modern refinement',
    Statement: 'unmistakable presence',
};

export function describeProduct(product) {
    const phrase = stylePhrase[product.style] || 'quiet luxury';
    const type = product.type.replace(/s$/, '').toLowerCase();
    const diamond = product.diamondType
        ? ` Set with ${product.diamondType.toLowerCase()} diamonds${
              product.diamondShape ? ` in a ${product.diamondShape.toLowerCase()} cut` : ''
          }.`
        : '';
    return `An exquisite ${product.metal.toLowerCase()} ${type} crafted for ${product.occasion.toLowerCase()} moments, embodying ${phrase}.${diamond} Hallmarked, hand-finished and presented in signature Lumière packaging.`;
}

export function productSpecs(product) {
    const rows = [
        ['Metal', product.metal],
        ['Jewellery Type', product.type],
        ['Occasion', product.occasion],
        ['Style', product.style],
        product.diamondShape ? ['Diamond Shape', product.diamondShape] : null,
        product.diamondType ? ['Diamond Type', `${product.diamondType} Diamonds`] : null,
        ['Availability', product.availability],
        ['Certification', 'BIS Hallmarked · IGI Certified'],
        ['Product Code', `LUM-${String(product.id).padStart(3, '0')}`],
    ];
    return rows.filter(Boolean);
}

export function reviewCount(product) {
    return 40 + product.id * 7;
}