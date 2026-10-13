/* ------------------------------------------------------------------ */
/* Account service                                                     */
/*                                                                     */
/* When VITE_AUTH_ENDPOINT is set, requests are forwarded to that       */
/* backend (expected to answer with { user, token }). When it is not    */
/* set, the site falls back to a front-end-only account store kept in   */
/* the browser so the register / login flows stay fully interactive     */
/* without a server.                                                    */
/*                                                                     */
/* The local fallback is NOT production authentication: data never      */
/* leaves the device, only a salted hash of the password is kept (never */
/* the plain text), and it exists purely to demonstrate the flows.      */
/* ------------------------------------------------------------------ */

const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;
const USERS_KEY = 'lumiere-users';
const SESSION_KEY = 'lumiere-session';

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
  return session ? { name: session.name, email: session.email } : null;
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
