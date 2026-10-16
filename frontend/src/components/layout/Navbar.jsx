import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, User, ShoppingCart, Heart, Menu, X } from 'lucide-react';
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

function SearchResults({ className, results, active, setActive, query, onSelect, onViewAll }) {
  return (
    <div className={className}>
      {results.length > 0 ? (
        <ul className="max-h-[60vh] overflow-y-auto py-1.5">
          {results.map((product, index) => (
            <li key={product.id}>
              <button
                type="button"
                role="option"
                aria-selected={index === active}
                onMouseEnter={() => setActive(index)}
                onClick={() => onSelect(product.id)}
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
          onClick={onViewAll}
          className="block w-full border-t border-white/10 px-4 py-3 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-[#C6A16A] transition-colors hover:bg-white/[0.04]"
        >
          View all results for “{query.trim()}”
        </button>
      )}
    </div>
  );
}

export default function Navbar({ activeId = 'home' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const headerRef = useRef(null);
  const products = useStorefrontProducts();
  const { bagCount, wishlistCount, openDrawer } = useCart();

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return products.filter((product) => searchableText(product).includes(term)).slice(0, 6);
  }, [products, query]);

  useEffect(() => {
    setActive(-1);
  }, [query]);

  useEffect(() => {
    if (!searchOpen) return undefined;
    const onPointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setSearchOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => {
    setSearchOpen(false);
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

  const onSearchKeyDown = (event) => {
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

  const submitSearch = (event) => {
    event.preventDefault();
    if (active >= 0 && results[active]) goToProduct(results[active].id);
    else goToResults();
  };

  const showPanel = searchOpen && query.trim().length > 0;

  return (
    <>
      <header
        ref={headerRef}
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
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Desktop inline search field */}
            {searchOpen && (
              <form
                onSubmit={submitSearch}
                className="mr-1 hidden items-center border-b border-white/40 pb-0.5 sm:flex"
              >
                <input
                  type="search"
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Search jewellery..."
                  aria-label="Search jewellery"
                  className="w-40 bg-transparent text-[13px] text-white placeholder-white/50 focus:outline-none xl:w-52"
                />
              </form>
            )}

            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => (searchOpen ? close() : setSearchOpen(true))}
                aria-label={searchOpen ? 'Close search' : 'Search'}
                aria-expanded={searchOpen}
                className="text-white/90 transition-colors duration-200 hover:text-gold"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              {/* Desktop results panel */}
              {showPanel && (
                <SearchResults
                  results={results}
                  active={active}
                  setActive={setActive}
                  query={query}
                  onSelect={goToProduct}
                  onViewAll={goToResults}
                  className="absolute right-0 top-full mt-4 hidden w-[360px] overflow-hidden rounded-lg border border-white/10 bg-[#141312]/98 shadow-luxe backdrop-blur-md sm:block"
                />
              )}
            </div>

            <a
              href="#/profile"
              aria-label="My account"
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

        {/* ---------- Mobile search bar (drops below the navbar) ---------- */}
        {searchOpen && (
          <div className="mx-auto mt-3 w-full max-w-[88rem] px-6 sm:hidden">
            <form
              onSubmit={submitSearch}
              className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-[#171514]/95 px-3.5 py-2.5 backdrop-blur-md"
            >
              <Search size={16} strokeWidth={1.7} className="shrink-0 text-[#C6A16A]" />
              <input
                type="search"
                inputMode="search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onSearchKeyDown}
                placeholder="Search jewellery..."
                aria-label="Search jewellery"
                className="h-6 w-full min-w-0 bg-transparent text-[13px] text-[#f0eae5] placeholder-[#7c766f] outline-none"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="shrink-0 text-[#8c867f] transition-colors hover:text-[#f0eae5]"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </form>

            {showPanel && (
              <SearchResults
                results={results}
                active={active}
                setActive={setActive}
                query={query}
                onSelect={goToProduct}
                onViewAll={goToResults}
                className="animate-fade-up mt-2 overflow-hidden rounded-lg border border-white/10 bg-[#141312]/98 shadow-luxe backdrop-blur-md"
              />
            )}
          </div>
        )}
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeId={activeId} />
    </>
  );
}
