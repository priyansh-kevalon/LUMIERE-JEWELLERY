const day = 24 * 60 * 60 * 1000;
const now = Date.now();

export const DEFAULT_ADMIN = { email: 'admin@lumiere.com', password: 'admin123' };

export const seedCategories = [
  { key: 'GOLD', label: 'GOLD', image: '/images/about/Rectangle 34624212.png', alt: 'Delicate gold necklace close-up' },
  { key: 'DIAMOND', label: 'DIAMOND', image: '/images/collections/rings-photo.png', alt: 'Solitaire diamond ring on display pedestal' },
  { key: 'SILVER', label: 'SILVER', image: '/images/collections/bracelets-photo.png', alt: "Dainty bracelet on a woman's wrist" },
  { key: 'BRIDAL', label: 'BRIDAL', image: '/images/moments/moment-wedding.png', alt: 'Antique gold and ruby wedding necklace' },
];

export const seedProducts = [
  { id: 1, name: 'Gold Prestige Intertwined Earrings', category: 'GOLD', type: 'Earrings', metal: '22K Gold', occasion: 'Festive', style: 'Traditional', availability: 'In Stock', price: 84500, popularity: 96, rating: 4.8, image: '/images/arrivals/arrival-2.png', alt: 'Traditional gold chandelier earrings with pink gemstone tops on burgundy velvet' },
  { id: 2, name: 'Diamond Solitaire Ring', category: 'DIAMOND', type: 'Rings', metal: '18K Gold', diamondShape: 'Round', diamondType: 'Natural', occasion: 'Engagement', style: 'Classic', availability: 'In Stock', price: 125000, compareAt: 148000, badge: 'Bestseller', popularity: 100, rating: 4.9, variants: ['#C6A16A', '#E8E2DA'], image: '/images/collections/rings-photo.png', alt: 'Solitaire diamond ring on display pedestal' },
  { id: 3, name: 'Rose Gold Diamond Band', category: 'DIAMOND', type: 'Rings', metal: '14K Gold', diamondShape: 'Round', diamondType: 'Natural', occasion: 'Engagement', style: 'Minimal', availability: 'In Stock', price: 62000, popularity: 78, rating: 4.6, variants: ['#C98A6B', '#E8E2DA'], image: '/images/moments/moment-anniversary.png', alt: 'Diamond ring resting on folded white silk' },
  { id: 4, name: 'Gold Hoop Earrings', category: 'GOLD', type: 'Earrings', metal: '22K Gold', occasion: 'Everyday', style: 'Minimal', availability: 'In Stock', price: 28900, popularity: 82, rating: 4.7, image: '/images/about/Rectangle 34624212.png', alt: 'Close-up of a delicate gold jewellery detail' },
  { id: 5, name: 'Ruby Diamond Ring', category: 'GOLD', type: 'Rings', metal: '18K Gold', diamondShape: 'Oval', diamondType: 'Natural', occasion: 'Party', style: 'Statement', availability: 'Made to Order', price: 98000, compareAt: 110000, popularity: 71, rating: 4.5, variants: ['#B3222E', '#E8E2DA'], image: '/images/offers/ring.png', alt: 'Statement gold ring with a deep red gemstone on a dark surface' },
  { id: 6, name: 'Geometric Diamond Earrings', category: 'DIAMOND', type: 'Earrings', metal: '18K Gold', diamondShape: 'Princess', diamondType: 'Lab-Grown', occasion: 'Party', style: 'Contemporary', availability: 'In Stock', price: 74500, popularity: 88, rating: 4.8, image: '/images/collections/earrings-photo.png', alt: 'Diamond teardrop earrings on a stand' },
  { id: 7, name: 'Minimal Gold Pendant', category: 'GOLD', type: 'Pendants', metal: '18K Gold', occasion: 'Everyday', style: 'Minimal', availability: 'In Stock', price: 19900, popularity: 75, rating: 4.6, image: '/images/about/Rectangle 34624223.png', alt: 'Vertical detail of a fine gold pendant chain' },
  { id: 8, name: 'Classic Diamond Ring', category: 'DIAMOND', type: 'Rings', metal: '18K Gold', diamondShape: 'Emerald', diamondType: 'Natural', occasion: 'Engagement', style: 'Classic', availability: 'In Stock', price: 112000, compareAt: 135000, popularity: 84, rating: 4.7, image: '/images/about/Rectangle 34624213.png', alt: 'Hands wearing elegant gold rings' },
  { id: 9, name: 'Contemporary Gold Earrings', category: 'GOLD', type: 'Earrings', metal: '22K Gold', occasion: 'Festive', style: 'Contemporary', availability: 'In Stock', price: 68500, popularity: 73, rating: 4.5, variants: ['#C6A16A', '#5E7A4A'], image: '/images/arrivals/arrival-5.png', alt: 'Model wearing long gold chandelier earrings with green gemstones' },
  { id: 10, name: 'Heritage Gold Necklace Set', category: 'GOLD', type: 'Sets', metal: '22K Gold', occasion: 'Wedding', style: 'Traditional', availability: 'In Stock', price: 189000, compareAt: 210000, badge: 'New', popularity: 90, rating: 4.9, image: '/images/arrivals/arrival-1.png', alt: 'Traditional gold necklace with matching earrings and ring on cream stands' },
  { id: 11, name: 'Gold Bracelet Stack', category: 'GOLD', type: 'Bracelets', metal: '22K Gold', occasion: 'Office', style: 'Contemporary', availability: 'In Stock', price: 47500, popularity: 68, rating: 4.4, image: '/images/arrivals/arrival-3.png', alt: 'Model wearing delicate gold bracelets in a cream satin outfit' },
  { id: 12, name: 'Ruby Pendant Necklace', category: 'BRIDAL', type: 'Pendants', metal: '22K Gold', occasion: 'Wedding', style: 'Traditional', availability: 'Made to Order', price: 156000, popularity: 80, rating: 4.8, variants: ['#B3222E', '#C6A16A'], image: '/images/arrivals/arrival-4.png', alt: 'Statement gold necklace with a deep ruby-red rectangular gemstone pendant' },
  { id: 13, name: 'Tennis Diamond Bracelet', category: 'DIAMOND', type: 'Bracelets', metal: '18K Gold', diamondShape: 'Round', diamondType: 'Natural', occasion: 'Office', style: 'Classic', availability: 'In Stock', price: 164000, compareAt: 182000, popularity: 86, rating: 4.7, image: '/images/collections/bracelets-photo.png', alt: "Diamond bracelet on a woman's wrist" },
  { id: 14, name: 'Diamond Choker Necklace', category: 'DIAMOND', type: 'Necklaces', metal: '18K Gold', diamondShape: 'Round', diamondType: 'Lab-Grown', occasion: 'Office', style: 'Contemporary', availability: 'In Stock', price: 138000, compareAt: 152000, popularity: 77, rating: 4.6, image: '/images/collections/necklace-photo.png', alt: 'Diamond choker necklace' },
  { id: 15, name: 'Bridal Heritage Necklace', category: 'BRIDAL', type: 'Necklaces', metal: '22K Gold', occasion: 'Wedding', style: 'Traditional', availability: 'Made to Order', price: 320000, popularity: 92, rating: 4.9, image: '/images/moments/moment-wedding.png', alt: 'Antique gold and ruby wedding necklace' },
  { id: 16, name: 'Sapphire Diamond Set', category: 'BRIDAL', type: 'Sets', metal: '18K Gold', diamondShape: 'Emerald', diamondType: 'Natural', occasion: 'Festive', style: 'Statement', availability: 'Made to Order', price: 245000, popularity: 65, rating: 4.5, variants: ['#1E3A8A', '#C6A16A'], image: '/images/moments/moment-festive.png', alt: 'Diamond and sapphire necklace set' },
  { id: 17, name: 'Everyday Gold Bracelet', category: 'GOLD', type: 'Bracelets', metal: '22K Gold', occasion: 'Everyday', style: 'Minimal', availability: 'In Stock', price: 22400, popularity: 70, rating: 4.5, image: '/images/moments/moment-everyday.png', alt: 'Delicate gold bracelet on pink satin' },
  { id: 18, name: 'Classic Gold Choker', category: 'GOLD', type: 'Necklaces', metal: '22K Gold', occasion: 'Party', style: 'Classic', availability: 'In Stock', price: 94000, popularity: 74, rating: 4.6, image: '/images/about/Rectangle 34624211.png', alt: 'Woman wearing a gold choker necklace' },
  { id: 19, name: 'Emerald Drop Earrings', category: 'DIAMOND', type: 'Earrings', metal: '18K Gold', diamondShape: 'Emerald', diamondType: 'Natural', occasion: 'Festive', style: 'Statement', availability: 'In Stock', price: 128000, compareAt: 142000, badge: 'New', popularity: 79, rating: 4.7, variants: ['#2E7D5B', '#C6A16A'], image: '/images/offers/earrings.png', alt: 'Emerald drop earrings captured in warm light' },
  { id: 20, name: 'Sterling Silver Bracelet', category: 'SILVER', type: 'Bracelets', metal: 'Sterling Silver', occasion: 'Office', style: 'Minimal', availability: 'In Stock', price: 11500, popularity: 64, rating: 4.4, image: '/images/collections/bracelets-photo.png', alt: "Dainty bracelet on a woman's wrist" },
  { id: 21, name: 'Silver Minimal Studs', category: 'SILVER', type: 'Earrings', metal: 'Sterling Silver', occasion: 'Everyday', style: 'Minimal', availability: 'In Stock', price: 8900, popularity: 66, rating: 4.5, image: '/images/about/Rectangle 34624213.png', alt: 'Hands wearing elegant gold rings' },
  { id: 22, name: "Men's Groom Chain", category: "MEN'S", type: 'Chains', metal: '22K Gold', occasion: 'Wedding', style: 'Classic', availability: 'Made to Order', price: 185000, popularity: 72, rating: 4.6, image: '/images/about/Rectangle 34624223.png', alt: 'Vertical detail of a fine gold chain' },
  { id: 23, name: "Men's Gold Signet Ring", category: "MEN'S", type: 'Rings', metal: '22K Gold', occasion: 'Office', style: 'Classic', availability: 'In Stock', price: 54000, popularity: 69, rating: 4.5, image: '/images/offers/ring.png', alt: 'Statement gold ring on a dark surface' },
  {
    id: 24, name: 'Eternal Diamond Ring', category: 'GOLD', categoryLabel: 'GOLD RINGS', type: 'Rings', metal: '18K Gold', material: '18K Gold', weight: '3.82g',
    diamondShape: 'Round', diamondType: 'Natural', diamondCarat: '0.45 ct', occasion: 'Engagement', style: 'Classic', availability: 'In Stock',
    price: 48500, popularity: 95, rating: 4.8, reviews: 120,
    description: 'A timeless gold ring featuring a delicate diamond setting, crafted to add understated elegance.',
    details: 'Designed to celebrate timeless elegance, the Eternal Grace Ring combines refined craftsmanship with a delicate diamond setting.',
    about: 'Designed to celebrate timeless elegance, the Eternal Grace Ring combines refined craftsmanship with a delicate diamond setting. Its minimal silhouette makes it equally suited for everyday elegance and special occasions.',
    sizes: ['6', '7', '8', '9', '10'],
    finishes: [{ name: 'Yellow Gold', color: '#C6A16A' }, { name: 'Rose Gold', color: '#C98A6B' }],
    image: '/images/collections/rings-photo.png', alt: 'Gold diamond ring resting on a soft ivory jewellery display',
  },
];

