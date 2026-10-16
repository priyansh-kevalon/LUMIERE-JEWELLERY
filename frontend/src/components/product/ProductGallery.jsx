import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import SmartImage from '../common/SmartImage';

function Thumb({ src, alt, selected, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="View image"
      aria-pressed={selected}
      className={`relative shrink-0 overflow-hidden rounded-[8px] border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] ${
        selected ? 'border-[#C6A16A]' : 'border-white/12 hover:border-white/35'
      } ${className}`}
    >
      <SmartImage src={src} alt={alt} className="h-full w-full" />
    </button>
  );
}

export default function ProductGallery({
  images = [],
  active,
  onChange,
  product,
  off,
  wishlisted,
  onToggleWishlist,
  onBack,
}) {
  const index = Math.max(0, images.indexOf(active));
  const rail = images.slice(0, 3);
  const below = images.slice(3);

  const step = (delta) => {
    if (images.length < 2) return;
    const next = (index + delta + images.length) % images.length;
    onChange(images[next]);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  };

  return (
    <div>
      {/* Back + wishlist toolbar */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#bcb4ad] transition-colors hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
        >
          <ChevronLeft size={15} strokeWidth={1.8} aria-hidden="true" />
          Back
        </button>

        <button
          type="button"
          onClick={() => onToggleWishlist(product)}
          aria-pressed={wishlisted}
          aria-label={
            wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/85 transition-colors duration-300 hover:border-[#C6A16A]/60 hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
        >
          <Heart
            size={17}
            strokeWidth={1.6}
            className={wishlisted ? 'fill-[#C6A16A] text-[#C6A16A]' : ''}
          />
        </button>
      </div>

      <div className="flex gap-3 lg:gap-4">
        {/* Vertical rail — desktop */}
        <div className="hidden w-[72px] shrink-0 flex-col gap-3 xl:w-[84px] lg:flex">
          {rail.map((src) => (
            <Thumb
              key={src}
              src={src}
              alt=""
              selected={src === active}
              onClick={() => onChange(src)}
              className="aspect-[3/4] w-full"
            />
          ))}
        </div>

        {/* Main image + mobile thumbnails */}
        <div className="min-w-0 flex-1">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Product images"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="relative aspect-square overflow-hidden rounded-[12px] bg-[#454545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
          >
            <SmartImage
              key={active}
              src={active}
              alt={product.alt}
              priority
              className="h-full w-full"
              imgClassName="transition-transform duration-[1400ms] ease-luxe hover:scale-[1.04]"
            />

            {(off != null || product.badge) && (
              <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#0D0D0D]/85 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#E7C98A] ring-1 ring-[#C6A16A]/70 shadow-[0_2px_8px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                {off != null ? `${off}% OFF` : product.badge}
              </span>
            )}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/85 backdrop-blur-sm transition-colors duration-300 hover:border-[#C6A16A]/60 hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
                >
                  <ChevronLeft size={18} strokeWidth={1.6} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/85 backdrop-blur-sm transition-colors duration-300 hover:border-[#C6A16A]/60 hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
                >
                  <ChevronRight size={18} strokeWidth={1.6} />
                </button>
              </>
            )}
          </div>

          {/* Extra thumbnails — desktop */}
          {below.length > 0 && (
            <div className="mt-3 hidden grid-cols-4 gap-3 lg:grid">
              {below.map((src) => (
                <Thumb
                  key={src}
                  src={src}
                  alt=""
                  selected={src === active}
                  onClick={() => onChange(src)}
                  className="aspect-square w-full"
                />
              ))}
            </div>
          )}

          {/* Horizontal thumbnails — mobile & tablet */}
          {images.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {images.map((src) => (
                <Thumb
                  key={src}
                  src={src}
                  alt=""
                  selected={src === active}
                  onClick={() => onChange(src)}
                  className="aspect-square w-[68px] sm:w-[80px]"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
