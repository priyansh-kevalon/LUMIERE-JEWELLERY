import { createStore, useStore } from './store';
import { api, apiUpsert, apiWrite } from '../services/api';

/* ------------------------------------------------------------------ */
/* Admin data layer                                                    */
/*                                                                     */
/* Orders, coupons, reviews and store settings all live in their own    */
/* persistent store so the panel works without a backend, exactly like  */
/* the account and catalogue stores it sits alongside.                  */
/* ------------------------------------------------------------------ */

export const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
export const ORDER_FLOW = [...ORDER_STATUSES, 'cancelled'];
export const PAYMENT_STATUSES = ['paid', 'pending', 'failed', 'refunded'];

const day = 24 * 60 * 60 * 1000;
const now = Date.now();

const seedOrders = [
    {
        id: 'LM-1042',
        customer: { name: 'Aarav Mehta', email: 'aarav.mehta@gmail.com', phone: '9825011234' },
        items: [
            { id: 2, name: 'Diamond Solitaire Ring', price: 125000, qty: 1, image: '/images/collections/rings-photo.png', size: '7', metal: 'Yellow Gold' },
        ],
        subtotal: 125000,
        shipping: 0,
        tax: 22500,
        total: 147500,
        status: 'shipped',
        payment: 'paid',
        paymentMethod: 'UPI',
        createdAt: now - 2 * day,
        address: { line1: '12 Venus Residency', city: 'Ahmedabad', state: 'Gujarat', pincode: '380015' },
        tracking: 'BLR7789123401',
    },
    {
        id: 'LM-1041',
        customer: { name: 'Diya Sharma', email: 'diya.sharma@gmail.com', phone: '9812345678' },
        items: [
            { id: 10, name: 'Heritage Gold Necklace Set', price: 189000, qty: 1, image: '/images/arrivals/arrival-1.png', size: null, metal: 'Yellow Gold' },
            { id: 4, name: 'Gold Hoop Earrings', price: 28900, qty: 1, image: '/images/about/Rectangle 34624212.png', size: null, metal: 'Yellow Gold' },
        ],
        subtotal: 217900,
        shipping: 0,
        tax: 39222,
        total: 257122,
        status: 'processing',
        payment: 'paid',
        paymentMethod: 'Card',
        createdAt: now - 4 * day,
        address: { line1: '88 Palm Grove', city: 'Mumbai', state: 'Maharashtra', pincode: '400050' },
    },
    {
        id: 'LM-1040',
        customer: { name: 'Ishaan Verma', email: 'ishaan.v@gmail.com', phone: '9900112233' },
        items: [
            { id: 13, name: 'Tennis Diamond Bracelet', price: 164000, qty: 1, image: '/images/collections/bracelets-photo.png', size: null, metal: 'White Gold' },
        ],
        subtotal: 164000,
        shipping: 0,
        tax: 29520,
        total: 193520,
        status: 'confirmed',
        payment: 'paid',
        paymentMethod: 'Net Banking',
        createdAt: now - 6 * day,
        address: { line1: '5 Silver Oak', city: 'Pune', state: 'Maharashtra', pincode: '411001' },
    },
    {
        id: 'LM-1039',
        customer: { name: 'Ananya Nair', email: 'ananya.nair@gmail.com', phone: '9744001122' },
        items: [
            { id: 20, name: 'Sterling Silver Bracelet', price: 11500, qty: 2, image: '/images/collections/bracelets-photo.png', size: null, metal: 'Silver' },
        ],
        subtotal: 23000,
        shipping: 300,
        tax: 4140,
        total: 27440,
        status: 'delivered',
        payment: 'paid',
        paymentMethod: 'UPI',
        createdAt: now - 9 * day,
        address: { line1: '21 Backwater Lane', city: 'Kochi', state: 'Kerala', pincode: '682016' },
    },
    {
        id: 'LM-1038',
        customer: { name: 'Vivaan Kapoor', email: 'vivaan.k@gmail.com', phone: '9876501234' },
        items: [
            { id: 15, name: 'Bridal Heritage Necklace', price: 320000, qty: 1, image: '/images/moments/moment-wedding.png', size: null, metal: 'Yellow Gold' },
        ],
        subtotal: 320000,
        shipping: 0,
        tax: 57600,
        total: 377600,
        status: 'pending',
        payment: 'pending',
        paymentMethod: 'Bank Transfer',
        createdAt: now - 1 * day,
        address: { line1: '9 Rose Avenue', city: 'Jaipur', state: 'Rajasthan', pincode: '302001' },
    },
    {
        id: 'LM-1037',
        customer: { name: 'Meera Iyer', email: 'meera.iyer@gmail.com', phone: '9845098450' },
        items: [
            { id: 19, name: 'Emerald Drop Earrings', price: 128000, qty: 1, image: '/images/offers/earrings.png', size: null, metal: 'Yellow Gold' },
        ],
        subtotal: 128000,
        shipping: 0,
        tax: 23040,
        total: 151040,
        status: 'delivered',
        payment: 'paid',
        paymentMethod: 'Card',
        createdAt: now - 12 * day,
        address: { line1: '44 Temple Street', city: 'Chennai', state: 'Tamil Nadu', pincode: '600017' },
    },
    {
        id: 'LM-1036',
        customer: { name: 'Kabir Singh', email: 'kabir.singh@gmail.com', phone: '9711009988' },
        items: [
            { id: 23, name: "Men's Gold Signet Ring", price: 54000, qty: 1, image: '/images/offers/ring.png', size: '9', metal: 'Yellow Gold' },
        ],
        subtotal: 54000,
        shipping: 0,
        tax: 9720,
        total: 63720,
        status: 'cancelled',
        payment: 'failed',
        paymentMethod: 'Card',
        createdAt: now - 14 * day,
        address: { line1: '3 Kingsway', city: 'Delhi', state: 'Delhi', pincode: '110001' },
    },
    {
        id: 'LM-1035',
        customer: { name: 'Sara Khan', email: 'sara.khan@gmail.com', phone: '9611223344' },
        items: [
            { id: 7, name: 'Minimal Gold Pendant', price: 19900, qty: 1, image: '/images/about/Rectangle 34624223.png', size: null, metal: 'Yellow Gold' },
            { id: 21, name: 'Silver Minimal Studs', price: 8900, qty: 1, image: '/images/about/Rectangle 34624213.png', size: null, metal: 'Silver' },
        ],
        subtotal: 28800,
        shipping: 300,
        tax: 5184,
        total: 34284,
        status: 'delivered',
        payment: 'paid',
        paymentMethod: 'UPI',
        createdAt: now - 18 * day,
        address: { line1: '17 Lake View', city: 'Hyderabad', state: 'Telangana', pincode: '500034' },
    },
];

