import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Pencil,
  Check,
  X,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  Calendar,
  Heart,
  ShoppingCart,
  ShieldCheck,
} from 'lucide-react';
import { getCurrentUser, updateProfile, signOut } from '../services/auth';
import { useCart } from '../context/CartContext';
import PasswordReset from '../components/account/PasswordReset';

const inputClass =
  'h-11 w-full rounded-md border border-[#3a3a3a] bg-[#242424] px-4 text-[13px] text-[#f0eae5] placeholder-[#7c766f] outline-none transition-colors duration-200 focus:border-[#b99662] focus:ring-1 focus:ring-[#b99662]/40 disabled:cursor-not-allowed disabled:opacity-70';

const formatMemberSince = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

const initialsOf = (user) =>
  (user.name || user.email || '?')
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
      <dt className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.14em] text-[#8c867f]">
        <Icon size={14} strokeWidth={1.6} className="text-[#b99662]" />
        {label}
      </dt>
      <dd className="min-w-0 truncate text-right text-[13px] text-[#f0eae5]">{value}</dd>
    </div>
  );
}

function EditProfileForm({ user, onSaved, onCancel }) {
  const [values, setValues] = useState({ name: user.name || '', phone: user.phone || '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const update = (key) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'saving') return;

    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your full name.';
    if (values.phone.trim() && !/^\d{10}$/.test(values.phone.replace(/\s+/g, ''))) {
      next.phone = 'Enter a valid 10-digit phone number.';
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('saving');
    setFeedback('');
    try {
      const saved = await updateProfile({ name: values.name, phone: values.phone });
      setStatus('idle');
      onSaved(saved);
    } catch {
      setStatus('error');
      setFeedback('Could not save your details right now. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="border-t border-white/10 px-4 py-5 sm:px-5">
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="profile-name"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#c9c2bb]"
          >
            Full Name
          </label>
          <input
            id="profile-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            placeholder="Enter Your Full Name"
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
          />
          {errors.name ? <p className="mt-1.5 text-[11px] text-[#e0a08f]">{errors.name}</p> : null}
        </div>

        <div>
          <label
            htmlFor="profile-phone"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#c9c2bb]"
          >
            Phone Number
          </label>
          <input
            id="profile-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            placeholder="00000 00000"
            aria-invalid={Boolean(errors.phone)}
            className={inputClass}
          />
          {errors.phone ? <p className="mt-1.5 text-[11px] text-[#e0a08f]">{errors.phone}</p> : null}
        </div>

        {feedback ? (
          <p role="status" className="flex items-start gap-2 text-[12px] text-[#e0a08f]">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{feedback}</span>
          </p>
        ) : null}

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button
            type="submit"
            disabled={status === 'saving'}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#f0eae5] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#171515] transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b99662] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'saving' ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Saving
              </>
            ) : (
              <>
                <Check size={15} strokeWidth={1.8} />
                Save Changes
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={status === 'saving'}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#c9c2bb] transition-colors duration-300 hover:border-[#b99662] hover:text-[#b99662] disabled:opacity-60"
          >
            <X size={15} strokeWidth={1.8} />
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default function Profile() {
  const [user, setUser] = useState(getCurrentUser);
  const [editing, setEditing] = useState(false);
  const { wishlistCount, bagCount, openDrawer } = useCart();

  useEffect(() => {
    if (!user) window.location.hash = '#/login';
  }, [user]);

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    setUser(null);
  };

  const stats = [
    { label: 'Saved Pieces', value: wishlistCount, icon: Heart, onClick: () => openDrawer('wishlist') },
    { label: 'Bag Items', value: bagCount, icon: ShoppingCart, onClick: () => openDrawer('bag') },
  ];

  return (
    <main className="min-h-dvh bg-[#0d0d0d] pt-28 pb-20 sm:pt-32">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[720px]">
          {/* Header */}
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#b99662]/50 bg-[#1c1a18] font-serif text-[22px] text-[#d8b47e]">
              {initialsOf(user)}
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b99662]">
                My Account
              </p>
              <h1 className="mt-1.5 truncate font-serif text-[26px] font-normal leading-tight text-[#f0eae5] sm:text-[30px]">
                Hello{user.name ? `, ${user.name.split(/\s+/)[0]}` : ''}
              </h1>
              <p className="mt-1 truncate text-[12px] text-[#8c867f]">{user.email}</p>
            </div>
          </div>

          {/* Personal details */}
          <section className="mt-8 overflow-hidden rounded-md border border-white/10 bg-[#141312]">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
              <h2 className="font-serif text-[18px] text-[#f0eae5]">Personal Details</h2>
              {!editing ? (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#b99662] transition-colors hover:text-[#d8b47e]"
                >
                  <Pencil size={13} strokeWidth={1.7} />
                  Edit
                </button>
              ) : null}
            </div>

            <dl className="divide-y divide-white/10 border-t border-white/10">
              <DetailRow icon={Mail} label="Email" value={user.email} />
              <DetailRow icon={Phone} label="Phone" value={user.phone || 'Not provided'} />
              <DetailRow icon={Calendar} label="Member Since" value={formatMemberSince(user.createdAt)} />
            </dl>

            {editing ? (
              <EditProfileForm
                user={user}
                onSaved={(saved) => {
                  setUser(saved);
                  setEditing(false);
                }}
                onCancel={() => setEditing(false)}
              />
            ) : null}
          </section>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <button
                  key={stat.label}
                  type="button"
                  onClick={stat.onClick}
                  className="rounded-md border border-white/10 bg-[#171717] px-4 py-4 text-left transition-colors duration-300 hover:border-[#b99662]/60"
                >
                  <span className="flex items-center gap-2 text-[#d8b47e]">
                    <Icon size={16} strokeWidth={1.6} />
                    <span className="font-serif text-[24px] leading-none">{stat.value}</span>
                  </span>
                  <span className="mt-2 block text-[11px] uppercase tracking-[0.12em] text-[#8c867f]">
                    {stat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Password & security (includes forgot-password facility) */}
          <section className="mt-4 rounded-md border border-white/10 bg-[#141312] px-4 py-5 sm:px-5">
            <h2 className="flex items-center gap-2 font-serif text-[18px] text-[#f0eae5]">
              <ShieldCheck size={17} strokeWidth={1.6} className="text-[#b99662]" />
              Password &amp; Security
            </h2>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#a7a19b]">
              Forgot your password, or want to change it? Reset it here.
            </p>
            <div className="mt-5">
              <PasswordReset defaultEmail={user.email} />
            </div>
          </section>

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href="#/collections"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#f0eae5] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#171515] transition-colors duration-300 hover:bg-white"
            >
              Continue Shopping
              <ArrowRight size={14} strokeWidth={1.8} />
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-md border border-white/15 px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#c9c2bb] transition-colors duration-300 hover:border-[#b99662] hover:text-[#b99662]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