export const seedOrders = [
  { id: 'LM-1042', customer: { name: 'Aarav Mehta', email: 'aarav.mehta@gmail.com', phone: '9825011234' }, items: [{ id: 2, name: 'Diamond Solitaire Ring', price: 125000, qty: 1, image: '/images/collections/rings-photo.png', size: '7', metal: 'Yellow Gold' }], subtotal: 125000, shipping: 0, tax: 22500, total: 147500, status: 'shipped', payment: 'paid', paymentMethod: 'UPI', createdAt: now - 2 * day, address: { line1: '12 Venus Residency', city: 'Ahmedabad', state: 'Gujarat', pincode: '380015' }, tracking: 'BLR7789123401' },
  { id: 'LM-1041', customer: { name: 'Diya Sharma', email: 'diya.sharma@gmail.com', phone: '9812345678' }, items: [{ id: 10, name: 'Heritage Gold Necklace Set', price: 189000, qty: 1, image: '/images/arrivals/arrival-1.png', size: null, metal: 'Yellow Gold' }, { id: 4, name: 'Gold Hoop Earrings', price: 28900, qty: 1, image: '/images/about/Rectangle 34624212.png', size: null, metal: 'Yellow Gold' }], subtotal: 217900, shipping: 0, tax: 39222, total: 257122, status: 'processing', payment: 'paid', paymentMethod: 'Card', createdAt: now - 4 * day, address: { line1: '88 Palm Grove', city: 'Mumbai', state: 'Maharashtra', pincode: '400050' } },
  { id: 'LM-1040', customer: { name: 'Ishaan Verma', email: 'ishaan.v@gmail.com', phone: '9900112233' }, items: [{ id: 13, name: 'Tennis Diamond Bracelet', price: 164000, qty: 1, image: '/images/collections/bracelets-photo.png', size: null, metal: 'White Gold' }], subtotal: 164000, shipping: 0, tax: 29520, total: 193520, status: 'confirmed', payment: 'paid', paymentMethod: 'Net Banking', createdAt: now - 6 * day, address: { line1: '5 Silver Oak', city: 'Pune', state: 'Maharashtra', pincode: '411001' } },
  { id: 'LM-1039', customer: { name: 'Ananya Nair', email: 'ananya.nair@gmail.com', phone: '9744001122' }, items: [{ id: 20, name: 'Sterling Silver Bracelet', price: 11500, qty: 2, image: '/images/collections/bracelets-photo.png', size: null, metal: 'Silver' }], subtotal: 23000, shipping: 300, tax: 4140, total: 27440, status: 'delivered', payment: 'paid', paymentMethod: 'UPI', createdAt: now - 9 * day, address: { line1: '21 Backwater Lane', city: 'Kochi', state: 'Kerala', pincode: '682016' } },
  { id: 'LM-1038', customer: { name: 'Vivaan Kapoor', email: 'vivaan.k@gmail.com', phone: '9876501234' }, items: [{ id: 15, name: 'Bridal Heritage Necklace', price: 320000, qty: 1, image: '/images/moments/moment-wedding.png', size: null, metal: 'Yellow Gold' }], subtotal: 320000, shipping: 0, tax: 57600, total: 377600, status: 'pending', payment: 'pending', paymentMethod: 'Bank Transfer', createdAt: now - 1 * day, address: { line1: '9 Rose Avenue', city: 'Jaipur', state: 'Rajasthan', pincode: '302001' } },
  { id: 'LM-1037', customer: { name: 'Meera Iyer', email: 'meera.iyer@gmail.com', phone: '9845098450' }, items: [{ id: 19, name: 'Emerald Drop Earrings', price: 128000, qty: 1, image: '/images/offers/earrings.png', size: null, metal: 'Yellow Gold' }], subtotal: 128000, shipping: 0, tax: 23040, total: 151040, status: 'delivered', payment: 'paid', paymentMethod: 'Card', createdAt: now - 12 * day, address: { line1: '44 Temple Street', city: 'Chennai', state: 'Tamil Nadu', pincode: '600017' } },
  { id: 'LM-1036', customer: { name: 'Kabir Singh', email: 'kabir.singh@gmail.com', phone: '9711009988' }, items: [{ id: 23, name: "Men's Gold Signet Ring", price: 54000, qty: 1, image: '/images/offers/ring.png', size: '9', metal: 'Yellow Gold' }], subtotal: 54000, shipping: 0, tax: 9720, total: 63720, status: 'cancelled', payment: 'failed', paymentMethod: 'Card', createdAt: now - 14 * day, address: { line1: '3 Kingsway', city: 'Delhi', state: 'Delhi', pincode: '110001' } },
  { id: 'LM-1035', customer: { name: 'Sara Khan', email: 'sara.khan@gmail.com', phone: '9611223344' }, items: [{ id: 7, name: 'Minimal Gold Pendant', price: 19900, qty: 1, image: '/images/about/Rectangle 34624223.png', size: null, metal: 'Yellow Gold' }, { id: 21, name: 'Silver Minimal Studs', price: 8900, qty: 1, image: '/images/about/Rectangle 34624213.png', size: null, metal: 'Silver' }], subtotal: 28800, shipping: 300, tax: 5184, total: 34284, status: 'delivered', payment: 'paid', paymentMethod: 'UPI', createdAt: now - 18 * day, address: { line1: '17 Lake View', city: 'Hyderabad', state: 'Telangana', pincode: '500034' } },
];

