/* ------------------------------------------------------------------ */
/* Account service                                                     */
/*                                                                     */
/* When VITE_API_URL is set, requests are forwarded to that backend         */
/* (expected to answer with { user, token }). When it is not set, the site  */
/* set, the site falls back to a front-end-only account store kept in   */
/* the browser so the register / login flows stay fully interactive     */
/* without a server.                                                    */
/*                                                                     */
/* The local fallback is NOT production authentication: data never      */
/* leaves the device, only a salted hash of the password is kept (never */
/* the plain text), and it exists purely to demonstrate the flows.      */
/* ------------------------------------------------------------------ */

import { AUTH_ENDPOINT } from './api';

const USERS_KEY = 'lumiere-users';
const SESSION_KEY = 'lumiere-session';
const RESET_KEY = 'lumiere-reset';
const RESET_TTL = 15 * 60 * 1000; /* 15 minutes */

/* True when no backend is wired up — used to surface a demo notice. */
export const isLocalAuth = !AUTH_ENDPOINT;

/* ------------------------------- utils ---------------------------- */

const readUsers = () => {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* storage unavailable */
  }
};

const readReset = () => {
  try {
    const raw = window.localStorage.getItem(RESET_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeReset = (record) => {
  try {
    if (record) window.localStorage.setItem(RESET_KEY, JSON.stringify(record));
    else window.localStorage.removeItem(RESET_KEY);
  } catch {
    /* storage unavailable */
  }
};

/** Six digit reset code; used only by the local demo flow. */
const generateResetCode = () => {
  const bytes = new Uint8Array(4);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  const value = ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) >>> 0;
  return String(value % 1000000).padStart(6, '0');
};

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
  /* Weak, non-cryptographic fallback for contexts without Web Crypto.
     Acceptable only because this local store is a demo, never secure. */
  let hash = 5381;
  for (let i = 0; i < data.length; i += 1) hash = ((hash << 5) + hash + data[i]) >>> 0;
  return `weak-${hash.toString(16)}`;
}

const persistSession = (session) => {
  try {
    const primary = session.remember ? window.localStorage : window.sessionStorage;
    const secondary = session.remember ? window.sessionStorage : window.localStorage;
    primary.setItem(SESSION_KEY, JSON.stringify(session));
    secondary.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable */
  }
};

async function postAuth(path, payload) {
  const response = await fetch(`${AUTH_ENDPOINT}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const type = response.headers.get('content-type') || '';
  const body = type.includes('application/json') ? await response.json().catch(() => ({})) : {};

  if (!response.ok) {
    const message = typeof body?.message === 'string' && body.message ? body.message : null;
    const error = new Error(message || `auth-failed:${response.status}`);
    error.status = response.status;
    throw error;
  }

  return body;
}

const toPublicUser = (user) => ({
  name: user.name || '',
  email: user.email || '',
  phone: user.phone || '',
  createdAt: user.createdAt || null,
});

/* ------------------------------ session --------------------------- */

export function getSession() {
  try {
    const raw =
      window.localStorage.getItem(SESSION_KEY) || window.sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  return {
    name: session.name || '',
    email: session.email || '',
    phone: session.phone || '',
    createdAt: session.createdAt ?? null,
  };
}

export function signOut() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable */
  }
}

/* ------------------------------ actions --------------------------- */

export async function signIn({ email, password, remember = false }) {
  const normalized = email.trim().toLowerCase();

  if (AUTH_ENDPOINT) {
    const body = await postAuth('/login', { email: normalized, password, remember });
    const user = body.user || {};
    const publicUser = toPublicUser({ ...user, email: user.email || normalized });
    persistSession({ ...publicUser, token: body.token, remember });
    return publicUser;
  }

  const user = readUsers().find((entry) => entry.email === normalized);
  if (!user) throw new Error('invalid-credentials');

  const hashed = await hashPassword(password, user.salt);
  if (hashed !== user.password) throw new Error('invalid-credentials');

  const publicUser = toPublicUser(user);
  persistSession({ ...publicUser, token: `local-${Date.now()}`, remember });
  return publicUser;
}

export async function register({ name, email, password, phone }) {
  const normalized = email.trim().toLowerCase();

  if (AUTH_ENDPOINT) {
    const body = await postAuth('/register', {
      name: name.trim(),
      email: normalized,
      password,
      phone,
    });
    const user = body.user || {};
    const publicUser = toPublicUser({
      ...user,
      name: user.name || name.trim(),
      email: user.email || normalized,
      phone: user.phone || phone || '',
      createdAt: user.createdAt || Date.now(),
    });
    persistSession({ ...publicUser, token: body.token, remember: true });
    return publicUser;
  }

  const users = readUsers();
  if (users.some((entry) => entry.email === normalized)) {
    throw new Error('email-in-use');
  }

  const salt = randomSalt();
  const hashed = await hashPassword(password, salt);
  const record = {
    name: name.trim(),
    email: normalized,
    phone: phone ? phone.trim() : '',
    salt,
    password: hashed,
    createdAt: Date.now(),
  };

  writeUsers([...users, record]);
  const publicUser = toPublicUser(record);
  persistSession({ ...publicUser, token: `local-${Date.now()}`, remember: true });
  return publicUser;
}

/* ------------------------------ profile --------------------------- */

/**
 * Update the signed-in user's editable details (name / phone). The email is
 * the account key and stays read-only. Persisted to the local store and the
 * active session so the change is visible everywhere immediately.
 */
export async function updateProfile({ name, phone }) {
  const session = getSession();
  if (!session?.email) throw new Error('not-authenticated');

  const trimmedName = (name || '').trim();
  const trimmedPhone = (phone || '').trim();

  if (AUTH_ENDPOINT) {
    const response = await fetch(`${AUTH_ENDPOINT}/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(session.token ? { Authorization: `Bearer ${session.token}` } : {}),
      },
      body: JSON.stringify({ name: trimmedName, phone: trimmedPhone }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body?.message || `profile-update-failed:${response.status}`);
      error.status = response.status;
      throw error;
    }
    const user = toPublicUser({ ...body.user, name: trimmedName, phone: trimmedPhone });
    persistSession({ ...user, token: session.token, remember: session.remember });
    return user;
  }

  const users = readUsers();
  const index = users.findIndex((entry) => entry.email === session.email);
  if (index === -1) throw new Error('not-authenticated');

  users[index] = { ...users[index], name: trimmedName || users[index].name, phone: trimmedPhone };
  writeUsers(users);

  const publicUser = toPublicUser(users[index]);
  persistSession({ ...publicUser, token: session.token, remember: session.remember });
  return publicUser;
}

