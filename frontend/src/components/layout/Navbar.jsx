import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, User, ShoppingCart, Heart, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { navLinks } from '../../data/navigation';
import { useStorefrontProducts, formatINR } from '../../data/products';
import { useCart } from '../../context/CartContext';

function CountBadge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C6A16A] px-1 text-[9px] font-semibold leading-none text-[#0D0D0D]">
      {count > 9 ? '9+' : count}
    </span>
  );
}

const searchableText = (product) =>
  [product.name, product.category, product.categoryLabel, product.type, product.metal, product.style, product.occasion]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

function NavSearch() {
  const products = useStorefrontProducts();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const rootRef = useRef(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return products.filter((product) => searchableText(product).includes(term)).slice(0, 6);
  }, [products, query]);

  useEffect(() => {
    setActive(-1);
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery('');
    setActive(-1);
  };

  const goToProduct = (id) => {
    close();
    window.location.hash = `#/product/${id}`;
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const goToResults = () => {
    const term = query.trim();
    if (!term) return;
    close();
    window.location.hash = `#/collections?q=${encodeURIComponent(term)}`;
  };

  const onKeyDown = (event) => {
    if (!results.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((current) => (current + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((current) => (current - 1 + results.length) % results.length);
    } else if (event.key === 'Enter' && active >= 0) {
      event.preventDefault();
      goToProduct(results[active].id);
    }
  };

  const showPanel = open && query.trim().length > 0;

  return (
    <div ref={rootRef} className="relative flex items-center">
      {open && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (active >= 0 && results[active]) goToProduct(results[active].id);
            else goToResults();
          }}
          className="mr-2 flex items-center border-b border-white/40 pb-0.5"
        >
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search jewellery..."
            aria-label="Search products"
            role="combobox"
            aria-expanded={showPanel}
            aria-controls="nav-search-results"
            aria-autocomplete="list"
            className="w-36 bg-transparent text-xs text-white placeholder-white/40 outline-none sm:w-48"
          />
        </form>
      )}

      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-label="Search"
        className="text-white/90 transition-colors duration-200 hover:text-gold"
      >
        <Search size={18} strokeWidth={1.5} />
      </button>

      {showPanel && (
        <div
          id="nav-search-results"
          role="listbox"
          className="fixed left-1/2 top-[76px] z-[60] w-[92vw] max-w-[360px] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-[#141312]/98 shadow-luxe backdrop-blur-md sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-4 sm:w-[360px] sm:max-w-none sm:translate-x-0"
        >
          {results.length > 0 ? (
            <ul className="max-h-[60vh] overflow-y-auto py-1.5">
              {results.map((product, index) => (
                <li key={product.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === active}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => goToProduct(product.id)}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                      index === active ? 'bg-white/[0.06]' : ''
                    }`}
                  >
                    <span className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-white/10 bg-[#1c1a18]">
                      <img
                        src={product.image}
                        alt={product.alt || product.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] text-[#f4eee8]">{product.name}</span>
                      <span className="block truncate text-[10px] uppercase tracking-[0.14em] text-[#8d867f]">
                        {product.category} · {product.type}
                      </span>
                    </span>
                    <span className="shrink-0 text-[12px] text-[#C6A16A]">{formatINR(product.price)}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-[13px] text-[#f4eee8]">No products found</p>
              <p className="mt-1 text-[11px] text-[#8d867f]">Try a different search term.</p>
            </div>
          )}

          {results.length > 0 && (
            <button
              type="button"
              onClick={goToResults}
              className="block w-full border-t border-white/10 px-4 py-3 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-[#C6A16A] transition-colors hover:bg-white/[0.04]"
            >
              View all results for “{query.trim()}”
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ activeId = 'home' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
            <NavSearch />

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
              aria-label={`Cart, ${bagCount} item${bagCount === 1 ? '' : 's'}`}
              className="relative text-white/90 transition-colors duration-200 hover:text-gold"
            >
              <ShoppingCart size={18} strokeWidth={1.5} />
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
