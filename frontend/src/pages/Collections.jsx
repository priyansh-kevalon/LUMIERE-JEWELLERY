import { useEffect, useMemo, useRef, useState } from 'react';
import {
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowRight,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import SmartImage from '../components/common/SmartImage';
import {
  categories,
  filterGroups,
  products,
  formatINR,
  discountPercent,
  PER_PAGE,
  ALL_CATEGORY,
} from '../data/products';

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  }, [key, value]);

  return [value, setValue];
}

function ProductCard({ product, wishlisted, onToggleWishlist, onAddToBag }) {
  const off = discountPercent(product);

  const addToBag = (event) => {
    event.preventDefault();
    onAddToBag(product);
  };

  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden rounded-[9px] bg-[#454545]">
        <SmartImage
          src={product.image}
          alt={product.alt}
          className="h-full w-full"
          imgClassName="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.06]"
        />

        {(off != null || product.badge) && (
          <span className="absolute left-3 top-3 rounded-full bg-[#C6A16A] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#0D0D0D]">
            {off != null ? `${off}% OFF` : product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={onToggleWishlist}
          aria-pressed={wishlisted}
          aria-label={
            wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
          }
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-[#C6A16A]/60 hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
        >
          <Heart
            size={16}
            strokeWidth={1.6}
            className={`transition-colors duration-300 ${wishlisted ? 'fill-[#C6A16A] text-[#C6A16A]' : ''}`}
          />
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-[13px] font-light leading-snug text-[#f4eee8]">{product.name}</h3>

        {product.variants && (
          <div className="mt-1.5 flex items-center gap-1.5" aria-hidden="true">
            {product.variants.map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full border border-white/25"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="ml-1 text-[9px] uppercase tracking-[0.14em] text-[#7c7670]">
              {product.variants.length} shades
            </span>
          </div>
        )}

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-[14px] tracking-wide text-[#f4eee8]">
            {formatINR(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-[12px] font-light text-[#a7a19b] line-through">
              {formatINR(product.compareAt)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={addToBag}
          className="mt-3.5 w-full rounded-[5px] border border-white/15 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#f4eee8] transition-all duration-300 hover:border-[#C6A16A] hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
        >
          Add to Bag
        </button>
      </div>
    </article>
  );
}

function FilterSidebar({ filters, counts, onToggle, onClear }) {
  const selectedCount = Object.values(filters).reduce((sum, list) => sum + list.length, 0);

  return (
    <div className="flex flex-col gap-7">
      {filterGroups.map((group) => (
        <fieldset key={group.key}>
          <legend className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f4eee8]">
            {group.label}
          </legend>
          <div className="mt-3.5 space-y-2.5">
            {group.options.map((option) => {
              const checked = (filters[group.key] || []).includes(option);
              const count = counts[group.key]?.[option] || 0;
              return (
                <label
                  key={option}
                  className="group flex cursor-pointer items-center gap-2.5"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(group.key, option)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`flex h-[15px] w-[15px] shrink-0 items-center justify-center border transition-colors duration-200 ${
                      checked
                        ? 'border-[#C6A16A] bg-[#C6A16A] text-[#0D0D0D]'
                        : 'border-white/25 bg-transparent group-hover:border-white/50'
                    }`}
                  >
                    {checked && <Check size={11} strokeWidth={2.6} />}
                  </span>
                  <span
                    className={`text-[11px] font-light transition-colors duration-200 ${
                      checked ? 'text-[#f4eee8]' : 'text-[#a7a19b] group-hover:text-[#f4eee8]'
                    }`}
                  >
                    {option}
                  </span>
                  {count > 0 && (
                    <span className="ml-auto text-[10px] text-[#6b6560]">{count}</span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      {selectedCount > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="w-fit text-[10px] font-medium uppercase tracking-[0.16em] text-[#C6A16A] underline-offset-4 transition-colors hover:text-[#e2c694] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
        >
          Clear All
        </button>
      )}
    </div>
  );
}

function CategoryRow({ active, onSelect }) {
  const items = [
    {
      key: ALL_CATEGORY,
      label: 'ALL',
      circle: (
        <span className="flex h-full w-full items-center justify-center bg-[#191919] font-serif text-lg tracking-[0.2em] text-[#C6A16A]">
          ALL
        </span>
      ),
    },
    ...categories.map((category) => ({
      key: category.key,
      label: category.label,
      image: category.image,
      alt: category.alt,
    })),
  ];

  return (
    <div className="border-b border-white/10 bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-shell px-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-7 overflow-x-auto pb-7 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center lg:gap-10 lg:overflow-visible">
          {items.map((item) => {
            const selected = active === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelect(item.key)}
                aria-pressed={selected}
                className="group flex w-[92px] shrink-0 flex-col items-center gap-3 outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#C6A16A] lg:w-[120px]"
              >
                <span
                  className={`relative flex h-[92px] w-[92px] items-center justify-center overflow-hidden rounded-full border transition-all duration-500 ease-luxe lg:h-[120px] lg:w-[120px] ${
                    selected
                      ? 'border-[#C6A16A] ring-1 ring-[#C6A16A]/40'
                      : 'border-white/15 group-hover:border-[#C6A16A]/60'
                  }`}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
                    />
                  ) : (
                    item.circle
                  )}
                </span>
                <span
                  className={`text-[10px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                    selected ? 'text-[#C6A16A]' : 'text-[#a7a19b] group-hover:text-[#f4eee8]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Pagination({ page, total, onChange }) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, index) => index + 1);
  const btn =
    'flex h-9 min-w-9 items-center justify-center rounded-full border px-2 text-[11px] tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]';
  const idle = 'border-white/15 text-[#a7a19b] hover:border-[#C6A16A]/60 hover:text-[#f4eee8]';
  const disabled = 'cursor-not-allowed border-white/10 text-white/25';

  return (
    <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${btn} ${page === 1 ? disabled : idle}`}
      >
        <ChevronLeft size={16} strokeWidth={1.6} />
      </button>

      {pages.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onChange(number)}
          aria-current={number === page ? 'page' : undefined}
          className={`${btn} ${
            number === page
              ? 'border-[#C6A16A] bg-[#C6A16A] text-[#0D0D0D]'
              : idle
          }`}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === total}
        aria-label="Next page"
        className={`${btn} ${page === total ? disabled : idle}`}
      >
        <ChevronRight size={16} strokeWidth={1.6} />
      </button>
    </nav>
  );
}

const benefits = [
  { icon: Truck, title: 'Free Shipping', text: 'You will love at great low prices' },
  { icon: RotateCcw, title: '15 Days Return', text: 'Within 15 days for an exchange' },
  { icon: Headphones, title: 'Customer Support', text: '24 hours a day, 7 days a week' },
  { icon: CreditCard, title: 'Flexible Payment', text: 'Pay with multiple credit cards' },
];

function BenefitsBar() {
  return (
    <section aria-label="Shopping benefits" className="bg-[#eee8e2] py-12 sm:py-14">
      <div className="mx-auto grid w-full max-w-shell grid-cols-2 gap-x-4 gap-y-9 px-6 sm:px-10 lg:grid-cols-4 lg:px-14">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex flex-col items-center gap-2.5 text-center lg:px-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#171717]/25 text-[#171717]">
              <benefit.icon size={22} strokeWidth={1.4} aria-hidden="true" />
            </div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#171717]">
              {benefit.title}
            </h3>
            <p className="text-[11px] font-light leading-relaxed text-[#4b4640]">{benefit.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CollectionsHero({ onExplore }) {
  return (
    <section className="relative isolate mt-20 overflow-hidden bg-[#0D0D0D] lg:aspect-[1920/1079]">
      <div className="absolute inset-0 h-full w-full">
        <SmartImage
          src="/images/collections/image 11.png"
          alt="Model wearing a diamond necklace and drop earrings beside sparkling loose diamonds on a glossy black surface"
          priority
          className="h-full w-full"
          imgClassName="!object-[30%_center] sm:!object-[center_45%] lg:!object-[center_42%]"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(13,13,13,0.96)_0%,rgba(13,13,13,0.74)_34%,rgba(13,13,13,0.34)_62%,rgba(13,13,13,0.08)_100%)] lg:bg-[radial-gradient(60%_84%_at_62%_50%,rgba(13,13,13,0.72)_0%,rgba(13,13,13,0.22)_58%,rgba(13,13,13,0)_100%)]"
      />

      <div className="relative z-10 mx-auto flex h-[580px] w-full max-w-shell items-end px-6 pb-16 sm:px-10 md:h-[440px] lg:h-full lg:items-center lg:pb-0 lg:px-14">
        <div className="w-full max-w-[330px] lg:ml-[42%] lg:max-w-[380px]">
          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#C6A16A]">
            THE COLLECTIONS
          </p>

          <h1 className="mt-4 font-serif text-[30px] font-normal leading-[1.1] tracking-[-0.01em] text-[#f4eee8] sm:text-[34px] lg:text-[38px]">
            Elegance Crafted
            <span className="block">For Royalty.</span>
          </h1>

          <p className="mt-4 max-w-[320px] text-[12px] font-light leading-[1.7] text-[#b8b1a9] sm:text-[13px]">
            Discover exquisite jewellery crafted to celebrate every moment, from everyday
            elegance to unforgettable occasions.
          </p>

          <button
            type="button"
            onClick={onExplore}
            className="group mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#353535] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#f4eee8] transition-colors duration-300 hover:bg-[#454545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A16A]"
          >
            <span>Explore Collection</span>
            <ArrowRight
              size={15}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

function FilterDrawer({ open, onClose, filters, counts, onToggle, onClear, resultCount }) {
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
      className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-luxe ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
        className={`absolute inset-y-0 right-0 flex w-[320px] max-w-[86vw] flex-col border-l border-white/10 bg-[#101010] transition-transform duration-500 ease-luxe ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4eee8]">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="-mr-1.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#f4eee8] transition-colors hover:border-[#C6A16A] hover:text-[#C6A16A]"
          >
            <X size={17} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <FilterSidebar filters={filters} counts={counts} onToggle={onToggle} onClear={onClear} />
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-[#C6A16A] py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0D0D0D] transition-colors hover:bg-[#d8b47e]"
          >
            Show {resultCount} {resultCount === 1 ? 'Product' : 'Products'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('popularity');
  const [page, setPage] = useState(1);
  const [desktopSidebar, setDesktopSidebar] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [wishlist, setWishlist] = usePersistentState('lumiere-wishlist', []);
  const [bag, setBag] = usePersistentState('lumiere-bag', []);

  const shopRef = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  };

  const counts = useMemo(() => {
    const base =
      activeCategory === ALL_CATEGORY ? products : products.filter((p) => p.category === activeCategory);
    const result = {};
    for (const group of filterGroups) {
      result[group.key] = {};
      for (const option of group.options) {
        result[group.key][option] = base.filter((p) => p[group.key] === option).length;
      }
    }
    return result;
  }, [activeCategory]);

  const filtered = useMemo(() => {
    let list = products.filter(
      (product) =>
        (activeCategory === ALL_CATEGORY || product.category === activeCategory) &&
        Object.entries(filters).every(
          ([key, selected]) => selected.length === 0 || selected.includes(product[key]),
        ),
    );

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list = [...list].sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => b.popularity - a.popularity);
    }

    return list;
  }, [activeCategory, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const selectCategory = (key) => {
    setActiveCategory(key);
    setPage(1);
    if (window.matchMedia('(min-width: 1024px)').matches) {
      shopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFilter = (groupKey, option) => {
    setFilters((current) => {
      const selected = current[groupKey] || [];
      const next = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      return { ...current, [groupKey]: next };
    });
  };

  const clearAll = () => {
    setFilters({});
    setActiveCategory(ALL_CATEGORY);
    setPage(1);
  };

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const has = current.includes(product.id);
      showToast(has ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`);
      return has ? current.filter((id) => id !== product.id) : [...current, product.id];
    });
  };

  const addToBag = (product) => {
    setBag((current) => {
      const existing = current.find((entry) => entry.id === product.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === product.id ? { ...entry, qty: entry.qty + 1 } : entry,
        );
      }
      return [...current, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
    showToast(`${product.name} added to bag`);
  };

  const onFilterControl = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      setDesktopSidebar((value) => !value);
    } else {
      setDrawerOpen(true);
    }
  };

  return (
    <main>
      <CollectionsHero
        onExplore={() =>
          shopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      />

      <CategoryRow active={activeCategory} onSelect={selectCategory} />

      <section id="shop" ref={shopRef} className="scroll-mt-20 bg-[#101010]" aria-label="Product catalogue">
        <div className="mx-auto w-full max-w-[90rem] px-5 pb-20 pt-9 sm:px-7 sm:pt-12 lg:px-10 lg:pb-28 lg:pt-14">
          <div
            className={`grid items-start gap-10 transition-[grid-template-columns] duration-500 ease-luxe lg:gap-12 ${
              desktopSidebar ? 'lg:grid-cols-[240px_1fr]' : 'lg:grid-cols-1'
            }`}
          >
            {desktopSidebar && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1 [scrollbar-width:thin]">
                  <FilterSidebar
                    filters={filters}
                    counts={counts}
                    onToggle={toggleFilter}
                    onClear={clearAll}
                  />
                </div>
              </aside>
            )}

            <div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                <p className="text-[11px] tracking-wide text-[#a7a19b]">
                  Showing <span className="text-[#f4eee8]">{visible.length}</span> of{' '}
                  <span className="text-[#f4eee8]">{filtered.length}</span> results
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onFilterControl}
                    aria-expanded={desktopSidebar}
                    aria-controls="filter-sidebar"
                    className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#f4eee8] transition-colors duration-300 hover:border-[#C6A16A]/70 hover:text-[#C6A16A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
                  >
                    <SlidersHorizontal size={14} strokeWidth={1.6} />
                    Filter
                  </button>

                  <label className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#a7a19b]">
                      Sort By
                    </span>
                    <select
                      value={sort}
                      onChange={(event) => {
                        setSort(event.target.value);
                        setPage(1);
                      }}
                      className="rounded-full border border-white/15 bg-transparent px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#f4eee8] outline-none transition-colors hover:border-[#C6A16A]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] [&>option]:bg-[#1a1a1a]"
                    >
                      <option value="popularity">Popularity</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest Arrivals</option>
                      <option value="rating">Customer Rating</option>
                    </select>
                  </label>
                </div>
              </div>

              {visible.length > 0 ? (
                <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:mt-10 lg:grid-cols-3 lg:gap-y-14">
                  {visible.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      wishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={() => toggleWishlist(product)}
                      onAddToBag={addToBag}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-14 flex flex-col items-center py-20 text-center">
                  <Sparkles size={26} strokeWidth={1.2} className="text-[#C6A16A]" aria-hidden="true" />
                  <h2 className="mt-5 font-serif text-2xl text-[#f4eee8]">No pieces found</h2>
                  <p className="mt-3 max-w-sm text-[12px] font-light leading-relaxed text-[#a7a19b]">
                    Nothing in the collection matches your current filters. Try clearing a few
                    selections to see more of our jewellery.
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-7 rounded-full border border-[#C6A16A]/60 px-7 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C6A16A] transition-colors hover:bg-[#C6A16A] hover:text-[#0D0D0D]"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              <Pagination page={safePage} total={totalPages} onChange={setPage} />
            </div>
          </div>
        </div>
      </section>

      <BenefitsBar />

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        counts={counts}
        onToggle={toggleFilter}
        onClear={clearAll}
        resultCount={filtered.length}
      />

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[70] w-[92vw] max-w-sm -translate-x-1/2 rounded-full border border-[#C6A16A]/40 bg-[#1c1a18]/95 px-5 py-3 text-center text-[11px] font-light tracking-wide text-[#f4eee8] shadow-luxe backdrop-blur-md"
        >
          {toast}
        </div>
      )}
    </main>
  );
}