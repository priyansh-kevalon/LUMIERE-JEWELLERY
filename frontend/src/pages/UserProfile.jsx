import { useEffect, useState } from 'react';
import { getCurrentUser, signOut, updateProfile, changePassword } from '../services/auth';
import { getMyOrders } from '../services/checkout';
import { useCart } from '../context/CartContext';
import SmartImage from '../components/common/SmartImage';
import { formatINR } from '../data/products';
import { ArrowLeft, ArrowRight, User, Mail, Phone, Calendar, Heart, ShoppingCart, ShieldCheck, Check, Eye, EyeOff, Package } from 'lucide-react';

const inputCls = 'h-10 w-full rounded-md border border-[#3a3a3a] bg-[#242424] px-3 text-[13px] text-[#f0eae5] placeholder-[#7c766f] outline-none focus:border-[#b99662]';

export default function UserProfile() {
  const [user, setUser] = useState(getCurrentUser());
  const { wishlistCount, bagCount, openDrawer } = useCart();

  useEffect(() => {
    if (!user) window.location.hash = '#/login';
  }, [user]);

  if (!user) return null;

  return (
    <main className="min-h-dvh bg-[#0d0d0d] pb-20 pt-24 sm:pt-32">
      <div className="mx-auto w-full max-w-[88rem] px-4 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[920px]">
          <a href="#/collections" className="group mb-6 inline-flex items-center gap-1.5 text-[11px] font-light uppercase tracking-[0.18em] text-[#8c867f] transition-colors duration-200 hover:text-[#b99662]">
            <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-0.5" /> Continue Shopping
          </a>
          <Header user={user} onSignOut={() => { signOut(); setUser(null); }} />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            <DetailsCard user={user} setUser={setUser} />
            <SecurityCard />
            <ActivityCard wishlistCount={wishlistCount} bagCount={bagCount} openDrawer={openDrawer} />
          </div>
        </div>
      </div>
    </main>
  );
}

