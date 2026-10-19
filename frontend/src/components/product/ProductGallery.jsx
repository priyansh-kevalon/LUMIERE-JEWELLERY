import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import SmartImage from '../common/SmartImage';

function Thumb({ src, alt, selected, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={alt || 'View image'}
      aria-pressed={selected}
      className={`relative shrink-0 overflow-hidden rounded-[2px] bg-[#454545] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A] ${
        selected
          ? 'ring-1 ring-[#C6A16A]'
          : 'ring-1 ring-white/12 opacity-80 hover:opacity-100 hover:ring-white/35'
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
  const name = product?.name || 'Product';

  /* Right column holds up to three shots, the bottom row the next three —
     together the thumbnails wrap the main image in an "L". */
  const rightThumbs = images.slice(0, 3);
  const bottomThumbs = images.slice(3, 6);
  const hasBottom = bottomThumbs.length > 0;

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

  const mainImage = (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${name} image gallery`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="group relative aspect-square overflow-hidden bg-[#454545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
    >
      <SmartImage
        key={active}
        src={active}
        alt={`${name}${images.length > 1 ? ` — view ${index + 1}` : ''}`}
        priority
        className="h-full w-full"
        imgClassName="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.03]"
      />

      {(off != null || product?.badge) && (
        <span className="pointer-events-none absolute left-3 top-3 bg-[#0D0D0D]/85 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#E7C98A]">
          {off != null ? `${off}% OFF` : product.badge}
        </span>
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-white/70 transition-colors duration-300 hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
          >
            <ChevronLeft size={20} strokeWidth={1.4} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-white/70 transition-colors duration-300 hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
          >
            <ChevronRight size={20} strokeWidth={1.4} />
          </button>
        </>
      )}
    </div>
  );

  return (
    <div>
      {/* Back + wishlist toolbar */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#bcb4ad] transition-colors hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
        >
          <ChevronLeft size={16} strokeWidth={1.6} />
          Back
        </button>

        <button
          type="button"
          onClick={() => onToggleWishlist(product)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#bcb4ad] transition-colors duration-300 hover:text-[#C6A16A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A16A]"
        >
          <Heart
            size={18}
            strokeWidth={1.6}
            className={wishlisted ? 'fill-[#C6A16A] text-[#C6A16A]' : ''}
          />
        </button>
      </div>

      {images.length > 1 ? (
        <div className="flex gap-1.5 sm:gap-2 lg:gap-3">
          {/* Main image + bottom row (the horizontal stroke of the "L") */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2 lg:gap-3">
            {mainImage}

            {hasBottom && (
              <div
                className="grid grid-cols-3 gap-1.5 sm:gap-2 lg:gap-3"
                role="group"
                aria-label="More product images"
              >
                {bottomThumbs.map((src, i) => (
                  <Thumb
                    key={src}
                    src={src}
                    alt={`${name} — view ${i + 4}`}
                    selected={src === active}
                    onClick={() => onChange(src)}
                    className="aspect-square w-full"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right column — the vertical stroke of the "L" */}
          <div
            className={`flex w-[30%] max-w-[180px] shrink-0 flex-col justify-between gap-1.5 sm:gap-2 lg:gap-3 ${
              hasBottom ? '' : 'justify-start overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            }`}
            role="group"
            aria-label="Product images"
          >
            {rightThumbs.map((src, i) => (
              <Thumb
                key={src}
                src={src}
                alt={`${name} — view ${i + 1}`}
                selected={src === active}
                onClick={() => onChange(src)}
                className="aspect-square w-full"
              />
            ))}
          </div>
        </div>
      ) : (
        mainImage
      )}
    </div>
  );
}
