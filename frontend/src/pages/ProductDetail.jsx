import { useEffect, useRef, useState } from 'react';
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import SmartImage from '../components/common/SmartImage';
import ProductCard from '../components/product/ProductCard';
import {
  products,
  formatINR,
  discountPercent,
  getGallery,
  getRelated,
  describeProduct,
  productSpecs,
  reviewCount,
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

function NotFound() {
  return (
    <main className="bg-[#0D0D0D]">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-shell flex-col items-center justify-center px-6 pt-24 text-center">
        <Sparkles size={28} strokeWidth={1.2} className="text-[#C6A16A]" aria-hidden="true" />
        <h1 className="mt-5 font-serif text-3xl text-[#f4eee8]">Piece not found</h1>
        <p className="mt-3 max-w-sm text-[12px] font-light leading-relaxed text-[#a7a19b]">
          The jewellery you are looking for may have been moved or is no longer available.
        </p>
        <a
          href="#/collections"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#C6A16A]/60 px-7 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C6A16A] transition-colors duration-300 hover:bg-[#C6A16A] hover:text-[#0D0D0D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
        >
          Back to Collections
          <ArrowRight size={14} strokeWidth={1.6} />
        </a>
      </div>
    </main>
  );
}

const trust = [
  { icon: Truck, label: 'Free Shipping' },
  { icon: RotateCcw, label: '15-Day Returns' },
  { icon: ShieldCheck, label: 'Certified Authentic' },
  { icon: CreditCard, label: 'Secure Payment' },
];

function Stars({ rating, size = 14 }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          size={size}
          strokeWidth={1.4}
          className={
            index <= Math.round(rating) ? 'fill-[#C6A16A] text-[#C6A16A]' : 'text-[#6b6560]'
          }
        />
      ))}
    </span>
  );
}

