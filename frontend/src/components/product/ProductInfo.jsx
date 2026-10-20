import { useState } from 'react';
import { Check, ChevronDown, Loader2, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import {
  formatINR,
  materialOf,
  sizesOf,
  weightOf,
  finishesOf,
  isOutOfStock,
  isLowStock,
} from '../../data/products';

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

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline gap-3 py-2">
      <dt className="w-24 shrink-0 text-[11px] uppercase tracking-[0.14em] text-[#8f8a84]">
        {label}
      </dt>
      <dd className="text-[12.5px] font-light text-[#e6e0d8]">{value}</dd>
    </div>
  );
}

/* Reference chart shown by the "Size guide" link beside the ring-size picker. */
const sizeGuide = [
  { us: '5', diameter: '15.7', circumference: '49.3', india: '9' },
  { us: '6', diameter: '16.5', circumference: '51.9', india: '11' },
  { us: '7', diameter: '17.3', circumference: '54.4', india: '13' },
  { us: '8', diameter: '18.1', circumference: '57.0', india: '15' },
  { us: '9', diameter: '18.9', circumference: '59.5', india: '17' },
  { us: '10', diameter: '19.8', circumference: '62.1', india: '19' },
  { us: '11', diameter: '20.6', circumference: '64.6', india: '21' },
];