/* --------------------------- password reset ----------------------- */

/**
 * Password reset.
 *
 * With a backend wired up (`VITE_API_URL`) this posts to the reset
 * endpoint. Otherwise it runs a fully local demo flow: a short-lived code is
 * generated and stored on the device, then returned so the UI can show it
 * (there is no email service in demo mode).
 */
export async function requestPasswordReset({ email }) {
  const normalized = (email || '').trim().toLowerCase();

  if (AUTH_ENDPOINT) {
    return postAuth('/forgot-password', { email: normalized });
  }

  const user = readUsers().find((entry) => entry.email === normalized);
  if (!user) throw new Error('email-not-found');

  const code = generateResetCode();
  writeReset({ email: normalized, code, expiresAt: Date.now() + RESET_TTL });
  return { email: normalized, code, expiresInMinutes: Math.round(RESET_TTL / 60000) };
}

export async function resetPassword({ email, code, password }) {
  const normalized = (email || '').trim().toLowerCase();

  if (AUTH_ENDPOINT) {
    return postAuth('/reset-password', { email: normalized, code, password });
  }

  const record = readReset();
  if (!record || record.email !== normalized) throw new Error('invalid-code');
  if (!record.expiresAt || record.expiresAt < Date.now()) {
    writeReset(null);
    throw new Error('expired-code');
  }
  if (String(code || '').trim() !== String(record.code)) throw new Error('invalid-code');

  const users = readUsers();
  const index = users.findIndex((entry) => entry.email === normalized);
  if (index === -1) throw new Error('email-not-found');

  const salt = randomSalt();
  const hashed = await hashPassword(password, salt);
  users[index] = { ...users[index], salt, password: hashed };
  writeUsers(users);
  writeReset(null);

  return { email: normalized };
}
