import { useState } from 'react';
import {
  ArrowRight,
  KeyRound,
  Mail,
  Check,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import { requestPasswordReset, resetPassword, isLocalAuth } from '../../services/auth';

const inputClass =
  'h-11 w-full rounded-md border border-[#3a3a3a] bg-[#242424] px-4 text-[13px] text-[#f0eae5] placeholder-[#7c766f] outline-none transition-colors duration-200 focus:border-[#b99662] focus:ring-1 focus:ring-[#b99662]/40';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#c9c2bb]"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[11px] text-[#e0a08f]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[11px] text-[#7c766f]">{hint}</p>
      ) : null}
    </div>
  );
}

function PasswordField({ id, label, value, onChange, placeholder, autoComplete, error, hint }) {
  const [show, setShow] = useState(false);
  return (
    <Field id={id} label={label} error={error} hint={hint}>
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
      className={`flex items-start gap-2 text-[12px] leading-relaxed ${
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

export default function PasswordReset({ defaultEmail = '', onSuccess, className = '' }) {
  const [step, setStep] = useState('request');
  const [values, setValues] = useState({ email: defaultEmail, code: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [demoCode, setDemoCode] = useState('');
  const [demoExpiry, setDemoExpiry] = useState(0);

  const update = (key) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  };

  const validateRequest = () => {
    const next = {};
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address.';
    return next;
  };

  const validateVerify = () => {
    const next = {};
    if (!/^\d{6}$/.test(values.code.trim())) next.code = 'Enter the 6-digit code.';
    if (values.password.length < 8) {
      next.password = 'Use at least 8 characters.';
    } else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password)) {
      next.password = 'Include at least one letter and one number.';
    }
    if (values.confirm !== values.password) next.confirm = 'Passwords do not match.';
    return next;
  };

  const onRequest = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validateRequest();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    setFeedback('');
    try {
      const result = await requestPasswordReset({ email: values.email });
      const code = result?.code ? String(result.code) : '';
      setDemoCode(code);
      setDemoExpiry(result?.expiresInMinutes || 0);
      setValues((prev) => ({ ...prev, email: result?.email || prev.email, code: '' }));
      setStatus('idle');
      setStep('verify');
    } catch (error) {
      setStatus('error');
      setFeedback(
        error.message === 'email-not-found'
          ? 'No account is registered with that email address.'
          : 'We could not start the reset right now. Please try again.',
      );
    }
  };

  const onVerify = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validateVerify();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    setFeedback('');
    try {
      await resetPassword({
        email: values.email,
        code: values.code.trim(),
        password: values.password,
      });
      setStatus('success');
      setStep('done');
      onSuccess?.();
    } catch (error) {
      setStatus('error');
      setFeedback(
        error.message === 'expired-code'
          ? 'That code has expired. Request a new one.'
          : error.message === 'email-not-found'
            ? 'No account is registered with that email address.'
            : 'That code is not valid. Please check and try again.',
      );
    }
  };

  const restart = () => {
    setStep('request');
    setValues((prev) => ({ ...prev, code: '', password: '', confirm: '' }));
    setErrors({});
    setStatus('idle');
    setFeedback('');
    setDemoCode('');
  };

  if (step === 'done') {
    return (
      <div className={className}>
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b99662]/50 bg-[#1c1a18] text-[#d8b47e]">
            <Check size={22} strokeWidth={1.6} />
          </span>
          <h3 className="mt-4 font-serif text-[20px] text-[#f0eae5]">Password updated</h3>
          <p className="mt-2 max-w-[320px] text-[13px] leading-relaxed text-[#a7a19b]">
            Your password has been reset. You can now sign in with your new password.
          </p>
          <a
            href="#/login"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#f0eae5] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#171515] transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b99662]"
          >
            Go to sign in
            <ArrowRight size={14} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <form onSubmit={onVerify} noValidate className={className}>
        <div className="flex flex-col gap-3.5">
          {demoCode ? (
            <div className="rounded-md border border-[#b99662]/40 bg-[#b99662]/10 px-4 py-3">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#d8b47e]">
                <ShieldCheck size={14} strokeWidth={1.6} /> Demo reset code
              </p>
              <p className="mt-1.5 font-serif text-[22px] tracking-[0.3em] text-[#f0eae5]">
                {demoCode}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#a7a19b]">
                No email is sent in demo mode. Enter the code below
                {demoExpiry ? ` (valid for ${demoExpiry} minutes)` : ''}.
              </p>
            </div>
          ) : (
            <p className="text-[12px] leading-relaxed text-[#a7a19b]">
              Enter the reset code we sent to{' '}
              <span className="text-[#e0d9d2]">{values.email}</span>.
            </p>
          )}

          <Field id="reset-code" label="Reset Code" error={errors.code}>
            <input
              id="reset-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={values.code}
              onChange={update('code')}
              placeholder="000000"
              aria-invalid={Boolean(errors.code)}
              className={`${inputClass} tracking-[0.3em]`}
            />
          </Field>

          <PasswordField
            id="reset-password"
            label="New Password"
            value={values.password}
            onChange={update('password')}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            error={errors.password}
          />

          <PasswordField
            id="reset-confirm"
            label="Confirm New Password"
            value={values.confirm}
            onChange={update('confirm')}
            placeholder="Re-enter your new password"
            autoComplete="new-password"
            error={errors.confirm}
          />

          {feedback ? <Feedback status={status} message={feedback} /> : null}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#f0eae5] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#171515] transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b99662] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Please wait
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight size={14} strokeWidth={1.8} />
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-[12px]">
            <button
              type="button"
              onClick={restart}
              className="text-[#8c867f] transition-colors hover:text-[#c9c2bb]"
            >
              Use a different email
            </button>
            <a href="#/login" className="text-[#b99662] transition-colors hover:text-[#d8b47e]">
              Back to sign in
            </a>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={onRequest} noValidate className={className}>
      <div className="flex flex-col gap-3.5">
        <p className="text-[12px] leading-relaxed text-[#a7a19b]">
          Enter the email address linked to your account and we&rsquo;ll help you set a new password.
        </p>

        <Field id="reset-email" label="Email Address" error={errors.email}>
          <div className="relative">
            <Mail
              size={15}
              strokeWidth={1.6}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c766f]"
            />
            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={update('email')}
              placeholder="abc@gmail.com"
              aria-invalid={Boolean(errors.email)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>

        {feedback ? <Feedback status={status} message={feedback} /> : null}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#f0eae5] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#171515] transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b99662] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <KeyRound size={14} strokeWidth={1.8} />
              Send Reset Code
            </>
          )}
        </button>

        <a
          href="#/login"
          className="text-center text-[12px] text-[#b99662] transition-colors hover:text-[#d8b47e]"
        >
          Back to sign in
        </a>

        {isLocalAuth ? (
          <p className="flex items-start gap-1.5 text-[10.5px] leading-relaxed text-[#6f6a64]">
            <ShieldCheck size={13} strokeWidth={1.5} className="mt-0.5 shrink-0" />
            Demo mode: the reset code appears on screen because accounts live on this device only.
          </p>
        ) : null}
      </div>
    </form>
  );
}