export default function ProductInfo({
  product,
  categoryLabel,
  description,
  off,
  reviews,
  selectedFinish,
  onSelectFinish,
  selectedSize,
  onSelectSize,
  qty,
  onQtyChange,
  onAddToCart,
  onBuyNow,
  adding,
}) {
  const sizes = sizesOf(product);
  const finishes = finishesOf(product);
  const weight = weightOf(product);
  const soldOut = isOutOfStock(product);
  const lowStock = !soldOut && isLowStock(product);
  const needsSize = Boolean(sizes) && !selectedSize;
  const disabled = needsSize || adding || soldOut;
  /* The bag is the source of truth. qty is 0 whenever this piece is not in
     the cart, and the − qty + control is hidden entirely in that state so a
     quantity of 0 is never shown. */
  const inCart = qty > 0;
  const safeQty = Math.max(1, qty);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const metalLabel = finishes.map((finish) => finish.name).filter(Boolean).join(' / ') || materialOf(product);
  const sizeLabel = sizes ? sizes.join(', ') : null;

  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C6A16A]">
        {categoryLabel}
      </p>

      <h1 className="mt-3 font-serif text-[28px] font-normal leading-tight tracking-[-0.01em] text-[#f2ece8] sm:text-[34px]">
        {product.name}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Stars rating={product.rating} />
        <span className="text-[11px] text-[#bcb4ad]">
          {product.rating.toFixed(1)} · {reviews} Reviews
        </span>
      </div>

      <p className="mt-5 max-w-[520px] text-[13px] font-light leading-[1.75] text-[#bcb4ad]">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <span className="text-[28px] font-medium tracking-wide text-[#f2ece8]">
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

      {/* Product information */}
      <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
        <InfoRow label="Material" value={materialOf(product)} />
        <InfoRow label="Weight" value={weight} />
        <InfoRow label="Metal" value={metalLabel} />
        <InfoRow label="Size" value={sizeLabel} />
      </dl>

      {/* Metal / shade selection */}
      {finishes.length > 0 && (
        <div className="mt-7">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#f2ece8]">
              Metal
            </p>
            <span className="text-[11px] text-[#bcb4ad]">
              {selectedFinish?.name ? `${selectedFinish.name} · ` : ''}
              {finishes.length} {finishes.length === 1 ? 'shade' : 'shades'}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {finishes.map((finish) => {
              const selected =
                selectedFinish?.color === finish.color && selectedFinish?.name === finish.name;
              return (
                <button
                  key={finish.name || finish.color}
                  type="button"
                  onClick={() => onSelectFinish(finish)}
                  aria-label={finish.name ? `Select ${finish.name}` : 'Select shade'}
                  aria-pressed={selected}
                  className={`flex items-center gap-2 rounded-full border py-1 pl-1 pr-3.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] ${
                    selected ? 'border-[#C6A16A]' : 'border-white/15 hover:border-white/40'
                  }`}
                >
                  <span
                    className="h-6 w-6 rounded-full border border-white/25"
                    style={{ backgroundColor: finish.color }}
                  />
                  {finish.name && (
                    <span className="text-[11px] font-light text-[#e6e0d8]">{finish.name}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Ring size selector */}
      {sizes && (
        <div className="mt-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#f2ece8]">
              Ring Size
            </p>
            <button
              type="button"
              onClick={() => setSizeGuideOpen((value) => !value)}
              aria-expanded={sizeGuideOpen}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#8f8a84] transition-colors hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
            >
              Size guide
              <ChevronDown
                size={13}
                strokeWidth={1.8}
                className={`transition-transform duration-300 ${sizeGuideOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5" role="group" aria-label="Select ring size">
            {sizes.map((size) => {
              const selected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSelectSize(size)}
                  aria-pressed={selected}
                  aria-label={`Select size ${size}`}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-[8px] border px-3 text-[12px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] ${
                    selected
                      ? 'border-[#eee5db] bg-[#eee5db] text-[#171513]'
                      : 'border-white/15 text-[#e6e0d8] hover:border-white/40'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {needsSize && (
            <p className="mt-2.5 text-[11px] text-[#C6A16A]" role="status">
              Please select a ring size to continue.
            </p>
          )}

          {sizeGuideOpen && (
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/25">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-[12px]">
                  <thead>
                    <tr className="text-[9.5px] uppercase tracking-[0.14em] text-[#8f8a84]">
                      <th className="px-3 py-2 font-medium">US</th>
                      <th className="px-3 py-2 font-medium">Inner Ø (mm)</th>
                      <th className="px-3 py-2 font-medium">Circumference (mm)</th>
                      <th className="px-3 py-2 font-medium">India</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#e6e0d8]">
                    {sizeGuide.map((row) => (
                      <tr key={row.us} className="border-t border-white/10">
                        <td className="px-3 py-2">{row.us}</td>
                        <td className="px-3 py-2">{row.diameter}</td>
                        <td className="px-3 py-2">{row.circumference}</td>
                        <td className="px-3 py-2">{row.india}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="border-t border-white/10 px-3 py-2.5 text-[10.5px] font-light leading-relaxed text-[#a7a19b]">
                Measure the inner diameter of a ring that already fits, or wrap a strip of paper
                around your finger for the circumference. Between sizes? We recommend sizing up.
              </p>
            </div>
          )}
        </div>
      )}

      {/* In-cart state + availability. The stepper itself lives with the
          purchase actions and only renders once the piece is in the bag. */}
      <div className="mt-7 flex flex-wrap items-center gap-4">
        {inCart && (
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C6A16A]/45 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#C6A16A]">
            <Check size={12} strokeWidth={2.4} />
            In Cart
          </span>
        )}

        <span
          className={`text-[11px] uppercase tracking-[0.14em] ${
            soldOut || lowStock
              ? 'text-[#e0a08f]'
              : product.availability === 'In Stock'
                ? 'text-[#9fc6a2]'
                : 'text-[#C6A16A]'
          }`}
        >
          {soldOut
            ? 'Out of Stock'
            : lowStock
              ? `Only ${product.stock} left`
              : product.availability}
        </span>
      </div>

      {/* Purchase actions */}
      {soldOut ? (
        <div className="mt-6">
          <button
            type="button"
            disabled
            className="inline-flex h-[68px] w-full cursor-not-allowed items-center justify-center rounded-full bg-[#303030] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8f8a84] opacity-70 sm:h-12 sm:text-[11px]"
          >
            Out of Stock
          </button>
        </div>
      ) : (
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-3">
        <button
          type="button"
          onClick={onBuyNow}
          disabled={disabled}
          className="inline-flex h-[72px] flex-1 items-center justify-center gap-3 rounded-full bg-[#eee5db] px-8 text-[16px] font-semibold uppercase tracking-[0.18em] text-[#171513] transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:gap-2 sm:text-[11px]"
        >
          {adding ? (
            <Loader2 size={22} className="h-[22px] w-[22px] animate-spin sm:h-4 sm:w-4" />
          ) : (
            <Check size={22} strokeWidth={2} className="h-[22px] w-[22px] sm:h-4 sm:w-4" />
          )}
          Buy Now
        </button>

        {inCart ? (
          /* In the bag: the stepper replaces Add To Cart and never shows 0.
             Minus at 1 removes the line (handled by setBagQty) and this
             control disappears. */
          <div className="flex h-[72px] w-full shrink-0 items-center justify-between rounded-full border border-[#C6A16A]/50 bg-[#1a1816] px-2 sm:h-12 sm:w-[190px] sm:justify-center sm:gap-1 sm:px-3">
            <button
              type="button"
              onClick={() => onQtyChange(Math.max(0, safeQty - 1))}
              disabled={soldOut}
              aria-label="Decrease quantity"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#f2ece8] transition-colors hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus size={16} strokeWidth={1.6} />
            </button>
            <span
              aria-live="polite"
              className="w-10 shrink-0 text-center text-[16px] font-semibold tabular-nums text-[#f2ece8] sm:text-[13px]"
            >
              {safeQty}
            </span>
            <button
              type="button"
              onClick={() => onQtyChange(Math.min(9, safeQty + 1))}
              disabled={safeQty >= 9 || soldOut}
              aria-label="Increase quantity"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#f2ece8] transition-colors hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={16} strokeWidth={1.6} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAddToCart}
            disabled={disabled}
            className="inline-flex h-[72px] flex-1 items-center justify-center gap-3 rounded-full bg-[#303030] px-8 text-[16px] font-medium uppercase tracking-[0.16em] text-[#f2ece8] transition-colors duration-300 hover:bg-[#3a3a3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:gap-2 sm:text-[11px]"
          >
            <ShoppingCart size={22} strokeWidth={1.8} className="h-[22px] w-[22px] sm:h-4 sm:w-4" />
            Add To Cart
          </button>
        )}
      </div>
      )}
    </div>
  );
}
