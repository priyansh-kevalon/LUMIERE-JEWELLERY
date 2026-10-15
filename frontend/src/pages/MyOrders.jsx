import { useEffect, useState } from 'react';
import { PackageOpen } from 'lucide-react';
import { formatINR } from '../data/products';
import { getCurrentUser } from '../services/auth';
import { getMyOrders } from '../services/checkout';

const statusClass = (status) => ({
  pending: 'border-[#C6A16A]/40 bg-[#C6A16A]/10 text-[#e2c694]',
  confirmed: 'border-[#5b8fc4]/40 bg-[#5b8fc4]/10 text-[#9fc4e8]',
  processing: 'border-[#5b8fc4]/40 bg-[#5b8fc4]/10 text-[#9fc4e8]',
  shipped: 'border-[#5b8fc4]/40 bg-[#5b8fc4]/10 text-[#9fc4e8]',
  delivered: 'border-[#5f9e6e]/40 bg-[#5f9e6e]/10 text-[#8fbf9a]',
  cancelled: 'border-[#c4705b]/40 bg-[#c4705b]/10 text-[#e0a08f]',
}[status] || 'border-white/15 text-[#c9c2bb]');

const formatDate = (value) => {
  const date = new Date(Number(value) || value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function MyOrders() {
  const user = getCurrentUser();
  const [state, setState] = useState('loading');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) window.location.hash = '#/login?redirect=orders';
  }, [user]);

  useEffect(() => {
    if (!user) return undefined;
    let active = true;
    getMyOrders()
      .then((data) => { if (active) { setOrders(Array.isArray(data) ? data : []); setState('ready'); } })
      .catch(() => { if (active) setState('error'); });
    return () => { active = false; };
  }, [user]);

  if (!user) return null;

  return (
    <main className="min-h-dvh bg-[#0d0d0d] pb-20 pt-28 sm:pt-32">
      <div className="mx-auto w-full max-w-[880px] px-6 sm:px-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C6A16A]">My Account</p>
        <h1 className="mt-1.5 font-serif text-[28px] text-[#f0eae5] sm:text-[32px]">My Orders</h1>

        {state === 'loading' ? (
          <p className="mt-10 text-[12px] uppercase tracking-[0.2em] text-[#8c867f]">Loading your orders…</p>
        ) : state === 'error' ? (
          <p className="mt-10 text-[13px] font-light text-[#e0a08f]">We could not load your orders right now. Please refresh to try again.</p>
        ) : orders.length === 0 ? (
          <div className="mt-12 flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 text-[#C6A16A]">
              <PackageOpen size={26} strokeWidth={1.3} />
            </span>
            <p className="mt-5 font-serif text-[20px] text-[#f0eae5]">No orders yet</p>
            <p className="mt-2 max-w-sm text-[13px] font-light leading-relaxed text-[#9d968f]">
              When you place an order it will appear here, along with its status and payment details.
            </p>
            <a href="#/collections" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#C6A16A] px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0D0D0D] transition-colors hover:bg-[#d8b47e]">
              Continue Shopping
            </a>
          </div>
        ) : (
          <ul className="mt-8 flex flex-col gap-4">
            {orders.map((order) => (
              <li key={order.id} className="rounded-lg border border-white/10 bg-[#141414] p-5 transition-colors hover:border-[#C6A16A]/40">
                <a href={`#/order/${encodeURIComponent(order.id)}`} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-serif text-[17px] text-[#f0eae5]">{order.id}</p>
                    <p className="mt-1 text-[11.5px] text-[#8c867f]">
                      {formatDate(order.createdAt)} · {(order.items || []).length} item{(order.items || []).length === 1 ? '' : 's'} · {({ COD: 'Cash on Delivery', UPI: 'UPI', CARD: 'Debit / Credit Card' }[order.paymentMethod] || 'Online')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`rounded-full border px-3 py-1 text-[10.5px] uppercase tracking-[0.12em] ${statusClass(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="font-serif text-[18px] tabular-nums text-[#f0eae5]">{formatINR(order.total)}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