export default function ProductDetail({ productId }) {
  const product = products.find((item) => item.id === productId);

  const [wishlist, setWishlist] = usePersistentState('lumiere-wishlist', []);
  const [bag, setBag] = usePersistentState('lumiere-bag', []);
  const [toast, setToast] = useState(null);
  const [activeImage, setActiveImage] = useState(product ? product.image : '');
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product?.variants ? product.variants[0] : null);
  const toastTimer = useRef(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  useEffect(() => {
    setActiveImage(product ? product.image : '');
    setQty(1);
    setVariant(product?.variants ? product.variants[0] : null);
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!product) return <NotFound />;

  const gallery = getGallery(product);
  const related = getRelated(product, 4);
  const off = discountPercent(product);
  const wishlisted = wishlist.includes(product.id);
  const specs = productSpecs(product);

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  };

  const toggleWishlist = (item) => {
    setWishlist((current) => {
      const has = current.includes(item.id);
      showToast(has ? `${item.name} removed from wishlist` : `${item.name} saved to wishlist`);
      return has ? current.filter((id) => id !== item.id) : [...current, item.id];
    });
  };

  const addToBag = (item, quantity = 1) => {
    setBag((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + quantity } : entry,
        );
      }
      return [...current, { id: item.id, name: item.name, price: item.price, qty: quantity }];
    });
    showToast(`${item.name}${quantity > 1 ? ` × ${quantity}` : ''} added to bag`);
  };

  return (
    <main className="bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-shell px-6 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-14 lg:pb-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] text-[#8f8a84]">
            <li>
              <a href="#home" className="transition-colors hover:text-[#C6A16A]">
                Home
              </a>
            </li>
            <li aria-hidden="true" className="text-[#4a4640]">
              <ChevronRight size={12} strokeWidth={1.6} />
            </li>
            <li>
              <a href="#/collections" className="transition-colors hover:text-[#C6A16A]">
                Collections
              </a>
            </li>
            <li aria-hidden="true" className="text-[#4a4640]">
              <ChevronRight size={12} strokeWidth={1.6} />
            </li>
            <li>
              <a href="#/collections" className="transition-colors hover:text-[#C6A16A]">
                {product.category}
              </a>
            </li>
            <li aria-hidden="true" className="text-[#4a4640]">
              <ChevronRight size={12} strokeWidth={1.6} />
            </li>
            <li className="text-[#f4eee8]">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* ------------------------------ Gallery ------------------------------ */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[12px] bg-[#454545]">
              <SmartImage
                key={activeImage}
                src={activeImage}
                alt={product.alt}
                priority
                className="h-full w-full"
                imgClassName="transition-transform duration-[1400ms] ease-luxe hover:scale-[1.04]"
              />

              {(off != null || product.badge) && (
                <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#C6A16A] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#0D0D0D]">
                  {off != null ? `${off}% OFF` : product.badge}
                </span>
              )}

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-pressed={wishlisted}
                aria-label={
                  wishlisted
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
                }
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-[#C6A16A]/60 hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
              >
                <Heart
                  size={17}
                  strokeWidth={1.6}
                  className={wishlisted ? 'fill-[#C6A16A] text-[#C6A16A]' : ''}
                />
              </button>
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {gallery.map((source) => {
                  const selected = activeImage === source;
                  return (
                    <button
                      key={source}
                      type="button"
                      onClick={() => setActiveImage(source)}
                      aria-label="View this image"
                      aria-pressed={selected}
                      className={`relative aspect-square overflow-hidden rounded-[8px] border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] ${
                        selected ? 'border-[#C6A16A]' : 'border-white/12 hover:border-white/30'
                      }`}
                    >
                      <SmartImage src={source} alt="" className="h-full w-full" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ------------------------------- Details ------------------------------ */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C6A16A]">
              {product.category} COLLECTION
            </p>

            <h1 className="mt-3 font-serif text-[28px] font-normal leading-tight tracking-[-0.01em] text-[#f4eee8] sm:text-[34px]">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Stars rating={product.rating} />
              <span className="text-[11px] text-[#a7a19b]">
                {product.rating.toFixed(1)} · {reviewCount(product)} reviews
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="text-[24px] font-medium tracking-wide text-[#f4eee8]">
                {formatINR(product.price)}
              </span>
              {product.compareAt && (
                <span className="text-[15px] font-light text-[#8f8a84] line-through">
                  {formatINR(product.compareAt)}
                </span>
              )}
              {off != null && (
                <span className="rounded-full bg-[#C6A16A]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#C6A16A]">
                  {off}% Off
                </span>
              )}
            </div>
            <p className="mt-1 text-[11px] text-[#8f8a84]">Inclusive of all taxes</p>

            <p className="mt-6 max-w-[520px] text-[13px] font-light leading-[1.75] text-[#b8b1a9]">
              {describeProduct(product)}
            </p>

            {product.variants && (
              <div className="mt-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#f4eee8]">
                  Finish
                </p>
                <div className="mt-3 flex items-center gap-3">
                  {product.variants.map((color) => {
                    const selected = variant === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setVariant(color)}
                        aria-label={`Select finish ${color}`}
                        aria-pressed={selected}
                        className={`h-9 w-9 rounded-full border-2 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] ${
                          selected ? 'border-[#C6A16A]' : 'border-white/20 hover:border-white/50'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-white/15">
                <button
                  type="button"
                  onClick={() => setQty((value) => Math.max(1, value - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-11 items-center justify-center text-[#f4eee8] transition-colors hover:text-[#C6A16A] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={15} strokeWidth={1.6} />
                </button>
                <span aria-live="polite" className="w-8 text-center text-[13px] text-[#f4eee8]">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((value) => Math.min(9, value + 1))}
                  disabled={qty >= 9}
                  aria-label="Increase quantity"
                  className="flex h-11 w-11 items-center justify-center text-[#f4eee8] transition-colors hover:text-[#C6A16A] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={15} strokeWidth={1.6} />
                </button>
              </div>

              <span
                className={`text-[11px] uppercase tracking-[0.14em] ${
                  product.availability === 'In Stock' ? 'text-[#9fc6a2]' : 'text-[#C6A16A]'
                }`}
              >
                {product.availability}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => addToBag(product, qty)}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#C6A16A] px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0D0D0D] transition-colors duration-300 hover:bg-[#d8b47e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
              >
                <ShoppingBag size={16} strokeWidth={1.8} />
                Add to Bag
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-pressed={wishlisted}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-[11px] font-medium uppercase tracking-[0.16em] text-[#f4eee8] transition-colors duration-300 hover:border-[#C6A16A] hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
              >
                <Heart
                  size={16}
                  strokeWidth={1.8}
                  className={wishlisted ? 'fill-[#C6A16A] text-[#C6A16A]' : ''}
                />
                {wishlisted ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-7">
              {trust.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <item.icon size={18} strokeWidth={1.4} className="text-[#C6A16A]" aria-hidden="true" />
                  <span className="text-[11px] font-light text-[#cdc6be]">{item.label}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-7">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8f8a84]">{label}</dt>
                  <dd className="mt-1 text-[12.5px] text-[#e6e0d8]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-label="You may also like" className="bg-[#101010] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-7 lg:px-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C6A16A]">
                  Complete the Look
                </p>
                <h2 className="mt-3 font-serif text-[26px] font-normal text-[#f4eee8] sm:text-[30px]">
                  You May Also Like
                </h2>
              </div>
              <a
                href="#/collections"
                className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#C6A16A] transition-colors hover:text-[#e2c694]"
              >
                View All
                <ArrowRight
                  size={14}
                  strokeWidth={1.6}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:mt-10 lg:grid-cols-4 lg:gap-y-14">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  wishlisted={wishlist.includes(item.id)}
                  onToggleWishlist={toggleWishlist}
                  onAddToBag={(target) => addToBag(target, 1)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#C6A16A]/40 bg-[#1a1a1a]/95 px-5 py-2.5 text-[11px] tracking-wide text-[#f4eee8] shadow-luxe backdrop-blur"
        >
          {toast}
        </div>
      )}
    </main>
  );
}
