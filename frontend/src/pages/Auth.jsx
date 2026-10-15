import { useEffect, useState } from 'react';
import { Eye, EyeOff, ArrowRight, Check, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { signIn, register, signOut, getCurrentUser, isLocalAuth } from '../services/auth';

const inputClass =
  'h-10 w-full rounded-md border border-[#3a3a3a] bg-[#242424] px-4 text-[13px] text-[#f0eae5] placeholder-[#7c766f] outline-none transition-colors duration-200 focus:border-[#b99662] focus:ring-1 focus:ring-[#b99662]/40';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ id, label, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#c9c2bb]"
      >
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-[11px] text-[#e0a08f]">{error}</p> : null}
    </div>
  );
}

function PasswordField({ id, label, value, onChange, placeholder, error, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <Field id={id} label={label} error={error}>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={`${inputClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#8c867f] transition-colors duration-200 hover:text-[#e0d9d2] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#b99662]"
        >
          {show ? <EyeOff size={16} strokeWidth={1.6} /> : <Eye size={16} strokeWidth={1.6} />}
        </button>
      </div>
    </Field>
  );
}

function Feedback({ status, message }) {
  if (!message) return null;
  const success = status === 'success';
  return (
    <p
      role="status"
      className={`mt-4 flex items-start gap-2 text-[12px] leading-relaxed ${
        success ? 'text-[#9fc6a2]' : 'text-[#e0a08f]'
      }`}
    >
      {success ? (
        <Check size={15} className="mt-0.5 shrink-0" />
      ) : (
        <AlertCircle size={15} className="mt-0.5 shrink-0" />
      )}
      <span>{message}</span>
    </p>
  );
}

function SubmitButton({ status, label }) {
  return (
    <button
      type="submit"
      disabled={status === 'submitting'}
      className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#f0eae5] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#171515] transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b99662] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {status === 'submitting' ? (
        <>
          <Loader2 size={15} className="animate-spin" />
          Please wait
        </>
      ) : (
        <>
          {label}
          <ArrowRight size={14} strokeWidth={1.8} />
        </>
      )}
    </button>
  );
}

function LoginForm({ onAuthenticated }) {
  const [values, setValues] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const update = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  };

  const validate = () => {
    const next = {};
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (!values.password) next.password = 'Please enter your password.';
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      setFeedback('');
      return;
    }

    setStatus('submitting');
    setFeedback('');
    try {
      const user = await signIn(values);
      setStatus('success');
      setFeedback(`Welcome back${user.name ? `, ${user.name}` : ''}.`);
      onAuthenticated(user);
    } catch {
      setStatus('error');
      setFeedback('Incorrect email or password. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-2.5">
        <Field id="login-email" label="Email Address" error={errors.email}>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            placeholder="abc@gmail.com"
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
          />
        </Field>

        <PasswordField
          id="login-password"
          label="Password"
          value={values.password}
          onChange={update('password')}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#c9c2bb]">
            <input
              type="checkbox"
              checked={values.remember}
              onChange={update('remember')}
              className="h-3.5 w-3.5 accent-[#b99662]"
            />
            Remember me
          </label>
          <a
            href="#/forgot-password"
            className="text-[12px] text-[#b99662] transition-colors hover:text-[#d8b47e]"
          >
            Forgot password?
          </a>
        </div>

        <SubmitButton status={status} label="Sign In" />
        <Feedback status={status} message={feedback} />
      </div>
    </form>
  );
}

function RegisterForm({ onAuthenticated }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const update = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your full name.';
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (values.phone.trim() && !/^\d{10}$/.test(values.phone.replace(/\s+/g, ''))) {
      next.phone = 'Enter a valid 10-digit phone number.';
    }
    if (values.password.length < 8) {
      next.password = 'Use at least 8 characters.';
    } else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password)) {
      next.password = 'Include at least one letter and one number.';
    }
    if (values.confirm !== values.password) next.confirm = 'Passwords do not match.';
    if (!values.terms) next.terms = 'Please accept the terms to continue.';
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      setFeedback('');
      return;
    }

    setStatus('submitting');
    setFeedback('');
    try {
      const user = await register({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      setStatus('success');
      setFeedback('Your account is ready. Welcome to Lumière.');
      onAuthenticated(user);
    } catch (error) {
      setStatus('error');
      setFeedback(
        error.message === 'email-in-use'
          ? 'An account with this email already exists. Try signing in instead.'
          : 'We could not create your account right now. Please try again.',
      );
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-2.5">
        <Field id="register-name" label="Full Name" error={errors.name}>
          <input
            id="register-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            placeholder="Enter Your Full Name"
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
          />
        </Field>

        <Field id="register-email" label="Email Address" error={errors.email}>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            placeholder="abc@gmail.com"
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
          />
        </Field>

        <Field id="register-phone" label="Phone Number (optional)" error={errors.phone}>
          <div
            className={`flex h-10 overflow-hidden rounded-md border bg-[#242424] transition-colors duration-200 focus-within:border-[#b99662] focus-within:ring-1 focus-within:ring-[#b99662]/40 ${
              errors.phone ? 'border-[#e0a08f]' : 'border-[#3a3a3a]'
            }`}
          >
            <span className="flex select-none items-center border-r border-[#3a3a3a] px-3 text-[13px] text-[#bcb5af]">
              +91
            </span>
            <input
              id="register-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={values.phone}
              onChange={update('phone')}
              placeholder="00000 00000"
              aria-invalid={Boolean(errors.phone)}
              className="h-full w-full bg-transparent px-4 text-[13px] text-[#f0eae5] placeholder-[#7c766f] outline-none"
            />
          </div>
        </Field>

        <PasswordField
          id="register-password"
          label="Password"
          value={values.password}
          onChange={update('password')}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={errors.password}
        />

        <PasswordField
          id="register-confirm"
          label="Confirm Password"
          value={values.confirm}
          onChange={update('confirm')}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={errors.confirm}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-[12px] leading-relaxed text-[#c9c2bb]">
            <input
              type="checkbox"
              checked={values.terms}
              onChange={update('terms')}
              className="mt-0.5 h-3.5 w-3.5 accent-[#b99662]"
            />
            <span>
              I agree to the Terms of Service and Privacy Policy.
            </span>
          </label>
          {errors.terms ? <p className="mt-1.5 text-[11px] text-[#e0a08f]">{errors.terms}</p> : null}
        </div>

        <SubmitButton status={status} label="Create Account" />
        <Feedback status={status} message={feedback} />
      </div>
    </form>
  );
}

function AccountPanel({ user, onSignOut }) {
  const initials = (user.name || user.email || '?')
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const countItems = (key) => {
    try {
      const value = JSON.parse(window.localStorage.getItem(key));
      return Array.isArray(value) ? value.length : 0;
    } catch {
      return 0;
    }
  };

  const details = [
    { label: 'Full Name', value: user.name || '—' },
    { label: 'Email Address', value: user.email },
    { label: 'Phone Number', value: user.phone || 'Not provided' },
    { label: 'Member Since', value: memberSince || '—' },
  ];

  const stats = [
    { label: 'Saved Pieces', value: countItems('lumiere-wishlist') },
    { label: 'Bag Items', value: countItems('lumiere-bag') },
  ];

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#b99662]/50 bg-[#1c1a18] font-serif text-[22px] text-[#d8b47e]">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b99662]">
            My Account
          </p>
          <h1 className="mt-1.5 truncate font-serif text-[26px] font-normal leading-tight text-[#f0eae5]">
            Hello{user.name ? `, ${user.name.split(/\s+/)[0]}` : ''}
          </h1>
        </div>
      </div>

      <dl className="mt-7 divide-y divide-white/10 rounded-md border border-white/10">
        {details.map((detail) => (
          <div key={detail.label} className="flex items-center justify-between gap-4 px-4 py-3.5">
            <dt className="text-[11px] uppercase tracking-[0.14em] text-[#8c867f]">
              {detail.label}
            </dt>
            <dd className="truncate text-right text-[13px] text-[#f0eae5]">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href="#collections"
            className="rounded-md border border-white/10 bg-[#171717] px-4 py-4 transition-colors duration-300 hover:border-[#b99662]/60"
          >
            <span className="block font-serif text-[24px] leading-none text-[#d8b47e]">
              {stat.value}
            </span>
            <span className="mt-1.5 block text-[11px] uppercase tracking-[0.12em] text-[#8c867f]">
              {stat.label}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <a
          href="#collections"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#f0eae5] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#171515] transition-colors duration-300 hover:bg-white"
        >
          Continue Shopping
          <ArrowRight size={14} strokeWidth={1.8} />
        </a>
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex h-11 w-full items-center justify-center rounded-md border border-white/15 px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#c9c2bb] transition-colors duration-300 hover:border-[#b99662] hover:text-[#b99662]"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function Auth({ mode: initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [user, setUser] = useState(getCurrentUser);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    window.location.hash = next === 'register' ? '#/register' : '#/login';
  };

  const handleSignOut = () => {
    signOut();
    setUser(null);
  };

  const isRegister = mode === 'register';

  return (
    <main className="min-h-dvh bg-[#0d0d0d]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[88rem] flex-col px-6 py-5 sm:px-10 lg:px-14">
        <div className="flex shrink-0 items-center justify-between">
          <a
            href="#home"
            className="inline-flex flex-col leading-none"
            aria-label="Lumiere Jewellery — Home"
          >
            <span className="font-serif text-lg font-normal tracking-[0.28em] text-white">
              LUMIÈRE
            </span>
            <span className="mt-1 text-[7.5px] uppercase tracking-[0.38em] text-gold">
              JEWELLERY
            </span>
          </a>
          <a
            href="#home"
            className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#8c867f] transition-colors hover:text-gold"
          >
            Back to home
            <ArrowRight
              size={13}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center py-6">
          <div className="w-full max-w-[440px]">
            {user ? (
              <AccountPanel user={user} onSignOut={handleSignOut} />
            ) : (
              <>
                <div className="text-center">
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b99662]">
                    {mode === 'register' ? 'Join Lumière' : 'Account'}
                  </p>
                  <h1 className="mt-2 font-serif text-[26px] font-normal leading-tight text-[#f0eae5] sm:text-[28px]">
                    {mode === 'register' ? 'Create Your Account' : 'Welcome Back'}
                  </h1>
                  <p className="mt-2 text-[13px] font-light leading-relaxed text-[#a7a19b]">
                    {mode === 'register'
                      ? 'Save your favourite pieces and follow your orders.'
                      : 'Sign in to access your wishlist, orders and a faster checkout.'}
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label="Sign in or create account"
                  className="mt-6 grid grid-cols-2 border-b border-white/10"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode !== 'register'}
                    onClick={() => switchMode('login')}
                    className={`relative pb-2.5 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                      mode !== 'register'
                        ? 'text-[#f0eae5]'
                        : 'text-[#8c867f] hover:text-[#c9c2bb]'
                    }`}
                  >
                    Sign In
                    {mode !== 'register' && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-px left-0 h-[2px] w-full bg-[#b99662]"
                      />
                    )}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'register'}
                    onClick={() => switchMode('register')}
                    className={`relative pb-2.5 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                      mode === 'register'
                        ? 'text-[#f0eae5]'
                        : 'text-[#8c867f] hover:text-[#c9c2bb]'
                    }`}
                  >
                    Create Account
                    {mode === 'register' && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-px left-0 h-[2px] w-full bg-[#b99662]"
                      />
                    )}
                  </button>
                </div>

                <div className="mt-7">
                  {mode === 'register' ? (
                    <RegisterForm onAuthenticated={setUser} />
                  ) : (
                    <LoginForm onAuthenticated={setUser} />
                  )}
                </div>

                <p className="mt-6 text-center text-[12px] text-[#8c867f]">
                  {mode === 'register' ? 'Already have an account? ' : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => switchMode(mode === 'register' ? 'login' : 'register')}
                    className="text-[#b99662] transition-colors hover:text-[#d8b47e]"
                  >
                    {mode === 'register' ? 'Sign in' : 'Create one'}
                  </button>
                </p>

                {isLocalAuth && (
                  <p className="mt-4 flex items-start justify-center gap-1.5 text-center text-[10.5px] leading-relaxed text-[#6f6a64]">
                    <ShieldCheck size={13} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                    Demo mode: accounts are stored on this device only.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
