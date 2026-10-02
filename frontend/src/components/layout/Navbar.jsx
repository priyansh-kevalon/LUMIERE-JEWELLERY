import { useEffect, useState } from 'react';
import { Search, User, ShoppingBag, Menu, ArrowRight } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { navLinks } from '../../data/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe ${
          scrolled
            ? 'border-b border-white/[0.07] bg-ink/80 py-3 backdrop-blur-xl'
            : 'border-b border-white/[0.04] bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex w-full max-w-shell items-center justify-between gap-6 px-6 sm:px-8 lg:px-12">
          {/* ---------- Wordmark ---------- */}
          <a
            href="#home"
            className="group flex shrink-0 flex-col leading-none"
            aria-label="Lumiere Jewellery — home"
          >
            <span
              className={`font-serif tracking-[0.34em] transition-colors duration-500 ${
                scrolled ? 'text-[17px] text-ivory' : 'text-[19px] text-ivory sm:text-xl'
              }`}
            >
              LUMIÈRE
            </span>
            <span
              className={`mt-1.5 text-[8px] tracking-[0.44em] transition-colors duration-500 ${
                scrolled ? 'text-gold/80' : 'text-gold'
              }`}
            >
              JEWELLERY
            </span>
          </a>

          {/* ---------- Desktop nav ---------- */}
          <nav className="hidden items-center gap-9 lg:flex xl:gap-12" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                aria-current={link.id === 'home' ? 'page' : undefined}
                className={`group relative py-1 text-[11px] tracking-luxe transition-colors duration-300 ease-luxe hover:text-gold ${
                  link.id === 'home' ? 'text-ivory' : 'text-ivory/80'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-500 ease-luxe ${
                    link.id === 'home'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* ---------- Actions ---------- */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-5">
            {/* Search — expands inline on desktop, opens a field on mobile */}
            <div className="hidden items-center lg:flex">
              <form
                onSubmit={(e) => e.preventDefault()}
                className={`flex items-center overflow-hidden transition-all duration-500 ease-luxe ${
                  searchOpen ? 'w-56' : 'w-9'
                }`}
              >
                {searchOpen && (
                  <input
                    type="search"
                    autoFocus
                    placeholder="Search jewellery"
                    aria-label="Search jewellery"
                    className="w-full border-b border-gold/40 bg-transparent py-1 text-[11px] tracking-wider text-ivory outline-none placeholder:text-muted/70"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setSearchOpen((v) => !v)}
                  aria-label={searchOpen ? 'Close search' : 'Open search'}
                  aria-expanded={searchOpen}
                  className="shrink-0 text-ivory transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <Search size={17} strokeWidth={1.4} />
                </button>
              </form>
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              aria-expanded={searchOpen}
              className="text-ivory transition-colors duration-300 hover:text-gold lg:hidden"
            >
              <Search size={18} strokeWidth={1.4} />
            </button>

            <a
              href="#contact"
              aria-label="Account"
              className="hidden text-ivory transition-colors duration-300 hover:text-gold sm:block"
            >
              <User size={18} strokeWidth={1.4} />
            </a>

            <a
              href="#collections"
              aria-label="Shopping bag, 0 items"
              className="relative text-ivory transition-colors duration-300 hover:text-gold"
            >
              <ShoppingBag size={18} strokeWidth={1.4} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-ink">
                0
              </span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-ivory transition-colors duration-300 hover:text-gold lg:hidden"
            >
              <Menu size={20} strokeWidth={1.4} />
            </button>
          </div>
        </div>

        {/* Hairline that appears only once the header condenses. */}
        <div
          aria-hidden="true"
          className={`mx-auto mt-3 h-px w-full max-w-shell bg-gradient-to-r from-transparent via-gold/25 to-transparent transition-opacity duration-700 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </header>

      {/* Compact search field on small screens. */}
      <div
        className={`fixed inset-x-0 top-[68px] z-40 border-b border-white/10 bg-ink/95 px-6 py-4 backdrop-blur-xl transition-all duration-500 ease-luxe sm:top-[72px] lg:hidden ${
          searchOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3">
          <Search size={16} strokeWidth={1.4} className="shrink-0 text-gold" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search jewellery"
            aria-label="Search jewellery"
            className="w-full bg-transparent text-[13px] tracking-wide text-ivory outline-none placeholder:text-muted/70"
          />
          <a
            href="#collections"
            className="flex shrink-0 items-center gap-1.5 text-[10px] tracking-luxe text-gold"
          >
            GO <ArrowRight size={13} strokeWidth={1.6} />
          </a>
        </form>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
