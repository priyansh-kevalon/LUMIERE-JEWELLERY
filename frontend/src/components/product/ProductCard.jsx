import { Heart, Minus, Plus } from 'lucide-react';
import SmartImage from '../common/SmartImage';
import { formatINR, discountPercent } from '../../data/products';
import { useCart } from '../../context/CartContext';

function ProductCard({ product, wishlisted, onToggleWishlist, onAddToBag, showAddToBag = true }) {
  const off = discountPercent(product);
  const href = `#/product/${product.id}`;
  const { bag, setBagQty } = useCart();
  const variants = Array.isArray(product.variants) ? product.variants : [];

  const productLines = bag.filter((line) => line.id === product.id);
  const cartLine =
    productLines.find(
      (line) => (line.size ?? null) === null && (line.metal ?? null) === null,
    ) ||
    productLines[0] ||
    null;
  const qty = productLines.reduce((sum, line) => sum + line.qty, 0);

  const addToBag = (event) => {
    event.preventDefault();
    onAddToBag(product);
  };

  const decrement = (event) => {
    event.preventDefault();
    if (!cartLine) return;
    setBagQty(cartLine, cartLine.qty - 1);
  };

  const increment = (event) => {
    event.preventDefault();
    if (!cartLine) return;
    setBagQty(cartLine, cartLine.qty + 1);
  };

  const toggleWishlist = (event) => {
    event.preventDefault();
    onToggleWishlist(product);
  };

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-[9px] bg-[#454545]">
        <a
          href={href}
          aria-label={`View details for ${product.name}`}
          className="absolute inset-0 block"
        >
          <SmartImage
            src={product.image}
            alt={product.alt}
            className="h-full w-full"
            imgClassName="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.06]"
          />
        </a>

        {(off != null || product.badge) && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#0D0D0D]/85 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#E7C98A] ring-1 ring-[#C6A16A]/70 shadow-[0_2px_8px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            {off != null ? `${off}% OFF` : product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={toggleWishlist}
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

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-2 min-h-[2.75em] text-[13px] font-light leading-snug text-[#f4eee8]">
          <a href={href} className="transition-colors duration-300 hover:text-[#C6A16A]">
            {product.name}
          </a>
        </h3>

        {variants.length > 0 && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5" aria-hidden="true">
            {variants.map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full border border-white/25"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="ml-1 text-[9px] uppercase tracking-[0.14em] text-[#7c7670]">
              {variants.length} {variants.length === 1 ? 'shade' : 'shades'}
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

        {showAddToBag && (
          <div className="mt-auto pt-3.5">
            {qty > 0 ? (
              <div className="flex w-full items-stretch overflow-hidden rounded-[5px] border border-[#C6A16A]/50">
                <button
                  type="button"
                  onClick={decrement}
                  aria-label={`Decrease quantity of ${product.name}`}
                  className="flex w-10 items-center justify-center py-2 text-[#f4eee8] transition-colors duration-300 hover:bg-white/[0.06] hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#C6A16A]"
                >
                  <Minus size={14} strokeWidth={1.8} />
                </button>
                <span
                  aria-live="polite"
                  className="flex flex-1 items-center justify-center text-[12px] tabular-nums text-[#f4eee8]"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={increment}
                  aria-label={`Increase quantity of ${product.name}`}
                  className="flex w-10 items-center justify-center py-2 text-[#f4eee8] transition-colors duration-300 hover:bg-white/[0.06] hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#C6A16A]"
                >
                  <Plus size={14} strokeWidth={1.8} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={addToBag}
                className="w-full rounded-[5px] border border-white/15 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#f4eee8] transition-all duration-300 hover:border-[#C6A16A] hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
              >
                Add to Cart
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