const seedCoupons = [
    { code: 'LUMIERE10', type: 'percent', value: 10, minOrder: 25000, usageLimit: 500, used: 128, active: true, firstOrderOnly: false, description: '10% off orders above ₹25,000' },
    { code: 'FESTIVE5000', type: 'fixed', value: 5000, minOrder: 100000, usageLimit: 200, used: 42, active: true, firstOrderOnly: false, description: '₹5,000 off orders above ₹1,00,000' },
    { code: 'FIRSTGLOW', type: 'percent', value: 15, minOrder: 0, usageLimit: 1000, used: 315, active: true, firstOrderOnly: true, description: '15% off your first order' },
    { code: 'BRIDAL20', type: 'percent', value: 20, minOrder: 200000, usageLimit: 50, used: 50, active: false, firstOrderOnly: false, description: 'Bridal collection — 20% off (expired)' },
];

const seedReviews = [
    { id: 1, productId: 2, productName: 'Diamond Solitaire Ring', author: 'Aarav Mehta', rating: 5, title: 'Absolutely stunning', body: 'The solitaire is brilliant and the finish is impeccable. Arrived in beautiful packaging.', status: 'approved', reply: 'Thank you so much, Aarav!', createdAt: now - 3 * day },
    { id: 2, productId: 10, productName: 'Heritage Gold Necklace Set', author: 'Diya Sharma', rating: 5, title: 'Heirloom quality', body: 'Wore this for my wedding and received endless compliments. Craftsmanship is superb.', status: 'approved', reply: '', createdAt: now - 5 * day },
    { id: 3, productId: 13, productName: 'Tennis Diamond Bracelet', author: 'Ishaan Verma', rating: 4, title: 'Elegant everyday sparkle', body: 'Lovely bracelet, slightly lighter than expected but very well made.', status: 'pending', reply: '', createdAt: now - 1 * day },
    { id: 4, productId: 20, productName: 'Sterling Silver Bracelet', author: 'Ananya Nair', rating: 5, title: 'Perfect gift', body: 'Bought two as gifts and both were a hit. Great value for the finish.', status: 'pending', reply: '', createdAt: now - 6 * day },
    { id: 5, productId: 5, productName: 'Ruby Diamond Ring', author: 'Kabir Singh', rating: 2, title: 'Size runs small', body: 'Beautiful ring but the sizing chart was off and I had to exchange it.', status: 'pending', reply: '', createdAt: now - 8 * day },
];

