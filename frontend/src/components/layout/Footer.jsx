import { useState } from 'react';
import { Instagram, Facebook, ArrowRight, ChevronDown } from 'lucide-react';
import { footerColumns, socialLinks } from '../../data/navigation';

/* Pinterest is not shipped by lucide-react. */
function Pinterest({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-.79-.17-2.01.03-2.87.19-.78 1.2-4.96 1.2-4.96s-.3-.61-.3-1.52c0-1.43.83-2.5 1.86-2.5.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.43-.24 1.03.51 1.86 1.53 1.86 1.83 0 3.24-1.93 3.24-4.72 0-2.47-1.77-4.2-4.3-4.2-2.93 0-4.65 2.2-4.65 4.47 0 .89.34 1.85.77 2.37a.3.3 0 0 1 .07.29c-.08.33-.25 1-.29 1.14-.04.15-.12.18-.28.11-1.02-.48-1.66-1.97-1.66-3.17 0-2.58 1.87-4.95 5.39-4.95 2.83 0 5.03 2.02 5.03 4.72 0 2.81-1.78 5.08-4.24 5.08-.83 0-1.61-.43-1.88-.94l-.51 1.96c-.18.71-.68 1.6-1.01 2.14A10 10 0 1 0 12 2z" />
    </svg>
  );
}

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  pinterest: Pinterest,
};

function FooterColumn({ title, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.07] lg:border-0">
      {/* Accordion trigger on mobile, plain heading on desktop. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left lg:pointer-events-none lg:py-0"
      >
        <span className="text-[11px] font-medium tracking-wideluxe text-ivory">{title}</span>
        <ChevronDown
          size={15}
          strokeWidth={1.4}
          className={`text-gold transition-transform duration-500 ease-luxe lg:hidden ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <ul
        className={`grid overflow-hidden transition-all duration-500 ease-luxe lg:mt-6 lg:block lg:overflow-visible ${
          open ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-1.5 py-1.5 text-[13px] font-light text-muted transition-colors duration-300 hover:text-gold"
            >
              <span className="h-px w-0 bg-gold transition-all duration-500 ease-luxe group-hover:w-3" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="contact" className="bg-ink text-ivory">
      <div className="mx-auto w-full max-w-shell px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        {/* ---------------- Top: brand + link columns ---------------- */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#home" className="inline-flex flex-col leading-none">
              <span className="font-serif text-2xl tracking-[0.34em] text-ivory">LUMIÈRE</span>
              <span className="mt-2 text-[9px] tracking-[0.46em] text-gold">JEWELLERY</span>
            </a>

            <p className="mt-7 max-w-xs text-[13px] font-light leading-relaxed text-muted">
              We create timeless jewellery for life&rsquo;s most beautiful moments, individually and with
              utmost care.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-muted transition-all duration-500 ease-luxe hover:border-gold hover:bg-gold hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <Icon size={15} strokeWidth={1.4} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <FooterColumn key={column.title} title={column.title} links={column.links} />
            ))}
          </div>
        </div>

        {/* ---------------- Newsletter ---------------- */}
        <div className="mt-16 border-t border-white/[0.07] pt-14 lg:mt-24">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-[10px] tracking-wideluxe text-gold">STAY CONNECTED</span>
              <h3 className="mt-4 font-serif text-2xl leading-tight text-ivory sm:text-[1.75rem]">
                Be the First to Know
              </h3>
              <p className="mt-3 max-w-sm text-[13px] font-light leading-relaxed text-muted">
                Sign up for exclusive access to new collections, special offers, and more.
              </p>
            </div>

            <div className="lg:col-span-8 lg:pt-3">
              {subscribed ? (
                <p className="flex items-center gap-3 border-b border-gold/40 pb-5 text-[12px] tracking-wider text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  You&rsquo;re on the list. Welcome to LUMIÈRE.
                </p>
              ) : (
                <form onSubmit={onSubscribe} className="group flex items-center gap-4 border-b border-white/20 pb-4 transition-colors duration-500 focus-within:border-gold">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-transparent text-[14px] font-light text-ivory outline-none placeholder:text-muted/60"
                  />
                  <button
                    type="submit"
                    className="group/btn flex shrink-0 items-center gap-2 text-[10px] tracking-luxe text-gold transition-colors duration-300 hover:text-gold-light"
                  >
                    SUBSCRIBE
                    <ArrowRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ---------------- Legal ---------------- */}
        <div className="mt-14 border-t border-white/[0.07] pt-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="text-[10px] tracking-wideluxe text-muted/80">
              &copy; 2026 LUMIÈRE JEWELLERY
            </p>

            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[10px] tracking-widest text-muted/80 transition-colors duration-300 hover:text-gold"
                  >
                    {item.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
