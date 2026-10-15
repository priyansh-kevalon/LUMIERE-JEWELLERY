import { CHECKOUT_ENDPOINT } from './api';

/**
 * Checkout integration point.
 *
 * The storefront sends the cart payload to the backend checkout endpoint,
 * which creates the order and optionally returns a `{ url }` to redirect the
 * browser to (hosted payment page, order confirmation, etc.). The endpoint is
 * derived from `VITE_API_URL` (see `services/api.js`).
 */
export async function startCheckout(items) {
  if (!CHECKOUT_ENDPOINT) {
    throw new Error('checkout-not-configured');
  }

  const response = await fetch(CHECKOUT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error(`checkout-failed:${response.status}`);
  }

  const data = await response.json().catch(() => ({}));
  if (data && typeof data.url === 'string' && data.url) {
    window.location.assign(data.url);
  }
  return data;
}
