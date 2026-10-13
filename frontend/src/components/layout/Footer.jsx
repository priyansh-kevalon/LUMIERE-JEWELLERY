import { useState } from 'react';
import { footerColumns } from '../../data/navigation';

function InstagramIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function PinterestIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z" />
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110"
                >
                  <InstagramIcon size={17} />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110"
                >
                  <FacebookIcon size={17} />
                </a>
                <a
                  href="https://www.pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110"
                >
                  <PinterestIcon size={17} />
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
        <div className="mt-10 sm:mt-12 border-t border-white/10 pt-6 flex justify-end">
          <p className="text-[11px] tracking-wider text-white/60">
            &copy; 2026 LUMIÈRE JEWELLERY
          </p>
        </div>
      </div>
    </footer>
  );
}