export const seedCoupons = [
  { code: 'LUMIERE10', type: 'percent', value: 10, minOrder: 25000, usageLimit: 500, used: 128, active: true, firstOrderOnly: false, description: '10% off orders above ₹25,000' },
  { code: 'FESTIVE5000', type: 'fixed', value: 5000, minOrder: 100000, usageLimit: 200, used: 42, active: true, firstOrderOnly: false, description: '₹5,000 off orders above ₹1,00,000' },
  { code: 'FIRSTGLOW', type: 'percent', value: 15, minOrder: 0, usageLimit: 1000, used: 315, active: true, firstOrderOnly: true, description: '15% off your first order' },
  { code: 'BRIDAL20', type: 'percent', value: 20, minOrder: 200000, usageLimit: 50, used: 50, active: false, firstOrderOnly: false, description: 'Bridal collection — 20% off (expired)' },
];

export const seedReviews = [
  { id: 1, productId: 2, productName: 'Diamond Solitaire Ring', author: 'Aarav Mehta', rating: 5, title: 'Absolutely stunning', body: 'The solitaire is brilliant and the finish is impeccable. Arrived in beautiful packaging.', status: 'approved', reply: 'Thank you so much, Aarav!', createdAt: now - 3 * day },
  { id: 2, productId: 10, productName: 'Heritage Gold Necklace Set', author: 'Diya Sharma', rating: 5, title: 'Heirloom quality', body: 'Wore this for my wedding and received endless compliments. Craftsmanship is superb.', status: 'approved', reply: '', createdAt: now - 5 * day },
  { id: 3, productId: 13, productName: 'Tennis Diamond Bracelet', author: 'Ishaan Verma', rating: 4, title: 'Elegant everyday sparkle', body: 'Lovely bracelet, slightly lighter than expected but very well made.', status: 'pending', reply: '', createdAt: now - 1 * day },
  { id: 4, productId: 20, productName: 'Sterling Silver Bracelet', author: 'Ananya Nair', rating: 5, title: 'Perfect gift', body: 'Bought two as gifts and both were a hit. Great value for the finish.', status: 'pending', reply: '', createdAt: now - 6 * day },
  { id: 5, productId: 5, productName: 'Ruby Diamond Ring', author: 'Kabir Singh', rating: 2, title: 'Size runs small', body: 'Beautiful ring but the sizing chart was off and I had to exchange it.', status: 'pending', reply: '', createdAt: now - 8 * day },
];

export const seedSettings = {
  storeName: 'Lumière Jewellery',
  currency: 'INR',
  timezone: 'Asia/Kolkata',
  contactEmail: 'ravisales@gmail.com',
  phone: '+91 99999 00000',
  address: 'Ahmedabad, Gujarat',
  gstRate: 18,
  freeShippingThreshold: 50000,
  lowStockThreshold: 5,
  social: { instagram: 'https://www.instagram.com', facebook: 'https://www.facebook.com', pinterest: 'https://www.pinterest.com' },
  paymentMethods: ['UPI', 'Card', 'Net Banking', 'Bank Transfer'],
};

/** Derive the inventory/visibility fields the admin UI expects. */
export const withInventory = () =>
  seedProducts.map((product, index) => ({
    ...product,
    stock: product.stock ?? (4 + ((index * 7) % 28)),
    active: product.active ?? true,
    featured: product.featured ?? Boolean(product.badge),
  }));
