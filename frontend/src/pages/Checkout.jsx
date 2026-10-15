import { useEffect, useMemo, useRef, useState } from 'react';
import { ShieldCheck, Lock, Truck, Tag, ChevronLeft } from 'lucide-react';
import SmartImage from '../components/common/SmartImage';
import { useCart } from '../context/CartContext';
import { formatINR } from '../data/products';
import { getCurrentUser } from '../services/auth';
import {
  getCheckoutConfig,
  createOrder,
  verifyPayment,
  previewCoupon,
  openRazorpayCheckout,
} from '../services/checkout';

const DEFAULT_CONFIG = {
  currency: 'INR',
  codEnabled: true,
  razorpayEnabled: false,
  gstRate: 18,
  freeShippingThreshold: 50000,
  shippingFee: 300,
};

const inputCls =
  'h-11 w-full rounded-md border bg-[#1b1b1b] px-3.5 text-[13px] text-[#f0eae5] placeholder-[#6f6a64] outline-none transition-colors focus:border-[#C6A16A] disabled:opacity-60';

function Field({ label, htmlFor, error, optional, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.16em] text-[#a9a29b]">
        {label}
        {optional && <span className="normal-case tracking-normal text-[#6f6a64]">(optional)</span>}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-[11px] text-[#e0a08f]">{error}</p> : null}
    </div>
  );
}

function Section({ step, title, children }) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#141414] p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#C6A16A]/50 text-[11px] text-[#C6A16A]">
          {step}
        </span>
        <h2 className="font-serif text-[17px] text-[#f0eae5]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function Checkout() {
  const { bag, subtotal, clearBag } = useCart();
  const user = getCurrentUser();

  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [configReady, setConfigReady] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });
  const [errors, setErrors] = useState({});

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [coupon, setCoupon] = useState('');
  const [couponState, setCouponState] = useState({ loading: false, valid: false, discount: 0, message: '' });

  const [status, setStatus] = useState('idle'); /* idle | submitting | verifying */
  const [message, setMessage] = useState('');

  const doneRef = useRef(false);
  const razorpayRef = useRef(null); /* { orderId, razorpay } for retry without duplicate orders */

  /* Redirect to login (and back) when not authenticated. */
  useEffect(() => {
    if (!user) window.location.hash = '#/login?redirect=checkout';
  }, [user]);

  /* Nothing to buy — send them shopping. */
  useEffect(() => {
    if (bag.length === 0 && !doneRef.current) window.location.hash = '#/collections';
  }, [bag.length]);

  useEffect(() => {
    let active = true;
    getCheckoutConfig()
      .then((data) => { if (active && data) setConfig({ ...DEFAULT_CONFIG, ...data }); })
      .catch(() => {})
      .finally(() => { if (active) setConfigReady(true); });
    return () => { active = false; };
  }, []);

  const set = (key) => (event) => {
    const value = event?.target ? event.target.value : event;
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const totals = useMemo(() => {
    const discount = couponState.valid ? Math.min(couponState.discount, subtotal) : 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * (Number(config.gstRate) / 100));
    const shipping = subtotal >= Number(config.freeShippingThreshold) ? 0 : Number(config.shippingFee);
    return { discount, tax, shipping, total: taxable + tax + shipping };
  }, [subtotal, couponState, config]);

  const cartItems = useMemo(
    () => bag.map((line) => ({ id: line.id, qty: line.qty, size: line.size ?? null, metal: line.metal ?? null })),
    [bag],
  );

  const applyCoupon = async () => {
    const code = coupon.trim();
    if (!code) {
      setCouponState({ loading: false, valid: false, discount: 0, message: 'Enter a coupon code' });
      return;
    }
    setCouponState({ loading: true, valid: false, discount: 0, message: '' });
    try {
      const result = await previewCoupon(code, subtotal);
      setCouponState({
        loading: false,
        valid: Boolean(result.valid),
        discount: Number(result.discount || 0),
        message: result.valid ? 'Coupon applied' : result.message || 'This coupon is not valid',
      });
    } catch {
      setCouponState({ loading: false, valid: false, discount: 0, message: 'Could not check this coupon' });
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your full name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address';
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) next.phone = 'Enter a valid 10-digit mobile number';
    if (!form.line1.trim()) next.line1 = 'House / flat number and street is required';
    if (!form.city.trim()) next.city = 'City is required';
    if (!form.state.trim()) next.state = 'State is required';
    if (!/^\d{6}$/.test(form.pincode.trim())) next.pincode = 'Enter a valid 6-digit PIN code';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = async () => {
    if (status !== 'idle') return;
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (bag.length === 0) return;

    setMessage('');
    setStatus('submitting');
    const couponCode = couponState.valid ? coupon.trim() : undefined;
    const payload = {
      items: cartItems,
      customer: { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() },
      address: {
        line1: form.line1.trim(),
        line2: form.line2.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
        country: form.country.trim() || 'India',
      },
      paymentMethod,
      couponCode,
    };

    try {
      let orderId;
      let razorpay = null;

      if (paymentMethod === 'COD') {
        const result = await createOrder(payload);
        orderId = result.orderId;
      } else {
        /* Reuse an already-created Razorpay order on retry to avoid duplicates. */
        if (razorpayRef.current) {
          ({ orderId, razorpay } = razorpayRef.current);
        } else {
          const result = await createOrder(payload);
          orderId = result.orderId;
          razorpay = result.razorpay;
          razorpayRef.current = { orderId, razorpay };
        }

        setStatus('verifying');
        const response = await openRazorpayCheckout({
          keyId: razorpay.keyId,
          amount: razorpay.amount,
          currency: razorpay.currency,
          name: razorpay.name,
          description: razorpay.description,
          orderId: razorpay.orderId,
          prefill: razorpay.prefill,
          notes: { orderId },
        });

        await verifyPayment({
          orderId,
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });
      }

      doneRef.current = true;
      clearBag();
      window.location.hash = `#/order/${encodeURIComponent(orderId)}`;
    } catch (error) {
      setStatus('idle');
      if (error.code === 'cancelled') {
        setMessage('Payment was cancelled. Your order is saved — open “My Orders” to pay for it later.');
      } else if (error.code === 'failed') {
        setMessage(error.message || 'The payment failed. Please try again.');
      } else if (error.message === 'checkout-not-configured') {
        setMessage('Checkout is not connected yet. Please try again later.');
      } else {
        setMessage(error.message || 'We could not place your order. Please try again.');
      }
    }
  };

  if (!user) return null;

  const busy = status !== 'idle';
  const noPaymentOption = !config.codEnabled && !config.razorpayEnabled;

  return (
    <main className="min-h-dvh bg-[#0d0d0d] pb-20 pt-28 sm:pt-32">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <button
          type="button"
          onClick={() => { window.location.hash = '#/collections'; }}
          className="mb-6 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#8c867f] transition-colors hover:text-[#C6A16A]"
        >
          <ChevronLeft size={14} strokeWidth={1.6} />
          Continue shopping
        </button>

        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C6A16A]/50 text-[#C6A16A]">
            <Lock size={13} strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C6A16A]">SECURE CHECKOUT</p>
            <h1 className="mt-0.5 font-serif text-[26px] text-[#f0eae5] sm:text-[30px]">Complete Your Order</h1>
          </div>
        </div>

        {message ? (
          <div className="mb-6 rounded-md border border-[#e0a08f]/40 bg-[#e0a08f]/10 px-4 py-3 text-[12.5px] leading-relaxed text-[#f0c4b8]">
            {message}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ------------------------------ form ------------------------------ */}
          <div className="flex flex-col gap-5">
            <Section step="1" title="Contact Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="co-name" error={errors.name}>
                  <input id="co-name" className={`${inputCls} ${errors.name ? 'border-[#e0a08f]' : 'border-[#333]'}`} value={form.name} onChange={set('name')} placeholder="Your full name" autoComplete="name" />
                </Field>
                <Field label="Email Address" htmlFor="co-email" error={errors.email}>
                  <input id="co-email" type="email" className={`${inputCls} ${errors.email ? 'border-[#e0a08f]' : 'border-[#333]'}`} value={form.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" />
                </Field>
                <Field label="Mobile Number" htmlFor="co-phone" error={errors.phone}>
                  <div className={`flex h-11 overflow-hidden rounded-md border bg-[#1b1b1b] focus-within:border-[#C6A16A] ${errors.phone ? 'border-[#e0a08f]' : 'border-[#333]'}`}>
                    <span className="flex select-none items-center border-r border-[#333] px-3 text-[13px] text-[#bcb5af]">+91</span>
                    <input id="co-phone" type="tel" inputMode="numeric" className="h-full w-full bg-transparent px-3 text-[13px] text-[#f0eae5] placeholder-[#6f6a64] outline-none" value={form.phone} onChange={set('phone')} placeholder="10-digit number" autoComplete="tel" />
                  </div>
                </Field>
              </div>
            </Section>

            <Section step="2" title="Shipping Address">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="House / Flat No. & Street" htmlFor="co-line1" error={errors.line1}>
                    <input id="co-line1" className={`${inputCls} ${errors.line1 ? 'border-[#e0a08f]' : 'border-[#333]'}`} value={form.line1} onChange={set('line1')} placeholder="House / flat, building, street" autoComplete="address-line1" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Area / Locality" htmlFor="co-line2" optional>
                    <input id="co-line2" className={inputCls} value={form.line2} onChange={set('line2')} placeholder="Area, locality, landmark" autoComplete="address-line2" />
                  </Field>
                </div>
                <Field label="City" htmlFor="co-city" error={errors.city}>
                  <input id="co-city" className={`${inputCls} ${errors.city ? 'border-[#e0a08f]' : 'border-[#333]'}`} value={form.city} onChange={set('city')} placeholder="City" autoComplete="address-level2" />
                </Field>
                <Field label="State" htmlFor="co-state" error={errors.state}>
                  <input id="co-state" className={`${inputCls} ${errors.state ? 'border-[#e0a08f]' : 'border-[#333]'}`} value={form.state} onChange={set('state')} placeholder="State" autoComplete="address-level1" />
                </Field>
                <Field label="PIN Code" htmlFor="co-pincode" error={errors.pincode}>
                  <input id="co-pincode" inputMode="numeric" maxLength={6} className={`${inputCls} ${errors.pincode ? 'border-[#e0a08f]' : 'border-[#333]'}`} value={form.pincode} onChange={set('pincode')} placeholder="6-digit PIN code" autoComplete="postal-code" />
                </Field>
                <Field label="Country" htmlFor="co-country">
                  <input id="co-country" className={inputCls} value={form.country} onChange={set('country')} autoComplete="country-name" />
                </Field>
              </div>
            </Section>

            <Section step="3" title="Payment Method">
              {noPaymentOption ? (
                <p className="rounded-md border border-[#e0a08f]/40 bg-[#e0a08f]/10 px-4 py-3 text-[12.5px] text-[#f0c4b8]">
                  Payments are not configured. Please try again later or contact us for assistance.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {config.codEnabled && (
                    <label className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3.5 transition-colors ${paymentMethod === 'COD' ? 'border-[#C6A16A] bg-[#C6A16A]/5' : 'border-[#333] hover:border-white/25'}`}>
                      <input type="radio" name="payment" className="mt-1 accent-[#C6A16A]" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                      <span>
                        <span className="flex items-center gap-2 text-[13.5px] text-[#f0eae5]"><Truck size={15} className="text-[#C6A16A]" /> Cash on Delivery</span>
                        <span className="mt-1 block text-[11.5px] font-light text-[#8c867f]">Pay in cash when your order is delivered.</span>
                      </span>
                    </label>
                  )}
                  {config.razorpayEnabled && (
                    <label className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3.5 transition-colors ${paymentMethod === 'RAZORPAY' ? 'border-[#C6A16A] bg-[#C6A16A]/5' : 'border-[#333] hover:border-white/25'}`}>
                      <input type="radio" name="payment" className="mt-1 accent-[#C6A16A]" checked={paymentMethod === 'RAZORPAY'} onChange={() => setPaymentMethod('RAZORPAY')} />
                      <span>
                        <span className="flex items-center gap-2 text-[13.5px] text-[#f0eae5]"><ShieldCheck size={15} className="text-[#C6A16A]" /> Pay Online (Razorpay)</span>
                        <span className="mt-1 block text-[11.5px] font-light text-[#8c867f]">UPI, cards, net banking and wallets. Secured by Razorpay.</span>
                      </span>
                    </label>
                  )}
                </div>
              )}
            </Section>
          </div>

          {/* ---------------------------- summary ---------------------------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-white/10 bg-[#141414] p-5 sm:p-6">
              <h2 className="font-serif text-[17px] text-[#f0eae5]">Order Summary</h2>

              <ul className="mt-4 flex flex-col gap-4">
                {bag.map((line) => (
                  <li key={`${line.id}-${line.size ?? ''}-${line.metal ?? ''}`} className="flex gap-3">
                    <span className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[#333]">
                      <SmartImage src={line.image} alt={line.name} className="h-full w-full" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-[12.5px] text-[#f0eae5]">{line.name}</span>
                      {(line.metal || line.size) && (
                        <span className="mt-0.5 text-[10.5px] uppercase tracking-[0.1em] text-[#8c867f]">
                          {[line.metal, line.size ? `Size ${line.size}` : null].filter(Boolean).join(' · ')}
                        </span>
                      )}
                      <span className="mt-1 text-[11.5px] text-[#8c867f]">Qty {line.qty} × {formatINR(line.price)}</span>
                    </span>
                    <span className="shrink-0 text-[12.5px] tabular-nums text-[#f0eae5]">{formatINR(line.price * line.qty)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t border-white/10 pt-4">
                <label htmlFor="co-coupon" className="mb-1.5 flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.16em] text-[#a9a29b]">
                  <Tag size={12} className="text-[#C6A16A]" /> Coupon Code
                </label>
                <div className="flex gap-2">
                  <input id="co-coupon" className={inputCls} value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="Enter code" />
                  <button type="button" onClick={applyCoupon} disabled={couponState.loading} className="shrink-0 rounded-md border border-[#C6A16A]/50 px-4 text-[11px] uppercase tracking-[0.14em] text-[#C6A16A] transition-colors hover:bg-[#C6A16A] hover:text-[#0D0D0D] disabled:opacity-60">
                    {couponState.loading ? '…' : 'Apply'}
                  </button>
                </div>
                {couponState.message ? (
                  <p className={`mt-1.5 text-[11px] ${couponState.valid ? 'text-[#8fbf9a]' : 'text-[#e0a08f]'}`}>{couponState.message}</p>
                ) : null}
              </div>

              <dl className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-4 text-[12.5px]">
                <div className="flex items-center justify-between text-[#a9a29b]">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums text-[#f0eae5]">{formatINR(subtotal)}</dd>
                </div>
                {totals.discount > 0 && (
                  <div className="flex items-center justify-between text-[#8fbf9a]">
                    <dt>Discount</dt>
                    <dd className="tabular-nums">− {formatINR(totals.discount)}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between text-[#a9a29b]">
                  <dt>Shipping</dt>
                  <dd className="tabular-nums text-[#f0eae5]">{totals.shipping === 0 ? 'Free' : formatINR(totals.shipping)}</dd>
                </div>
                <div className="flex items-center justify-between text-[#a9a29b]">
                  <dt>GST ({config.gstRate}%)</dt>
                  <dd className="tabular-nums text-[#f0eae5]">{formatINR(totals.tax)}</dd>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3.5">
                  <dt className="text-[12px] uppercase tracking-[0.16em] text-[#a9a29b]">Total Payable</dt>
                  <dd className="font-serif text-[20px] tabular-nums text-[#f0eae5]">{formatINR(totals.total)}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={placeOrder}
                disabled={busy || noPaymentOption || !configReady}
                className="mt-5 w-full rounded-full bg-[#C6A16A] py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0D0D0D] transition-colors hover:bg-[#d8b47e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? 'Placing order…' : status === 'verifying' ? 'Verifying payment…' : paymentMethod === 'COD' ? 'Place Order (COD)' : `Pay ${formatINR(totals.total)}`}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-[#6f6a64]">
                <Lock size={11} /> Your details are encrypted and secure.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
