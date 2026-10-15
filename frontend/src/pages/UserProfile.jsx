import { useEffect, useState } from 'react';
import { getCurrentUser, signOut, updateProfile, requestPasswordReset, resetPassword } from '../services/auth';
import { useCart } from '../context/CartContext';
import { ArrowRight, User, Mail, Phone, Calendar, Heart, ShoppingCart, ShieldCheck, Check, Eye, EyeOff } from 'lucide-react';

const inputCls = 'h-10 w-full rounded-md border border-[#3a3a3a] bg-[#242424] px-3 text-[13px] text-[#f0eae5] placeholder-[#7c766f] outline-none focus:border-[#b99662]';

export default function UserProfile() {
  const [user, setUser] = useState(getCurrentUser());
  const { wishlistCount, bagCount, openDrawer } = useCart();

  useEffect(() => {
    if (!user) window.location.hash = '#/login';
  }, [user]);

  if (!user) return null;

  return (
    <main className="min-h-dvh bg-[#0d0d0d] pt-28 pb-20 sm:pt-32">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[920px]">
          <Header user={user} onSignOut={() => { signOut(); setUser(null); }} />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <DetailsCard user={user} setUser={setUser} />
            <StatsCard wishlistCount={wishlistCount} bagCount={bagCount} openDrawer={openDrawer} />
            <SecurityCard user={user} />
            <ActionsCard />
          </div>
        </div>
      </div>
    </main>
  );
}

function Header({ user, onSignOut }) {
  const initials = (user.name || user.email || '?').split(/\s+/).map(p => p[0]).filter(Boolean).slice(0,2).join('').toUpperCase();
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#b99662]/50 bg-[#1c1a18] font-serif text-[22px] text-[#d8b47e]">{initials}</span>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#b99662]">My Profile</p>
          <h1 className="mt-1 font-serif text-[26px] text-[#f0eae5] sm:text-[30px]">Hello{user.name ? `, ${user.name.split(/\s+/)[0]}` : ''}</h1>
          <p className="mt-1 text-[12px] text-[#8c867f]">{user.email}</p>
        </div>
      </div>
      <button type="button" onClick={onSignOut} className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 px-6 text-[11px] uppercase tracking-[0.2em] text-[#c9c2bb] hover:border-[#b99662] hover:text-[#b99662]">Sign Out</button>
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#8c867f]"><Icon size={14} className="text-[#b99662]" />{label}</dt>
      <dd className="text-[13px] text-[#f0eae5] truncate max-w-[60%] text-right">{value}</dd>
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
      <div className="flex items-center justify-between px-5 py-4">
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
        <form onSubmit={save} className="border-t border-white/10 px-5 py-4">
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

function StatsCard({ wishlistCount, bagCount, openDrawer }) {
  return (
    <div className="rounded-md border border-white/10 bg-[#141312] p-5">
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
    </div>
  );
}

function SecurityCard({ user }) {
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState(user.email);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');
  const [demo, setDemo] = useState('');

  const request = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting'); setMsg('');
    try {
      const res = await requestPasswordReset({ email });
      setDemo(res?.code || '');
      setStep('reset'); setStatus('idle');
    } catch (err) {
      setStatus('error'); setMsg(err?.message || 'Failed');
    }
  };

  const reset = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    if (password.length < 8) { setMsg('Use at least 8 characters'); return; }
    if (password !== confirm) { setMsg('Passwords do not match'); return; }
    setStatus('submitting'); setMsg('');
    try {
      await resetPassword({ email, code, password });
      setStep('done'); setStatus('idle');
    } catch (err) {
      setStatus('error'); setMsg(err?.message || 'Failed');
    }
  };

  return (
    <div className="rounded-md border border-white/10 bg-[#141312] p-5">
      <h2 className="font-serif text-[18px] text-[#f0eae5] flex items-center gap-2"><ShieldCheck size={16} className="text-[#b99662]" />Reset / Set Password</h2>
      <p className="mt-1 text-[12px] text-[#a7a19b]">Reset your password using the email linked to your account.</p>
      {step === 'request' && (
        <form onSubmit={request} className="mt-4 flex flex-col gap-3">
          <Input label="Email" value={email} onChange={setEmail} type="email" />
          {msg && <p className="text-[11px] text-[#e0a08f]">{msg}</p>}
          <button type="submit" disabled={status === 'submitting'} className="h-10 rounded-md bg-[#f0eae5] text-[11px] uppercase tracking-[0.2em] text-[#171515] hover:bg-white disabled:opacity-60">Send Code</button>
        </form>
      )}
      {step === 'reset' && (
        <form onSubmit={reset} className="mt-4 flex flex-col gap-3">
          {demo && <div className="rounded-md border border-[#b99662]/40 bg-[#b99662]/10 px-3 py-2 text-[11px] text-[#d8b47e]">Demo code: <span className="font-mono tracking-widest text-[#f0eae5]">{demo}</span></div>}
          <Input label="Reset Code" value={code} onChange={setCode} />
          <PasswordInput label="New Password" value={password} onChange={setPassword} placeholder="At least 8 characters" />
          <PasswordInput label="Confirm Password" value={confirm} onChange={setConfirm} placeholder="Re-enter new password" />
          {msg && <p className="text-[11px] text-[#e0a08f]">{msg}</p>}
          <button type="submit" disabled={status === 'submitting'} className="h-10 rounded-md bg-[#f0eae5] text-[11px] uppercase tracking-[0.2em] text-[#171515] hover:bg-white disabled:opacity-60">Reset Password</button>
        </form>
      )}
      {step === 'done' && (
        <div className="mt-4 flex items-center gap-2 text-[13px] text-[#9fc6a2]"><Check size={16} />Password reset successfully</div>
      )}
    </div>
  );
}

function ActionsCard() {
  return (
    <div className="rounded-md border border-white/10 bg-[#141312] p-5 flex flex-col gap-3">
      <a href="#/collections" className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#f0eae5] text-[11px] uppercase tracking-[0.2em] text-[#171515] hover:bg-white">Continue Shopping <ArrowRight size={14} /></a>
    </div>
  );
}
