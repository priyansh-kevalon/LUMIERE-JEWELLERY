import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, Copy, Heart, Minus, Plus, ShoppingCart, TicketPercent, Trash2, X } from 'lucide-react';
import SmartImage from '../common/SmartImage';
import { useCart } from '../../context/CartContext';
import { useCoupons } from '../../data/adminData';
import { formatINR } from '../../data/products';
import { activeCoupons, couponDiscount, couponMinMet, couponValueLabel } from '../../data/coupons';

function QtyStepper({ value, onDec, onInc }) {
  return (
    <div className="flex items-center rounded-full border border-white/15">
      <button
        type="button"
        onClick={onDec}
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center text-[#f2ece8] transition-colors hover:text-[#C6A16A]"
      >
        <Minus size={12} strokeWidth={2} />
      </button>
      <span className="w-6 text-center text-[12px] tabular-nums text-[#f2ece8]">{value}</span>
      <button
        type="button"
        onClick={onInc}
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center text-[#f2ece8] transition-colors hover:text-[#C6A16A]"
      >
        <Plus size={12} strokeWidth={2} />
      </button>
    </div>
  );
}

function CouponSection({ coupons, subtotal, appliedCode, onApply, onClear }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState('');
  const available = useMemo(() => activeCoupons(coupons), [coupons]);

  const copy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      window.setTimeout(() => setCopied((current) => (current === code ? '' : current)), 1800);
    } catch {
      /* Clipboard unavailable — the code is still shown to type manually. */
    }
  };

  if (available.length === 0) return null;

  return (
    <div className="mb-4 border-b border-white/10 pb-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between"
      >
        <span className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.16em] text-[#a9a29b]">
          <TicketPercent size={13} className="text-[#C6A16A]" /> Coupons &amp; Offers
        </span>
        <span className="flex items-center gap-2">
          {appliedCode && (
            <span className="rounded-full border border-[#C6A16A]/50 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-[#C6A16A]">
              {appliedCode} applied
            </span>
          )}
          <ChevronDown
            size={14}
            className={`text-[#8d867f] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {open && (
        <ul className="mt-3 flex max-h-[14rem] flex-col gap-2.5 overflow-y-auto pr-0.5">
          {available.map((coupon) => {
            const isApplied = appliedCode === coupon.code;
            const eligible = couponMinMet(coupon, subtotal);
            return (
              <li
                key={coupon.code}
                className={`rounded-md border px-3 py-2.5 transition-colors ${
                  isApplied ? 'border-[#C6A16A]/60 bg-[#C6A16A]/5' : 'border-white/10 bg-[#171514]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[12px] tracking-[0.08em] text-[#f2ece8]">
                    {coupon.code}
                  </span>
                  <span className="shrink-0 text-[11px] font-semibold text-[#C6A16A]">
                    {couponValueLabel(coupon)}
                  </span>
                </div>

                {coupon.description && (
                  <p className="mt-1 text-[10.5px] font-light leading-relaxed text-[#9d968f]">
                    {coupon.description}
                  </p>
                )}

                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9.5px] uppercase tracking-[0.1em] text-[#7c766f]">
                  {Number(coupon.minOrder) > 0 && <span>Min {formatINR(Number(coupon.minOrder))}</span>}
                  {coupon.firstOrderOnly && <span>First order only</span>}
                </div>

                {!eligible && (
                  <p className="mt-1 text-[9.5px] uppercase tracking-[0.1em] text-[#d8b47e]">
                    Add items worth {formatINR(Number(coupon.minOrder) - Number(subtotal || 0))} more
                  </p>
                )}

                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!eligible && !isApplied}
                    onClick={() => (isApplied ? onClear() : onApply(coupon.code))}
                    className={`flex-1 rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                      isApplied
                        ? 'border border-[#C6A16A]/60 text-[#C6A16A] hover:bg-[#C6A16A]/10'
                        : 'bg-[#C6A16A] text-[#0D0D0D] hover:bg-[#d8b47e]'
                    }`}
                  >
                    {isApplied ? 'Remove' : 'Apply'}
                  </button>
                  <button
                    type="button"
                    onClick={() => copy(coupon.code)}
                    className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#b9b2ab] transition-colors hover:border-[#C6A16A]/50 hover:text-[#C6A16A]"
                  >
                    {copied === coupon.code ? (
                      <Check size={12} strokeWidth={2} />
                    ) : (
                      <Copy size={12} strokeWidth={1.6} />
                    )}
                    {copied === coupon.code ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function EmptyState({ icon, title, copy, onBrowse }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 text-[#C6A16A]">
        {icon}
      </span>
      <p className="mt-5 font-serif text-[19px] text-[#f2ece8]">{title}</p>
      <p className="mt-2 max-w-[16rem] text-[12px] font-light leading-relaxed text-[#9d968f]">{copy}</p>
      <a
        href="#/collections"
        onClick={onBrowse}
        className="mt-6 rounded-full border border-[#C6A16A]/50 px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C6A16A] transition-colors hover:bg-[#C6A16A] hover:text-[#0D0D0D]"
      >
        Browse Collections
      </a>
    </div>
  );
}

export default function ShopDrawer() {
  const {
    bag,
    wishlistProducts,
    bagCount,
    wishlistCount,
    subtotal,
    removeFromBag,
    setBagQty,
    addToBag,
    removeFromWishlist,
    coupon,
    setCoupon,
    drawer,
    openDrawer,
    closeDrawer,
  } = useCart();

  const coupons = useCoupons();
  const appliedCoupon = useMemo(
    () => coupons.find((entry) => entry.code === coupon) || null,
    [coupons, coupon],
  );
  const couponSavings = couponDiscount(appliedCoupon, subtotal);

  const open = drawer !== null;
  const tab = drawer || 'bag';

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') closeDrawer();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, closeDrawer]);

  const handleCheckout = () => {
    closeDrawer();
    window.location.hash = '#/checkout';
  };

  const handleAddWishlistItem = (product) => {
    addToBag(product, { qty: 1 });
    openDrawer('bag');
  };

  return (
    <div
      className={`fixed inset-0 z-[80] ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close panel"
        tabIndex={open ? 0 : -1}
        onClick={closeDrawer}
        className={`absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={tab === 'bag' ? 'Cart' : 'Wishlist'}
        className={`absolute right-0 top-0 flex h-full w-full flex-col border-l border-white/10 bg-[#141312] shadow-luxe transition-transform duration-500 ease-luxe sm:max-w-[26rem] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 pt-5">
          <div className="flex items-baseline gap-2.5 pb-3">
            <h2 className="font-serif text-[16px] tracking-wide text-[#f2ece8]">
              {tab === 'bag' ? 'Your Cart' : 'Wishlist'}
            </h2>
            <span className="text-[11px] tabular-nums text-[#C6A16A]">
              {tab === 'bag' ? bagCount : wishlistCount}
            </span>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close panel"
            className="-mr-1 mb-2 flex h-9 w-9 items-center justify-center rounded-full text-[#f2ece8] transition-colors hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </header>

        {tab === 'bag' && (
          <>
            {bag.length === 0 ? (
              <EmptyState
                icon={<ShoppingCart size={22} strokeWidth={1.4} />}
                title="Your cart is empty"
                copy="Pieces you add to your cart will appear here, ready for checkout."
                onBrowse={closeDrawer}
              />
            ) : (
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <ul className="flex flex-col gap-5">
                  {bag.map((line) => (
                    <li key={`${line.id}-${line.size ?? ''}-${line.metal ?? ''}`} className="flex gap-4">
                      <a
                        href={`#/product/${line.id}`}
                        onClick={closeDrawer}
                        className="h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-[8px] bg-[#454545]"
                      >
                        <SmartImage src={line.image} alt={line.name} className="h-full w-full" />
                      </a>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <a
                            href={`#/product/${line.id}`}
                            onClick={closeDrawer}
                            className="text-[12.5px] font-light leading-snug text-[#f2ece8] transition-colors hover:text-[#C6A16A]"
                          >
                            {line.name}
                          </a>
                          <button
                            type="button"
                            onClick={() => removeFromBag(line)}
                            aria-label={`Remove ${line.name} from bag`}
                            className="-mr-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8d867f] transition-colors hover:bg-white/[0.06] hover:text-[#e07a7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
                          >
                            <Trash2 size={15} strokeWidth={1.6} />
                          </button>
                        </div>

                        {(line.metal || line.size) && (
                          <p className="mt-1 text-[10.5px] uppercase tracking-[0.12em] text-[#8d867f]">
                            {[line.metal, line.size ? `Size ${line.size}` : null]
                              .filter(Boolean)
                              .join(' · ')}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <QtyStepper
                            value={line.qty}
                            onDec={() => setBagQty(line, line.qty - 1)}
                            onInc={() => setBagQty(line, line.qty + 1)}
                          />
                          <span className="text-[12.5px] tabular-nums text-[#f2ece8]">
                            {formatINR(line.price * line.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {bag.length > 0 && (
              <footer className="border-t border-white/10 px-5 py-5">
                <CouponSection
                  coupons={coupons}
                  subtotal={subtotal}
                  appliedCode={coupon}
                  onApply={(code) => setCoupon(code)}
                  onClear={() => setCoupon(null)}
                />

                <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.16em] text-[#9d968f]">
                  <span>Subtotal</span>
                  <span className="text-[15px] tabular-nums tracking-normal text-[#f2ece8]">
                    {formatINR(subtotal)}
                  </span>
                </div>
                {couponSavings > 0 && (
                  <div className="mt-2 flex items-center justify-between text-[12px] text-[#8fbf9a]">
                    <span>Coupon ({coupon})</span>
                    <span className="tabular-nums">− {formatINR(couponSavings)}</span>
                  </div>
                )}
                <p className="mt-2 text-[10.5px] font-light text-[#7c766f]">
                  Shipping &amp; taxes calculated at checkout.
                </p>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-4 w-full rounded-full bg-[#C6A16A] py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0D0D0D] transition-colors hover:bg-[#d8b47e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="mt-2 w-full py-2 text-[10.5px] uppercase tracking-[0.18em] text-[#9d968f] transition-colors hover:text-[#f2ece8]"
                >
                  Continue Shopping
                </button>
              </footer>
            )}
          </>
        )}

        {tab === 'wishlist' && (
          <>
            {wishlistProducts.length === 0 ? (
              <EmptyState
                icon={<Heart size={22} strokeWidth={1.4} />}
                title="No saved pieces yet"
                copy="Tap the heart on any piece to keep it here for later."
                onBrowse={closeDrawer}
              />
            ) : (
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <ul className="flex flex-col gap-5">
                  {wishlistProducts.map((product) => (
                    <li key={product.id} className="flex gap-4">
                      <a
                        href={`#/product/${product.id}`}
                        onClick={closeDrawer}
                        className="h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-[8px] bg-[#454545]"
                      >
                        <SmartImage src={product.image} alt={product.name} className="h-full w-full" />
                      </a>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <a
                            href={`#/product/${product.id}`}
                            onClick={closeDrawer}
                            className="text-[12.5px] font-light leading-snug text-[#f2ece8] transition-colors hover:text-[#C6A16A]"
                          >
                            {product.name}
                          </a>
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(product.id)}
                            aria-label={`Remove ${product.name} from wishlist`}
                            className="-mr-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8d867f] transition-colors hover:bg-white/[0.06] hover:text-[#e07a7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
                          >
                            <Trash2 size={15} strokeWidth={1.6} />
                          </button>
                        </div>

                        <span className="mt-1 text-[12.5px] tabular-nums text-[#f2ece8]">
                          {formatINR(product.price)}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleAddWishlistItem(product)}
                          className="mt-auto self-start rounded-full border border-[#C6A16A]/50 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#C6A16A] transition-colors hover:bg-[#C6A16A] hover:text-[#0D0D0D]"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
