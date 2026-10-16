import { Check, Loader2, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import {
  formatINR,
  materialOf,
  sizesOf,
  weightOf,
  finishesOf,
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
  const needsSize = Boolean(sizes) && !selectedSize;
  const disabled = needsSize || adding;

  const metalLabel = finishes ? finishes.map((finish) => finish.name).join(' / ') : materialOf(product);
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

      {/* Metal selection */}
      {finishes && finishes.length > 0 && (
        <div className="mt-7">
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#f2ece8]">
              Metal
            </p>
            <span className="text-[11px] text-[#bcb4ad]">{selectedFinish?.name}</span>
          </div>
          <div className="mt-3 flex items-center gap-4">
            {finishes.map((finish) => {
              const selected = selectedFinish?.name === finish.name;
              return (
                <button
                  key={finish.name}
                  type="button"
                  onClick={() => onSelectFinish(finish)}
                  aria-label={`Select metal ${finish.name}`}
                  aria-pressed={selected}
                  className={`flex items-center gap-2 rounded-full border py-1 pl-1 pr-3.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] ${
                    selected ? 'border-[#C6A16A]' : 'border-white/15 hover:border-white/40'
                  }`}
                >
                  <span
                    className="h-6 w-6 rounded-full border border-white/25"
                    style={{ backgroundColor: finish.color }}
                  />
                  <span className="text-[11px] font-light text-[#e6e0d8]">{finish.name}</span>
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
            <span className="text-[11px] text-[#8f8a84]">Size guide</span>
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
        </div>
      )}

      {/* Quantity + availability */}
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-white/15">
          <button
            type="button"
            onClick={() => onQtyChange(Math.max(1, qty - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="flex h-11 w-11 items-center justify-center text-[#f2ece8] transition-colors hover:text-[#C6A16A] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={15} strokeWidth={1.6} />
          </button>
          <span aria-live="polite" className="w-8 text-center text-[13px] text-[#f2ece8]">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => onQtyChange(Math.min(9, qty + 1))}
            disabled={qty >= 9}
            aria-label="Increase quantity"
            className="flex h-11 w-11 items-center justify-center text-[#f2ece8] transition-colors hover:text-[#C6A16A] disabled:cursor-not-allowed disabled:opacity-40"
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

      {/* Purchase actions */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-3">
        <button
          type="button"
          onClick={onBuyNow}
          disabled={disabled}
          className="inline-flex h-16 flex-1 items-center justify-center gap-2.5 rounded-full bg-[#eee5db] px-8 text-[15px] font-semibold uppercase tracking-[0.18em] text-[#171513] transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:gap-2 sm:text-[11px]"
        >
          {adding ? (
            <Loader2 size={20} className="h-5 w-5 animate-spin sm:h-4 sm:w-4" />
          ) : (
            <Check size={20} strokeWidth={2} className="h-5 w-5 sm:h-4 sm:w-4" />
          )}
          Buy Now
        </button>

        <button
          type="button"
          onClick={onAddToCart}
          disabled={disabled}
          className="inline-flex h-16 flex-1 items-center justify-center gap-2.5 rounded-full bg-[#303030] px-8 text-[15px] font-medium uppercase tracking-[0.16em] text-[#f2ece8] transition-colors duration-300 hover:bg-[#3a3a3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:gap-2 sm:text-[11px]"
        >
          <ShoppingCart size={20} strokeWidth={1.8} className="h-5 w-5 sm:h-4 sm:w-4" />
          Add To Cart
        </button>
      </div>
    </div>
  );
}
