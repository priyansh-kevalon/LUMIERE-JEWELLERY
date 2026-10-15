import { CHECKOUT_ENDPOINT } from './api';
import { getSession } from './auth';

/* ------------------------------------------------------------------ */
/* Checkout service                                                    */
/*                                                                     */
/* Wraps the authenticated `/checkout` endpoints (order creation,       */
/* Razorpay verification, order history) and the Razorpay Checkout      */
/* script loader. Every request carries the signed-in customer's token; */
/* the backend always re-prices the cart and verifies ownership.        */
/* ------------------------------------------------------------------ */

const authHeaders = () => {
  const token = getSession()?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function request(path = '', { method = 'GET', body } = {}) {
  if (!CHECKOUT_ENDPOINT) throw new Error('checkout-not-configured');

  const response = await fetch(`${CHECKOUT_ENDPOINT}${path}`, {
    method,
    headers: {
      ...authHeaders(),
      ...(body != null ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });

  const type = response.headers.get('content-type') || '';
  const data = type.includes('application/json') ? await response.json().catch(() => ({})) : {};

  if (!response.ok) {
    const error = new Error(data?.message || `checkout-failed:${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/** Payment + checkout capabilities advertised by the backend. */
export function getCheckoutConfig() {
  return request('/config');
}

/**
 * Create an order. Payload: { items, customer, address, paymentMethod, couponCode }.
 * The backend ignores any client prices and recalculates the total.
 */
export function createOrder(payload) {
  return request('', { method: 'POST', body: payload });
}

/** Verify a Razorpay payment server-side (signature check). */
export function verifyPayment(payload) {
  return request('/razorpay/verify', { method: 'POST', body: payload });
}

/** Preview a coupon against an estimated subtotal (final total is recomputed). */
export function previewCoupon(code, subtotal) {
  return request('/coupon', { method: 'POST', body: { code, subtotal } });
}

/** The signed-in customer's own orders. */
export function getMyOrders() {
  return request('/orders');
}

/** A single order, only if the signed-in customer owns it. */
export function getOrder(id) {
  return request(`/orders/${encodeURIComponent(id)}`);
}

/* --------------------------- Razorpay ----------------------------- */

const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';
let scriptPromise = null;

/** Load the Razorpay Checkout script once, reusing the same promise. */
export function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve(true);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = RAZORPAY_SCRIPT;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => { scriptPromise = null; resolve(false); };
      document.body.appendChild(script);
    });
  }
  return scriptPromise;
}

/**
 * Open Razorpay Checkout with the order details returned by the backend.
 * Resolves with the payment response on success; rejects with a `cancelled`
 * or `failed` error otherwise.
 */
export async function openRazorpayCheckout(options) {
  const ready = await loadRazorpayScript();
  if (!ready || !window.Razorpay) throw new Error('razorpay-unavailable');

  return new Promise((resolve, reject) => {
    const instance = new window.Razorpay({
      key: options.keyId,
      amount: options.amount,
      currency: options.currency || 'INR',
      name: options.name,
      description: options.description,
      order_id: options.orderId,
      method: options.method, /* 'upi' | 'card' — preselects the payment tab */
      prefill: options.prefill || {},
      notes: options.notes || {},
      theme: { color: '#C6A16A' },
      retry: { enabled: true },
      handler: (response) => resolve(response),
      modal: {
        ondismiss: () => {
          const error = new Error('payment-cancelled');
          error.code = 'cancelled';
          reject(error);
        },
      },
    });

    instance.on('payment.failed', (response) => {
      const error = new Error(response?.error?.description || 'payment-failed');
      error.code = 'failed';
      reject(error);
    });

    instance.open();
  });
}
