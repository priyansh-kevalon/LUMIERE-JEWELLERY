const CHECKOUT_ENDPOINT = import.meta.env.VITE_CHECKOUT_ENDPOINT;

/**
 * Checkout integration point.
 *
 * The storefront has no payment backend wired up yet, so `startCheckout`
 * refuses to pretend a purchase completed. Configure `VITE_CHECKOUT_ENDPOINT`
 * to point at a cart/checkout service that accepts the cart payload and,
 * optionally, returns a `{ url }` to redirect the browser to (hosted payment
 * page, order confirmation, etc.).
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
