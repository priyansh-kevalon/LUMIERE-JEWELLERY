import { useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { footerColumns } from '../../data/navigation';

function PinterestIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-.79-.17-2.01.03-2.87.19-.78 1.2-4.96 1.2-4.96s-.3-.61-.3-1.52c0-1.43.83-2.5 1.86-2.5.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.43-.24 1.03.51 1.86 1.53 1.86 1.83 0 3.24-1.93 3.24-4.72 0-2.47-1.77-4.2-4.3-4.2-2.93 0-4.65 2.2-4.65 4.47 0 .89.34 1.85.77 2.37a.3.3 0 0 1 .07.29c-.08.33-.25 1-.29 1.14-.04.15-.12.18-.28.11-1.02-.48-1.66-1.97-1.66-3.17 0-2.58 1.87-4.95 5.39-4.95 2.83 0 5.03 2.02 5.03 4.72 0 2.81-1.78 5.08-4.24 5.08-.83 0-1.61-.43-1.88-.94l-.51 1.96c-.18.71-.68 1.6-1.01 2.14A10 10 0 1 0 12 2z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#0D0D0D] text-white pt-16 pb-12 sm:pt-20"
      style={{
        backgroundImage: 'url(/images/footer/footer-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }}
    >
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Brand, Bio, Social, Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand Logo */}
              <a href="#home" className="inline-flex flex-col leading-none">
                <span className="font-serif text-2xl tracking-[0.28em] text-white font-normal">
                  LUMIÈRE
                </span>
                <div className="mt-1 flex items-center gap-1.5 opacity-90">
                  <span className="h-[0.5px] w-3 bg-gold/60" />
                  <span className="text-[8px] tracking-[0.38em] text-gold uppercase font-light">
                    JEWELLERY
                  </span>
                  <span className="h-[0.5px] w-3 bg-gold/60" />
                </div>
              </a>

              <p className="mt-5 max-w-sm text-xs sm:text-[13px] font-light leading-relaxed text-white/60">
                Timeless jewellery, thoughtfully crafted to celebrate love, individuality, and life's
                most beautiful moments.
              </p>

              {/* Social Icons */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110"
                >
                  <Instagram size={17} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110"
                >
                  <Facebook size={17} />
                </a>
                <a
                  href="#"
                  aria-label="Pinterest"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110"
                >
                  <PinterestIcon size={17} />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-10 lg:mt-14">
              <span className="text-[10px] font-medium tracking-[0.24em] text-gold uppercase">
                STAY CONNECTED
              </span>
              <h3 className="mt-2 font-serif text-2xl text-white font-normal">
                Be the First to Know
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-white/60 max-w-sm">
                Sign up for exclusive access to new collections, special offers, and stories from
                Lumière Jewellery.
              </p>

              <form onSubmit={onSubscribe} className="mt-4 flex max-w-md items-center gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="w-full rounded-md bg-[#252525] px-4 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-gold/60"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-[#353535] hover:bg-[#454545] px-6 py-2.5 text-xs font-medium tracking-wider uppercase text-white transition-colors"
                >
                  SUBSCRIBE
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 text-xs text-gold">Thank you for subscribing!</p>
              )}
            </div>
          </div>

          {/* Right Columns: Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:pt-2">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-white mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs font-light text-white/65 hover:text-gold transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Line & Copyright */}
        <div className="mt-16 sm:mt-20 border-t border-white/10 pt-8 flex justify-end">
          <p className="text-[11px] tracking-wider text-white/60">
            &copy; 2026 LUMIÈRE JEWELLERY
          </p>
        </div>
      </div>
    </footer>
  );
}
