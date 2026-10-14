import { useEffect, useState } from 'react';
import { Heart, Minus, Plus, ShoppingBag, Trash2, X, CheckCircle2 } from 'lucide-react';
import SmartImage from '../common/SmartImage';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../data/products';
import { startCheckout } from '../../services/checkout';

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

function PlacedState({ orderId, onDone }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C6A16A]/60 text-[#C6A16A]">
        <CheckCircle2 size={24} strokeWidth={1.4} />
      </span>
      <p className="mt-5 font-serif text-[19px] text-[#f2ece8]">Thank you</p>
      <p className="mt-2 max-w-[16rem] text-[12px] font-light leading-relaxed text-[#9d968f]">
        {orderId ? `Your order ${orderId} has been placed. ` : 'Your order has been placed. '}
        You&apos;ll receive a confirmation by email shortly.
      </p>
      <button
        type="button"
        onClick={onDone}
        className="mt-6 rounded-full border border-[#C6A16A]/50 px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C6A16A] transition-colors hover:bg-[#C6A16A] hover:text-[#0D0D0D]"
      >
        Continue Shopping
      </button>
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
    clearBag,
    drawer,
    openDrawer,
    closeDrawer,
  } = useCart();

  const [checkout, setCheckout] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
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

  useEffect(() => {
    if (tab !== 'bag') setCheckout(null);
  }, [tab]);

  const handleCheckout = async () => {
    if (bag.length === 0) return;
    setCheckout('loading');
    try {
      const result = await startCheckout(bag);
      if (result && typeof result.url === 'string' && result.url) {
        setCheckout('redirecting');
        return;
      }
      setPlacedOrder(result?.orderId || null);
      setCheckout('placed');
      clearBag();
    } catch (error) {
      setCheckout(error.message === 'checkout-not-configured' ? 'not-configured' : 'error');
    }
  };

  const dismissPlaced = () => {
    setPlacedOrder(null);
    setCheckout(null);
    closeDrawer();
  };

  const handleAddWishlistItem = (product) => {
    addToBag(product, { qty: 1 });
    openDrawer('bag');
  };

  const tabs = [
    { id: 'bag', label: 'Bag', count: bagCount },
    { id: 'wishlist', label: 'Wishlist', count: wishlistCount },
  ];

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
        aria-label="Shopping bag and wishlist"
        className={`absolute right-0 top-0 flex h-full w-full flex-col border-l border-white/10 bg-[#141312] shadow-luxe transition-transform duration-500 ease-luxe sm:max-w-[26rem] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 pt-5">
          <div className="flex items-center gap-6">
            {tabs.map((entry) => {
              const selected = entry.id === tab;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => openDrawer(entry.id)}
                  aria-pressed={selected}
                  className={`relative flex items-center gap-2 pb-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
                    selected ? 'text-[#f2ece8]' : 'text-[#f2ece8]/50 hover:text-[#f2ece8]/80'
                  }`}
                >
                  {entry.label}
                  <span className="text-[10px] text-[#C6A16A]">{entry.count}</span>
                  {selected && <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#C6A16A]" />}
                </button>
              );
            })}
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
              placedOrder !== null || checkout === 'placed' ? (
                <PlacedState orderId={placedOrder} onDone={dismissPlaced} />
              ) : (
                <EmptyState
                  icon={<ShoppingBag size={22} strokeWidth={1.4} />}
                  title="Your bag is empty"
                  copy="Pieces you add to your bag will appear here, ready for checkout."
                  onBrowse={closeDrawer}
                />
              )
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
                <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.16em] text-[#9d968f]">
                  <span>Subtotal</span>
                  <span className="text-[15px] tabular-nums tracking-normal text-[#f2ece8]">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <p className="mt-2 text-[10.5px] font-light text-[#7c766f]">
                  Shipping &amp; taxes calculated at checkout.
                </p>

                {checkout === 'not-configured' && (
                  <p className="mt-3 rounded-[8px] border border-[#C6A16A]/30 bg-[#C6A16A]/10 px-3 py-2 text-[11px] leading-relaxed text-[#e2c694]">
                    Checkout is not connected yet — your items stay saved in your bag.
                  </p>
                )}
                {checkout === 'error' && (
                  <p className="mt-3 rounded-[8px] border border-[#e07a7a]/30 bg-[#e07a7a]/10 px-3 py-2 text-[11px] leading-relaxed text-[#f0b4b4]">
                    We could not start checkout right now. Please try again.
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={checkout === 'loading' || checkout === 'redirecting'}
                  className="mt-4 w-full rounded-full bg-[#C6A16A] py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0D0D0D] transition-colors hover:bg-[#d8b47e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {checkout === 'loading' ? 'Starting…' : 'Checkout'}
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
                          Add to Bag
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
