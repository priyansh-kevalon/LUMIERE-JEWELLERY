import { useState } from 'react';
import { Eye, EyeOff, Loader2, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { adminSignIn, DEFAULT_ADMIN } from '../../services/adminAuth';
import { Button, Field, TextInput } from '../ui';

export default function AdminLogin({ onAuthenticated }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = (key) => (event) => {
    setValues((previous) => ({ ...previous, [key]: event.target.value }));
    setError('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;
    if (!values.email.trim() || !values.password) {
      setError('Enter your admin email and password.');
      return;
    }
    setStatus('submitting');
    try {
      const session = await adminSignIn(values);
      setStatus('success');
      onAuthenticated(session);
    } catch {
      setStatus('idle');
      setError('Incorrect email or password.');
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#0f0e0d] px-5 py-12">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <div className="flex flex-col items-center leading-none">
            <span className="font-serif text-[22px] tracking-[0.26em] text-white">LUMIÈRE</span>
            <span className="mt-1.5 text-[8px] uppercase tracking-[0.4em] text-[#C6A16A]">
              ADMIN CONSOLE
            </span>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-white/10 bg-[#141312] p-6 shadow-luxe sm:p-8"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C6A16A]/40 text-[#C6A16A]">
              <Lock size={16} strokeWidth={1.6} />
            </span>
            <div>
              <h1 className="font-serif text-[19px] text-[#f2ece8]">Administrator Sign In</h1>
              <p className="text-[11px] font-light text-[#8d867f]">Restricted access</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <Field label="Email Address">
              <TextInput
                type="email"
                autoComplete="username"
                placeholder="admin@lumiere.com"
                value={values.email}
                onChange={update('email')}
              />
            </Field>

            <Field label="Password">
              <div className="relative">
                <TextInput
                  type={show ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={update('password')}
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShow((value) => !value)}
                  aria-label={show ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#8d867f] transition-colors hover:text-[#e2c694]"
                >
                  {show ? <EyeOff size={16} strokeWidth={1.6} /> : <Eye size={16} strokeWidth={1.6} />}
                </button>
              </div>
            </Field>

            {error ? <p className="text-[12px] text-[#e0a08f]">{error}</p> : null}

            <Button type="submit" disabled={status === 'submitting'} className="mt-1 h-11">
              {status === 'submitting' ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Signing in
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={14} strokeWidth={1.8} />
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 flex items-start gap-2 rounded-lg border border-white/10 bg-[#1c1a18] px-3.5 py-3 text-[11px] leading-relaxed text-[#8d867f]">
            <ShieldCheck size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C6A16A]" />
            <span>
              Demo credentials — <span className="text-[#c9c2bb]">{DEFAULT_ADMIN.email}</span> /{' '}
              <span className="text-[#c9c2bb]">{DEFAULT_ADMIN.password}</span>
            </span>
          </div>
        </form>

        <a
          href="#home"
          className="mt-6 block text-center text-[11px] uppercase tracking-[0.18em] text-[#8d867f] transition-colors hover:text-[#C6A16A]"
        >
          Back to Store
        </a>
      </div>
    </main>
  );
}
