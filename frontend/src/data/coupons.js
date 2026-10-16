/* ------------------------------------------------------------------ */
/* Coupon helpers                                                      */
/*                                                                     */
/* Shared, side-effect-free maths for the storefront coupon section.   */
/* The backend always re-validates and re-prices on order creation, so */
/* these are only for display and instant feedback in the cart drawer. */
/* ------------------------------------------------------------------ */

import { formatINR } from './products';

/** Human label for the discount a coupon gives, e.g. "10% OFF" or "₹5,000 OFF". */
export function couponValueLabel(coupon) {
  if (!coupon) return '';
  const value = Number(coupon.value) || 0;
  return coupon.type === 'fixed' ? `${formatINR(value)} OFF` : `${value}% OFF`;
}

/** Whether the cart subtotal meets the coupon's minimum order value. */
export function couponMinMet(coupon, subtotal) {
  if (!coupon) return false;
  return Number(subtotal || 0) >= Number(coupon.minOrder || 0);
}

/** Discount amount this coupon would apply to the given subtotal (0 if ineligible). */
export function couponDiscount(coupon, subtotal) {
  if (!coupon || coupon.active === false) return 0;
  const sub = Number(subtotal) || 0;
  if (!couponMinMet(coupon, sub)) return 0;
  const value = Number(coupon.value) || 0;
  const raw = coupon.type === 'fixed' ? value : Math.round((sub * value) / 100);
  return Math.min(Math.max(0, raw), sub);
}

/** Coupons a shopper may actually apply (active, not exhausted). */
export function activeCoupons(coupons) {
  return (Array.isArray(coupons) ? coupons : []).filter(
    (coupon) =>
      coupon &&
      coupon.active !== false &&
      (coupon.usageLimit == null || Number(coupon.used || 0) < Number(coupon.usageLimit)),
  );
}
