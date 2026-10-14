import { useEffect } from 'react';
import { X } from 'lucide-react';

export const cx = (...values) => values.filter(Boolean).join(' ');

export const GOLD = '#C6A16A';

/* ------------------------------- layout --------------------------- */

export function Card({ className = '', children, ...rest }) {
  return (
    <div
      className={cx('rounded-xl border border-white/10 bg-[#141312] p-5 sm:p-6', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-[26px] font-normal leading-tight text-[#f2ece8] sm:text-[30px]">
          {title}
        </h1>
        {subtitle ? <p className="mt-1.5 text-[13px] font-light text-[#9d968f]">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}

export function SectionTitle({ children, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c9c2bb]">
        {children}
      </h2>
      {action}
    </div>
  );
}

/* ------------------------------ controls -------------------------- */

const buttonVariants = {
  primary:
    'bg-[#C6A16A] text-[#0D0D0D] hover:bg-[#d8b47e] focus-visible:outline-[#C6A16A]',
  ghost:
    'border border-white/15 text-[#c9c2bb] hover:border-[#C6A16A]/70 hover:text-[#C6A16A] focus-visible:outline-[#C6A16A]',
  danger:
    'border border-[#e07a7a]/40 text-[#e0a08f] hover:bg-[#e07a7a]/10 hover:text-[#f0b4b4] focus-visible:outline-[#e07a7a]',
  subtle:
    'bg-white/[0.06] text-[#f2ece8] hover:bg-white/[0.12] focus-visible:outline-[#C6A16A]',
};

export function Button({ variant = 'primary', className = '', size = 'md', children, ...rest }) {
  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' ? 'h-9 px-3.5 text-[10px]' : 'h-11 px-5 text-[11px]',
        buttonVariants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function IconButton({ label, className = '', children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(
        'flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#a7a19b] transition-colors hover:border-[#C6A16A]/60 hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

const fieldClass =
  'w-full rounded-lg border border-white/10 bg-[#1c1a18] px-3.5 text-[13px] text-[#f2ece8] placeholder-[#6f6a64] outline-none transition-colors focus:border-[#C6A16A] focus:ring-1 focus:ring-[#C6A16A]/40';

export function Field({ label, hint, error, children }) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a19b]">
          {label}
        </span>
      ) : null}
      {children}
      {error ? (
        <span className="mt-1.5 block text-[11px] text-[#e0a08f]">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-[11px] text-[#6f6a64]">{hint}</span>
      ) : null}
    </label>
  );
}

export function TextInput({ className = '', ...rest }) {
  return <input className={cx(fieldClass, 'h-10', className)} {...rest} />;
}

export function Textarea({ className = '', ...rest }) {
  return <textarea className={cx(fieldClass, 'min-h-[88px] py-2.5', className)} {...rest} />;
}

export function Select({ className = '', children, ...rest }) {
  return (
    <select
      className={cx(fieldClass, 'h-10 [&>option]:bg-[#1a1a1a]', className)}
      {...rest}
    >
      {children}
    </select>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      <span
        className={cx(
          'relative h-5 w-9 rounded-full transition-colors duration-200',
          checked ? 'bg-[#C6A16A]' : 'bg-white/15',
        )}
      >
        <span
          className={cx(
            'absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-200',
            checked ? 'translate-x-4' : 'translate-x-0.5',
          )}
        />
      </span>
      {label ? <span className="text-[12px] text-[#c9c2bb]">{label}</span> : null}
    </button>
  );
}

/* ------------------------------- status --------------------------- */

const statusStyles = {
  pending: 'border-[#C6A16A]/40 bg-[#C6A16A]/10 text-[#e2c694]',
  confirmed: 'border-[#7aa2e0]/40 bg-[#7aa2e0]/10 text-[#a9c4f0]',
  processing: 'border-[#c9a0e0]/40 bg-[#c9a0e0]/10 text-[#dcc0ef]',
  shipped: 'border-[#6fc6c0]/40 bg-[#6fc6c0]/10 text-[#a2e2dd]',
  delivered: 'border-[#9fc6a2]/40 bg-[#9fc6a2]/10 text-[#bfe0c2]',
  cancelled: 'border-[#e07a7a]/40 bg-[#e07a7a]/10 text-[#f0b4b4]',
  paid: 'border-[#9fc6a2]/40 bg-[#9fc6a2]/10 text-[#bfe0c2]',
  failed: 'border-[#e07a7a]/40 bg-[#e07a7a]/10 text-[#f0b4b4]',
  approved: 'border-[#9fc6a2]/40 bg-[#9fc6a2]/10 text-[#bfe0c2]',
  rejected: 'border-[#e07a7a]/40 bg-[#e07a7a]/10 text-[#f0b4b4]',
  active: 'border-[#9fc6a2]/40 bg-[#9fc6a2]/10 text-[#bfe0c2]',
  inactive: 'border-white/15 bg-white/[0.04] text-[#8d867f]',
};

export function Badge({ tone = 'inactive', children, className = '' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em]',
        statusStyles[tone] || statusStyles.inactive,
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------- table ---------------------------- */

export function TableWrap({ children }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#141312]">
      <table className="w-full min-w-[640px] border-collapse text-left">{children}</table>
    </div>
  );
}

export function Th({ children, className = '' }) {
  return (
    <th
      className={cx(
        'border-b border-white/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8d867f]',
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = '' }) {
  return (
    <td className={cx('border-b border-white/[0.06] px-4 py-3.5 text-[13px] text-[#d8d2cb]', className)}>
      {children}
    </td>
  );
}

/* ------------------------------- modal ---------------------------- */

export function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && onClose();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          'relative z-10 my-6 w-full rounded-2xl border border-white/10 bg-[#161514] shadow-luxe',
          size === 'lg' ? 'max-w-3xl' : 'max-w-lg',
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-serif text-[19px] text-[#f2ece8]">{title}</h2>
          <IconButton label="Close" onClick={onClose} className="border-transparent">
            <X size={18} strokeWidth={1.5} />
          </IconButton>
        </div>
        <div className="px-5 py-5">{children}</div>
        {footer ? (
          <div className="flex items-center justify-end gap-3 border-t border-white/10 px-5 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, copy }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/12 px-8 py-16 text-center">
      {icon ? (
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-[#C6A16A]">
          {icon}
        </span>
      ) : null}
      <p className="mt-4 font-serif text-[18px] text-[#f2ece8]">{title}</p>
      {copy ? (
        <p className="mt-2 max-w-sm text-[12px] font-light leading-relaxed text-[#9d968f]">{copy}</p>
      ) : null}
    </div>
  );
}
