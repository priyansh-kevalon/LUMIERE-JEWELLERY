/* ------------------------------------------------------------------ */
/* REST API client                                                     */
/*                                                                     */
/* Thin wrapper around `fetch` for the LUMIÈRE backend. When            */
/* VITE_API_URL is not set the storefront keeps working entirely from   */
/* its on-device stores so the demo never hard-depends on the server.   */
/* ------------------------------------------------------------------ */

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const isApiConfigured = Boolean(API_URL);

/*
 * All backend URLs derive from the single `VITE_API_URL` base (which already
 * includes the `/api` prefix). The per-feature variables below are optional
 * overrides kept for backwards compatibility — set them only if an endpoint
 * lives somewhere other than `{VITE_API_URL}/<feature>`. This means production
 * only needs one variable, and there is no `/api/api` duplication.
 */
const stripTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const resolveEndpoint = (override, suffix) => {
  const direct = stripTrailingSlash(override);
  if (direct) return direct;
  return API_URL ? `${API_URL}${suffix}` : '';
};

export const API_BASE_URL = API_URL;
export const AUTH_ENDPOINT = resolveEndpoint(import.meta.env.VITE_AUTH_ENDPOINT, '/auth');
export const CONTACT_ENDPOINT = resolveEndpoint(import.meta.env.VITE_CONTACT_ENDPOINT, '/contact');
export const NEWSLETTER_ENDPOINT = resolveEndpoint(import.meta.env.VITE_NEWSLETTER_ENDPOINT, '/newsletter');
export const CHECKOUT_ENDPOINT = resolveEndpoint(import.meta.env.VITE_CHECKOUT_ENDPOINT, '/checkout');

const ADMIN_SESSION_KEY = 'lumiere-admin-session';

function adminToken() {
  try {
    const raw = window.localStorage.getItem(ADMIN_SESSION_KEY);
    return raw ? JSON.parse(raw)?.token || null : null;
  } catch {
    return null;
  }
}

export async function apiRequest(path, { method = 'GET', body, admin = false, signal } = {}) {
  if (!isApiConfigured) {
    const error = new Error('api-not-configured');
    throw error;
  }

  const headers = {};
  if (body != null) headers['Content-Type'] = 'application/json';
  if (admin) {
    const token = adminToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
    signal,
  });

  const type = response.headers.get('content-type') || '';
  const data = type.includes('application/json') ? await response.json().catch(() => ({})) : {};

  if (!response.ok) {
    const error = new Error(data.message || `request-failed:${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: 'GET' }),
  post: (path, body, options) => apiRequest(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => apiRequest(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => apiRequest(path, { ...options, method: 'PATCH', body }),
  del: (path, options) => apiRequest(path, { ...options, method: 'DELETE' }),
};

/** Update by key, creating the record if it does not exist yet. */
export async function apiUpsert(base, key, record, options = {}) {
  try {
    return await apiRequest(`${base}/${encodeURIComponent(key)}`, { method: 'PUT', body: record, ...options });
  } catch (error) {
    if (error.status === 404) {
      return apiRequest(base, { method: 'POST', body: record, ...options });
    }
    throw error;
  }
}

/** Fire-and-forget write. Logs a warning instead of throwing. */
export function apiWrite(promise, label) {
  return Promise.resolve(promise).catch((error) => {
    console.warn(`[api] ${label} failed:`, error.message);
  });
}
