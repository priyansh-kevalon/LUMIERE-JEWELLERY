import { useEffect, useState } from 'react';
import { Search, User, ShoppingBag, Heart, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { navLinks } from '../../data/navigation';
import { useCart } from '../../context/CartContext';

function CountBadge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C6A16A] px-1 text-[9px] font-semibold leading-none text-[#0D0D0D]">
      {count > 9 ? '9+' : count}
    </span>
  );
}

export default function Navbar({ activeId = 'home' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { bagCount, wishlistCount, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0D0D0D]/90 py-3.5 backdrop-blur-md border-b border-white/[0.08]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[88rem] items-center justify-between px-6 sm:px-10 lg:px-14">
          {/* ---------- Wordmark ---------- */}
          <a
            href="#home"
            className="group flex flex-col items-center leading-none"
            aria-label="Lumiere Jewellery — Home"
          >
            <span className="font-serif text-lg tracking-[0.28em] text-white sm:text-xl font-normal">
              LUMIÈRE
            </span>
            <div className="mt-1 flex items-center gap-1.5 opacity-90">
              <span className="h-[0.5px] w-3 bg-gold/60" />
              <span className="text-[7.5px] tracking-[0.38em] text-gold uppercase font-light">
                JEWELLERY
              </span>
              <span className="h-[0.5px] w-3 bg-gold/60" />
            </div>
          </a>

          {/* ---------- Desktop Nav ---------- */}
          <nav className="hidden items-center gap-8 lg:flex xl:gap-11" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 text-[11px] font-normal tracking-[0.22em] uppercase transition-colors duration-300 hover:text-gold ${
                  link.id === activeId ? 'text-white' : 'text-white/80'
                }`}
              >
                {link.label}
                {link.id === activeId && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-white/90"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* ---------- Actions ---------- */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search */}
            <div className="relative flex items-center">
              {searchOpen && (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mr-2 flex items-center border-b border-white/40 pb-0.5"
                >
                  <input
                    type="search"
                    autoFocus
                    placeholder="Search jewellery..."
                    className="w-36 sm:w-48 bg-transparent text-xs text-white placeholder-white/40 outline-none"
                  />
                </form>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                className="text-white/90 transition-colors duration-200 hover:text-gold"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            </div>

            <a
              href="#/login"
              aria-label="Account"
              className="text-white/90 transition-colors duration-200 hover:text-gold"
            >
              <User size={18} strokeWidth={1.5} />
            </a>

            <button
              type="button"
              onClick={() => openDrawer('wishlist')}
              aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? '' : 's'}`}
              className="relative text-white/90 transition-colors duration-200 hover:text-gold"
            >
              <Heart size={18} strokeWidth={1.5} />
              <CountBadge count={wishlistCount} />
            </button>

            <button
              type="button"
              onClick={() => openDrawer('bag')}
              aria-label={`Shopping bag, ${bagCount} item${bagCount === 1 ? '' : 's'}`}
              className="relative text-white/90 transition-colors duration-200 hover:text-gold"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <CountBadge count={bagCount} />
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="text-white hover:text-gold lg:hidden ml-1"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
