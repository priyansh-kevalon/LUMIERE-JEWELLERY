import { useEffect } from 'react';
import { X } from 'lucide-react';
import { navLinks } from '../../data/navigation';

const ease = 'transition-all duration-500 ease-luxe';

export default function MobileMenu({ open, onClose }) {
  /* Lock scroll while the panel owns the viewport. */
  useEffect(() => {
    if (!open) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/70 backdrop-blur-sm ${ease} ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Slide-down panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto border-b border-white/10 bg-ink-soft shadow-luxe ${ease} ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="mx-auto w-full max-w-shell px-6 pb-12 pt-6 sm:px-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="flex flex-col leading-none">
              <span className="font-serif text-lg tracking-[0.34em] text-ivory">LUMIÈRE</span>
              <span className="mt-1.5 text-[8px] tracking-[0.42em] text-gold">JEWELLERY</span>
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ivory transition hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <X size={18} strokeWidth={1.4} />
            </button>
          </div>

          <nav className="flex flex-col pt-4">
            {navLinks.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                onClick={onClose}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
                className={`group flex items-baseline justify-between border-b border-white/5 py-5 text-[13px] tracking-wideluxe transition-all duration-500 ease-luxe ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
              >
                <span className="text-ivory transition-colors duration-300 group-hover:text-gold">
                  {link.label}
                </span>
                <span className="text-[10px] text-gold/50">0{i + 1}</span>
              </a>
            ))}
          </nav>

          <div className="mt-10 flex items-center gap-3">
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 rounded-full border border-gold py-3.5 text-center text-[10px] tracking-luxe text-gold transition hover:bg-gold hover:text-ink"
            >
              BOOK A CONSULTATION
            </a>
            <a
              href="#collections"
              onClick={onClose}
              className="flex-1 rounded-full border border-white/20 py-3.5 text-center text-[10px] tracking-luxe text-ivory transition hover:border-gold hover:text-gold"
            >
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
