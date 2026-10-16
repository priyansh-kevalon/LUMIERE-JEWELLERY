import { useState } from 'react';
import { footerColumns } from '../../data/navigation';

/* Official brand glyphs (Font Awesome Free, "brands" set). Each is drawn in
   `currentColor` so it renders white on the brand-coloured button below. */

function InstagramIcon({ size = 16 }) {
  return (
    <svg
      width={(size * 448) / 512}
      height={size}
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg
      width={(size * 320) / 512}
      height={size}
      viewBox="0 0 320 512"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
    </svg>
  );
}

function PinterestIcon({ size = 16 }) {
  return (
    <svg
      width={(size * 384) / 512}
      height={size}
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" />
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
      className="relative overflow-hidden bg-[#0D0D0D] pt-12 pb-8 text-white sm:pt-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(185,150,91,0.08),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
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

              <p className="mt-4 max-w-sm text-xs sm:text-[13px] font-light leading-relaxed text-white/60">
                Timeless jewellery, thoughtfully crafted to celebrate love, individuality, and life's
                most beautiful moments.
              </p>

              {/* Social Icons */}
              <div className="mt-5 flex items-center gap-3">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110"
                >
                  <InstagramIcon size={16} />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110"
                >
                  <FacebookIcon size={16} />
                </a>
                <a
                  href="https://www.pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E60023] text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110"
                >
                  <PinterestIcon size={16} />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8 lg:mt-10">
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
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-7 lg:pt-1">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-white mb-3">
                  {col.title}
                </h4>
                <ul className="space-y-2">
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
        <div className="mt-10 sm:mt-12 border-t border-white/10 pt-6 flex justify-center sm:justify-end">
          <p className="text-[11px] tracking-wider text-white/60">
            &copy; 2026 LUMIÈRE JEWELLERY
          </p>
        </div>
      </div>
    </footer>
  );
}