const seedSettings = {
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

export const ordersStore = createStore('lumiere-orders', seedOrders);
export const couponsStore = createStore('lumiere-coupons', seedCoupons);
export const reviewsStore = createStore('lumiere-reviews', seedReviews);
export const settingsStore = createStore('lumiere-settings', seedSettings);

/* Populated from the API once an admin signs in (see data/sync.js). Empty in
   pure-offline mode, where the panel instead derives customers from orders. */
export const customersStore = createStore('lumiere-customers', []);

export function useOrders() {
    return useStore(ordersStore);
}
export function useCoupons() {
    return useStore(couponsStore);
}
export function useReviews() {
    return useStore(reviewsStore);
}
export function useSettings() {
    return useStore(settingsStore);
}
export function useCustomers() {
    return useStore(customersStore);
}

export function updateOrder(id, patch) {
    ordersStore.set((current) =>
        current.map((order) => (order.id === id ? { ...order, ...patch } : order)),
    );
    apiWrite(api.patch(`/orders/${encodeURIComponent(id)}`, patch, { admin: true }), 'updateOrder');
}

export function saveCoupon(coupon) {
    const record = { ...coupon, code: (coupon.code || '').trim().toUpperCase() };
    couponsStore.set((current) => {
        const exists = current.some((entry) => entry.code === record.code);
        return exists
            ? current.map((entry) => (entry.code === record.code ? { ...entry, ...record } : entry))
            : [{ used: 0, active: true, ...record }, ...current];
    });
    apiWrite(apiUpsert('/coupons', record.code, record, { admin: true }), 'saveCoupon');
    return record;
}

export function deleteCoupon(code) {
    couponsStore.set((current) => current.filter((entry) => entry.code !== code));
    apiWrite(api.del(`/coupons/${encodeURIComponent(code)}`, { admin: true }), 'deleteCoupon');
}

export function updateReview(id, patch) {
    reviewsStore.set((current) =>
        current.map((review) => (review.id === id ? { ...review, ...patch } : review)),
    );
    apiWrite(api.patch(`/reviews/${encodeURIComponent(id)}`, patch, { admin: true }), 'updateReview');
}

export function deleteReview(id) {
    reviewsStore.set((current) => current.filter((review) => review.id !== id));
    apiWrite(api.del(`/reviews/${encodeURIComponent(id)}`, { admin: true }), 'deleteReview');
}

export function updateSettings(patch) {
    settingsStore.set((current) => ({ ...current, ...patch }));
    apiWrite(api.put('/settings', patch, { admin: true }), 'updateSettings');
}

/** Orders grouped by customer email with lifetime metrics. */
export function buildCustomers(orders, users) {
    const byEmail = new Map();

    const ensure = (email, profile = {}) => {
        const key = (email || 'guest@lumiere.local').toLowerCase();
        if (!byEmail.has(key)) {
            byEmail.set(key, {
                email: key,
                name: profile.name || key.split('@')[0],
                phone: profile.phone || '',
                createdAt: profile.createdAt || null,
                orders: 0,
                spend: 0,
                lastOrderAt: null,
            });
        }
        return byEmail.get(key);
    };

    for (const user of users) ensure(user.email, user);
    for (const order of orders) {
        const customer = ensure(order.customer?.email, order.customer);
        customer.orders += 1;
        customer.spend += order.total || 0;
        if (!customer.lastOrderAt || order.createdAt > customer.lastOrderAt) {
            customer.lastOrderAt = order.createdAt;
        }
    }

    return [...byEmail.values()].sort((a, b) => b.spend - a.spend);
}
