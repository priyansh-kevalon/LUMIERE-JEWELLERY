/* ------------------------------------------------------------------ */
/* Admin authentication                                                */
/*                                                                     */
/* A self-contained admin credential store kept in the browser, seeded  */
/* with a single default administrator. This mirrors the demo approach  */
/* used by the storefront account service and is not production auth.   */
/* ------------------------------------------------------------------ */

import { readStorage } from '../data/store';

const ADMINS_KEY = 'lumiere-admins';
const SESSION_KEY = 'lumiere-admin-session';

export const DEFAULT_ADMIN = { email: 'admin@lumiere.com', password: 'admin123' };

const randomSalt = () => {
    const bytes = new Uint8Array(16);
    if (globalThis.crypto?.getRandomValues) {
        globalThis.crypto.getRandomValues(bytes);
    } else {
        for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

async function hashPassword(password, salt) {
    const data = new TextEncoder().encode(`${salt}:${password}`);
    if (globalThis.crypto?.subtle) {
        const digest = await globalThis.crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
    }
    let hash = 5381;
    for (let i = 0; i < data.length; i += 1) hash = ((hash << 5) + hash + data[i]) >>> 0;
    return `weak-${hash.toString(16)}`;
}

const writeAdmins = (admins) => {
    try {
        window.localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
    } catch {
        /* storage unavailable */
    }
};

/* Seed the default administrator on first run. */
let seeded = false;
async function ensureSeed() {
    if (seeded) return;
    seeded = true;
    const admins = readStorage(ADMINS_KEY, []);
    if (admins.length === 0) {
        const salt = randomSalt();
        const password = await hashPassword(DEFAULT_ADMIN.password, salt);
        writeAdmins([
            { email: DEFAULT_ADMIN.email, name: 'Store Administrator', role: 'Owner', salt, password, createdAt: Date.now() },
        ]);
    }
}

export function getAdminSession() {
    return readStorage(SESSION_KEY, null);
}

export function adminSignOut() {
    try {
        window.localStorage.removeItem(SESSION_KEY);
    } catch {
        /* storage unavailable */
    }
}

export async function adminSignIn({ email, password }) {
    await ensureSeed();
    const normalized = (email || '').trim().toLowerCase();
    const admins = readStorage(ADMINS_KEY, []);
    const admin = admins.find((entry) => entry.email === normalized);
    if (!admin) throw new Error('invalid-credentials');

    const hashed = await hashPassword(password, admin.salt);
    if (hashed !== admin.password) throw new Error('invalid-credentials');

    const session = {
        email: admin.email,
        name: admin.name,
        role: admin.role,
        token: `admin-${Date.now()}`,
        signedInAt: Date.now(),
    };
    try {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
        /* storage unavailable */
    }
    return session;
}