function Header({ user, onSignOut }) {
  const initials = (user.name || user.email || '?').split(/\s+/).map(p => p[0]).filter(Boolean).slice(0,2).join('').toUpperCase();
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-full border border-[#b99662]/50 bg-[#1c1a18] font-serif text-[20px] text-[#d8b47e] sm:h-16 sm:w-16 sm:text-[22px]">{initials}</span>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#b99662]">My Profile</p>
          <h1 className="mt-1 break-words font-serif text-[22px] leading-tight text-[#f0eae5] sm:text-[30px]">Hello{user.name ? `, ${user.name.split(/\s+/)[0]}` : ''}</h1>
          <p className="mt-1 truncate text-[12px] text-[#8c867f]">{user.email}</p>
        </div>
      </div>
      <button type="button" onClick={onSignOut} className="inline-flex h-11 w-full items-center justify-center rounded-md border border-white/15 px-6 text-[11px] uppercase tracking-[0.2em] text-[#c9c2bb] hover:border-[#b99662] hover:text-[#b99662] sm:w-auto">Sign Out</button>
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
      <dt className="flex min-w-0 items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#8c867f]"><Icon size={14} className="shrink-0 text-[#b99662]" />{label}</dt>
      <dd className="min-w-0 max-w-[58%] truncate text-right text-[13px] text-[#f0eae5] sm:max-w-[60%]">{value}</dd>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-[#c9c2bb]">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />
    </div>
  );
}

function PasswordInput({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-[#c9c2bb]">{label}</label>
      <div className="relative">
        <input type={show ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${inputCls} pr-10`} />
        <button type="button" onClick={() => setShow(v => !v)} className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-[#8c867f] hover:text-[#e0d9d2]">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

function DetailsCard({ user, setUser }) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({ name: user.name || '', phone: user.phone || '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const member = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

  const save = async (e) => {
    e.preventDefault();
    if (status === 'saving') return;
    setStatus('saving'); setError('');
    try {
      const saved = await updateProfile({ name: values.name, phone: values.phone });
      setUser(saved); setEditing(false); setStatus('idle');
    } catch (err) {
      setStatus('error'); setError(err?.message || 'Could not save');
    }
  };

  return (
    <div className="rounded-md border border-white/10 bg-[#141312]">
      <div className="flex items-center justify-between px-4 py-4 sm:px-5">
        <h2 className="font-serif text-[18px] text-[#f0eae5]">User Details</h2>
        {!editing && <button type="button" onClick={() => setEditing(true)} className="text-[11px] uppercase tracking-[0.14em] text-[#b99662] hover:text-[#d8b47e]">Edit</button>}
      </div>
      <dl className="divide-y divide-white/10 border-t border-white/10">
        <Row icon={User} label="Full Name" value={user.name || '—'} />
        <Row icon={Mail} label="Email" value={user.email} />
        <Row icon={Phone} label="Phone" value={user.phone || 'Not provided'} />
        <Row icon={Calendar} label="Member Since" value={member} />
      </dl>
      {editing && (
        <form onSubmit={save} className="border-t border-white/10 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3">
            <Input label="Full Name" value={values.name} onChange={(v) => setValues(s => ({ ...s, name: v }))} />
            <Input label="Phone Number" value={values.phone} onChange={(v) => setValues(s => ({ ...s, phone: v }))} placeholder="00000 00000" />
            {error && <p className="text-[11px] text-[#e0a08f]">{error}</p>}
            <div className="flex gap-2">
              <button type="submit" disabled={status === 'saving'} className="h-10 flex-1 rounded-md bg-[#f0eae5] text-[11px] uppercase tracking-[0.2em] text-[#171515] hover:bg-white disabled:opacity-60">{status === 'saving' ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => { setEditing(false); setValues({ name: user.name || '', phone: user.phone || '' }); setError(''); }} className="h-10 px-4 rounded-md border border-white/15 text-[11px] uppercase tracking-[0.2em] text-[#c9c2bb] hover:border-[#b99662]">Cancel</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

function ActivityCard({ wishlistCount, bagCount, openDrawer }) {
  return (
    <div className="rounded-md border border-white/10 bg-[#141312] p-4 sm:p-5 md:col-span-2">
      <h2 className="font-serif text-[18px] text-[#f0eae5] mb-4">Activity</h2>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => openDrawer('wishlist')} className="rounded-md border border-white/10 bg-[#171717] p-4 text-left hover:border-[#b99662]/60">
          <div className="flex items-center gap-2 text-[#d8b47e]"><Heart size={16} /><span className="font-serif text-[22px]">{wishlistCount}</span></div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#8c867f]">Saved</div>
        </button>
        <button type="button" onClick={() => openDrawer('bag')} className="rounded-md border border-white/10 bg-[#171717] p-4 text-left hover:border-[#b99662]/60">
          <div className="flex items-center gap-2 text-[#d8b47e]"><ShoppingCart size={16} /><span className="font-serif text-[22px]">{bagCount}</span></div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#8c867f]">Bag</div>
        </button>
      </div>
      <OrderDetails />
    </div>
  );
}

function SecurityCard() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setMsg('');
    if (password.length < 8) { setStatus('error'); setMsg('Use at least 8 characters'); return; }
    if (password !== confirm) { setStatus('error'); setMsg('Passwords do not match'); return; }
    setStatus('submitting');
    try {
      await changePassword({ password });
      setStatus('idle'); setPassword(''); setConfirm(''); setDone(true);
    } catch (err) {
      setStatus('error'); setMsg(err?.message || 'Failed to update password');
    }
  };

  return (
    <div className="rounded-md border border-white/10 bg-[#141312] p-4 sm:p-5">
      <h2 className="font-serif text-[18px] text-[#f0eae5] flex items-center gap-2"><ShieldCheck size={16} className="text-[#b99662]" />Change Password</h2>
      <p className="mt-1 text-[12px] text-[#a7a19b]">Set a new password for your account.</p>
      {done ? (
        <div className="mt-4 flex items-center gap-2 text-[13px] text-[#9fc6a2]"><Check size={16} />Password changed successfully</div>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <PasswordInput label="New Password" value={password} onChange={setPassword} placeholder="At least 8 characters" />
          <PasswordInput label="Confirm Password" value={confirm} onChange={setConfirm} placeholder="Re-enter new password" />
          {msg && <p className="text-[11px] text-[#e0a08f]">{msg}</p>}
          <button type="submit" disabled={status === 'submitting'} className="h-10 rounded-md bg-[#f0eae5] text-[11px] uppercase tracking-[0.2em] text-[#171515] hover:bg-white disabled:opacity-60">{status === 'submitting' ? 'Updating…' : 'Update Password'}</button>
        </form>
      )}
    </div>
  );
}

const orderStatusClass = (status) => ({
  pending: 'border-[#C6A16A]/40 bg-[#C6A16A]/10 text-[#e2c694]',
  confirmed: 'border-[#5b8fc4]/40 bg-[#5b8fc4]/10 text-[#9fc4e8]',
  processing: 'border-[#5b8fc4]/40 bg-[#5b8fc4]/10 text-[#9fc4e8]',
  shipped: 'border-[#5b8fc4]/40 bg-[#5b8fc4]/10 text-[#9fc4e8]',
  delivered: 'border-[#5f9e6e]/40 bg-[#5f9e6e]/10 text-[#8fbf9a]',
  cancelled: 'border-[#c4705b]/40 bg-[#c4705b]/10 text-[#e0a08f]',
}[status] || 'border-white/15 text-[#c9c2bb]');

const orderMethodLabel = (method) => ({
  COD: 'Cash on Delivery',
  UPI: 'UPI',
  CARD: 'Debit / Credit Card',
  RAZORPAY: 'Online Payment',
}[method] || method || 'Online');

const orderDate = (value) => {
  const date = new Date(Number(value) || value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

function OrderDetails() {
  const [state, setState] = useState('loading');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let active = true;
    getMyOrders()
      .then((data) => { if (active) { setOrders(Array.isArray(data) ? data : []); setState('ready'); } })
      .catch(() => { if (active) setState('error'); });
    return () => { active = false; };
  }, []);

  const recent = orders.slice(0, 3);

  return (
    <div className="mt-5 border-t border-white/10 pt-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-serif text-[16px] text-[#f0eae5]">
          <Package size={15} className="text-[#b99662]" />Order Details
        </h3>
        {orders.length > 0 && (
          <a href="#/orders" className="text-[11px] uppercase tracking-[0.14em] text-[#b99662] hover:text-[#d8b47e]">View All</a>
        )}
      </div>

      {state === 'loading' ? (
        <p className="py-4 text-[12px] uppercase tracking-[0.16em] text-[#8c867f]">Loading your orders…</p>
      ) : state === 'error' ? (
        <p className="py-4 text-[12.5px] font-light text-[#8c867f]">Order details are unavailable right now.</p>
      ) : orders.length === 0 ? (
        <div className="py-5 text-center">
          <p className="text-[13px] text-[#c9c2bb]">You haven’t placed any orders yet.</p>
          <a href="#/collections" className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#b99662] px-6 text-[11px] uppercase tracking-[0.16em] text-[#171412] hover:bg-[#d8b47e]">Start Shopping <ArrowRight size={13} /></a>
        </div>
      ) : (
        <ul className="mt-2 flex flex-col divide-y divide-white/10">
          {recent.map((order) => (
            <li key={order.id} className="py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <a href={`#/order/${encodeURIComponent(order.id)}`} className="font-serif text-[15.5px] text-[#f0eae5] hover:text-[#d8b47e]">{order.id}</a>
                  <p className="mt-0.5 text-[11px] text-[#8c867f]">
                    {orderDate(order.createdAt)} · {(order.items || []).length} item{(order.items || []).length === 1 ? '' : 's'} · {orderMethodLabel(order.paymentMethod)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] ${orderStatusClass(order.status)}`}>{order.status}</span>
                  <span className="font-serif text-[16px] tabular-nums text-[#f0eae5]">{formatINR(order.total)}</span>
                </div>
              </div>

              <ul className="mt-3 flex flex-col gap-2">
                {(order.items || []).map((item, index) => (
                  <li key={`${item.id}-${item.size ?? ''}-${item.metal ?? ''}-${index}`} className="flex items-center gap-3">
                    <span className="h-10 w-10 shrink-0 overflow-hidden rounded bg-[#333]">
                      <SmartImage src={item.image} alt={item.name} className="h-full w-full" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12.5px] text-[#e6e0da]">
                      {item.name}
                      {(item.metal || item.size) ? <span className="text-[#8c867f]"> · {[item.metal, item.size ? `Size ${item.size}` : null].filter(Boolean).join(' · ')}</span> : null}
                    </span>
                    <span className="shrink-0 text-[11.5px] text-[#8c867f]">×{item.qty}</span>
                    <span className="shrink-0 text-right text-[12px] tabular-nums text-[#f0eae5]">{formatINR(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-between">
                {order.discount > 0 ? (
                  <span className="text-[11px] text-[#8fbf9a]">Discount − {formatINR(order.discount)}{order.couponCode ? ` (${order.couponCode})` : ''}</span>
                ) : <span />}
                <a href={`#/order/${encodeURIComponent(order.id)}`} className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-[#b99662] hover:text-[#d8b47e]">View Details <ArrowRight size={12} /></a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
