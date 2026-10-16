/* ------------------------------------------------------------------ */
/* Storefront ⇄ API synchronisation                                    */
/*                                                                     */
/* Pulls live records from the backend into the on-device stores on     */
/* load. Every mutation still updates the store first (so the UI stays  */
/* instant and works offline), then mirrors the change to the API.      */
/* ------------------------------------------------------------------ */

import { api, isApiConfigured } from '../services/api';
import { categoriesStore, productsStore } from './products';
import { couponsStore, customersStore, ordersStore, reviewsStore, settingsStore, subscribersStore } from './adminData';

let publicPromise = null;
let adminPromise = null;

/** Load public catalogue, categories, coupons and settings into local stores. */
export function hydratePublic() {
    if (!isApiConfigured) return Promise.resolve(false);
    if (!publicPromise) {
        publicPromise = Promise.all([
            api.get('/products'),
            api.get('/categories'),
            api.get('/coupons'),
            api.get('/settings'),
        ])
            .then(([products, categories, coupons, settings]) => {
                if (Array.isArray(products) && products.length) productsStore.set(products);
                if (Array.isArray(categories) && categories.length) categoriesStore.set(categories);
                if (Array.isArray(coupons) && coupons.length) couponsStore.set(coupons);
                if (settings && typeof settings === 'object' && settings.storeName) {
                    settingsStore.set(settings);
                }
                return true;
            })
            .catch((error) => {
                console.warn('[api] public data unavailable, using local store:', error.message);
                publicPromise = null;
                return false;
            });
    }
    return publicPromise;
}

/** Load admin-scoped records. Requires a valid admin token in storage. */
export function hydrateAdmin() {
    if (!isApiConfigured) return Promise.resolve(false);
    if (!adminPromise) {
        adminPromise = Promise.all([
            api.get('/orders', { admin: true }),
            api.get('/coupons', { admin: true }),
            api.get('/reviews', { admin: true }),
            api.get('/customers', { admin: true }),
            api.get('/newsletter', { admin: true }),
        ])
            .then(([orders, coupons, reviews, customers, subscribers]) => {
                if (Array.isArray(orders)) ordersStore.set(orders);
                if (Array.isArray(coupons)) couponsStore.set(coupons);
                if (Array.isArray(reviews)) reviewsStore.set(reviews);
                if (Array.isArray(customers)) customersStore.set(customers);
                if (Array.isArray(subscribers)) subscribersStore.set(subscribers);
                return true;
            })
            .catch((error) => {
                console.warn('[api] admin data unavailable, using local store:', error.message);
                adminPromise = null;
                return false;
            });
    }
    return adminPromise;
}

/** Allow a fresh admin session to refetch (e.g. after signing out/in). */
export function resetAdminSync() {
    adminPromise = null;
}
