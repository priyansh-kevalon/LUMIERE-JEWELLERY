import { useEffect, useState } from 'react';
import { ShieldCheck, Package } from 'lucide-react';
import SmartImage from '../components/common/SmartImage';
import { formatINR } from '../data/products';
import { getCurrentUser } from '../services/auth';
import { getOrder } from '../services/checkout';

const paymentLabel = (status) => ({
  paid: 'Paid',
  pending: 'Pending',
  failed: 'Failed',
  refunded: 'Refunded',
}[status] || status || 'Pending');

const methodLabel = (method) => ({
  COD: 'Cash on Delivery',
  RAZORPAY: 'Online Payment (Razorpay)',
}[method] || method || '—');

const formatDate = (value) => {
  const date = new Date(Number(value) || value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function OrderConfirmation({ orderId }) {
  const user = getCurrentUser();
  const [state, setState] = useState('loading'); /* loading | ready | notfound | error */
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!user) {
      window.location.hash = `#/login?redirect=${encodeURIComponent(`order/${orderId}`)}`;
    }
  }, [user, orderId]);

  useEffect(() => {
    if (!user || !orderId) return undefined;
    let active = true;
    setState('loading');
    getOrder(orderId)
      .then((data) => { if (active) { setOrder(data); setState('ready'); } })
      .catch((error) => { if (active) setState(error?.status === 404 ? 'notfound' : 'error'); });
    return () => { active = false; };
  }, [user, orderId]);

  if (!user) return null;

  if (state === 'loading') {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#0d0d0d] pt-24">
        <p className="text-[12px] uppercase tracking-[0.24em] text-[#8c867f]">Loading your order…</p>
      </main>
    );
  }

  if (state === 'notfound' || state === 'error') {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#0d0d0d] px-6 pt-24">
        <div className="max-w-md text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/15 text-[#C6A16A]">
            <Package size={26} strokeWidth={1.3} />
          </span>
          <h1 className="mt-5 font-serif text-[24px] text-[#f0eae5]">
            {state === 'notfound' ? 'Order not found' : 'Something went wrong'}
          </h1>
          <p className="mt-2 text-[13px] font-light leading-relaxed text-[#9d968f]">
            {state === 'notfound'
              ? 'We could not find this order, or it does not belong to your account.'
              : 'We could not load your order right now. Please try again.'}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#/orders" className="inline-flex h-11 items-center justify-center rounded-full border border-[#C6A16A]/50 px-6 text-[11px] uppercase tracking-[0.18em] text-[#C6A16A] transition-colors hover:bg-[#C6A16A] hover:text-[#0D0D0D]">My Orders</a>
            <a href="#/collections" className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-6 text-[11px] uppercase tracking-[0.18em] text-[#c9c2bb] transition-colors hover:border-[#C6A16A] hover:text-[#C6A16A]">Continue Shopping</a>
          </div>
        </div>
      </main>
    );
  }

  const success = order.payment !== 'failed';
  const statusTone = statusClass(order.status);

  return (
    <main className="min-h-dvh bg-[#0d0d0d] pb-20 pt-28 sm:pt-32">
      <div className="mx-auto w-full max-w-[880px] px-6 sm:px-10">
        <div className="text-center">
          <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border ${success ? 'border-[#5f9e6e]/50 text-[#8fbf9a]' : 'border-[#c4705b]/50 text-[#e0a08f]'}`}>
            {success ? <ShieldCheck size={28} strokeWidth={1.3} /> : <Package size={28} strokeWidth={1.3} />}
          </span>
          <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-[#C6A16A]">
            {success ? 'Order Confirmed' : 'Payment Incomplete'}
          </p>
          <h1 className="mt-2 font-serif text-[28px] text-[#f0eae5] sm:text-[32px]">
            {success ? 'Thank You for Your Order' : 'Your Order Was Created'}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[13px] font-light leading-relaxed text-[#9d968f]">
            {success
              ? 'We have received your order and will send updates as it is prepared and shipped.'
              : 'Your order is saved, but the payment was not completed. You can retry the payment from your orders.'}
          </p>
          <p className="mt-4 text-[12.5px] text-[#c9c2bb]">
            Order <span className="text-[#f0eae5]">{order.id}</span> · {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-[#141414] p-5">
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-[#8c867f]">Order Status</p>
            <span className={`mt-2 inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.12em] ${statusTone}`}>
              {order.status}
            </span>
            <p className="mt-4 text-[10.5px] uppercase tracking-[0.16em] text-[#8c867f]">Payment</p>
            <p className="mt-1.5 text-[13px] text-[#f0eae5]">{methodLabel(order.paymentMethod)} · <span className={order.payment === 'paid' ? 'text-[#8fbf9a]' : 'text-[#e0c99a]'}>{paymentLabel(order.payment)}</span></p>
            {order.tracking ? (
              <p className="mt-3 text-[12px] text-[#9d968f]">Tracking: <span className="text-[#f0eae5]">{order.tracking}</span></p>
            ) : null}
          </div>

          <div className="rounded-lg border border-white/10 bg-[#141414] p-5">
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-[#8c867f]">Shipping Address</p>
            <address className="mt-2 not-italic text-[13px] leading-relaxed text-[#d8d2cc]">
              {order.customer?.name ? <span className="block text-[#f0eae5]">{order.customer.name}</span> : null}
              {[order.address?.line1, order.address?.line2, order.address?.city, order.address?.state, order.address?.pincode, order.address?.country].filter(Boolean).map((part) => (
                <span key={part} className="block">{part}</span>
              ))}
              {order.customer?.phone ? <span className="mt-1 block text-[#9d968f]">{order.customer.phone}</span> : null}
            </address>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-white/10 bg-[#141414] p-5 sm:p-6">
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-[#8c867f]">Items</p>
          <ul className="mt-4 flex flex-col gap-4">
            {(order.items || []).map((item, index) => (
              <li key={`${item.id}-${item.size ?? ''}-${item.metal ?? ''}-${index}`} className="flex gap-3">
                <span className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[#333]">
                  <SmartImage src={item.image} alt={item.name} className="h-full w-full" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[13px] text-[#f0eae5]">{item.name}</span>
                  {(item.metal || item.size) && (
                    <span className="mt-0.5 text-[10.5px] uppercase tracking-[0.1em] text-[#8c867f]">
                      {[item.metal, item.size ? `Size ${item.size}` : null].filter(Boolean).join(' · ')}
                    </span>
                  )}
                  <span className="mt-1 text-[11.5px] text-[#8c867f]">Qty {item.qty} × {formatINR(item.price)}</span>
                </span>
                <span className="shrink-0 text-[12.5px] tabular-nums text-[#f0eae5]">{formatINR(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-4 text-[12.5px]">
            <Row label="Subtotal" value={formatINR(order.subtotal)} />
            {order.discount > 0 && <Row label={`Discount${order.couponCode ? ` (${order.couponCode})` : ''}`} value={`− ${formatINR(order.discount)}`} accent />}
            <Row label="Shipping" value={order.shipping === 0 ? 'Free' : formatINR(order.shipping)} />
            {order.tax > 0 && <Row label="Tax" value={formatINR(order.tax)} />}
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3.5">
              <dt className="text-[12px] uppercase tracking-[0.16em] text-[#a9a29b]">Total</dt>
              <dd className="font-serif text-[20px] tabular-nums text-[#f0eae5]">{formatINR(order.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#/collections" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C6A16A] px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0D0D0D] transition-colors hover:bg-[#d8b47e]">
            Continue Shopping
          </a>
          <a href="#/orders" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-7 text-[11px] uppercase tracking-[0.18em] text-[#c9c2bb] transition-colors hover:border-[#C6A16A] hover:text-[#C6A16A]">
            View My Orders
          </a>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value, accent }) {
  return (
    <div className={`flex items-center justify-between ${accent ? 'text-[#8fbf9a]' : 'text-[#a9a29b]'}`}>
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}

function statusClass(status) {
  return ({
    pending: 'border-[#C6A16A]/40 bg-[#C6A16A]/10 text-[#e2c694]',
    confirmed: 'border-[#5b8fc4]/40 bg-[#5b8fc4]/10 text-[#9fc4e8]',
    processing: 'border-[#5b8fc4]/40 bg-[#5b8fc4]/10 text-[#9fc4e8]',
    shipped: 'border-[#5b8fc4]/40 bg-[#5b8fc4]/10 text-[#9fc4e8]',
    delivered: 'border-[#5f9e6e]/40 bg-[#5f9e6e]/10 text-[#8fbf9a]',
    cancelled: 'border-[#c4705b]/40 bg-[#c4705b]/10 text-[#e0a08f]',
  }[status] || 'border-white/15 text-[#c9c2bb]');
}
