import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import SmartImage from '../common/SmartImage';
import { images } from '../../data/images';

export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory py-16 sm:py-20 lg:py-24">
      {/* Soft radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gold/10 opacity-80 blur-3xl"
      />

      {/* Textured background image (very subtle) */}
      <SmartImage
        src={images.cta}
        alt="Soft ivory texture with fine jewellery detail"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        objectPosition="center 40%"
      />

      <div className="mx-auto w-full max-w-[85rem] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center rounded-[6px] border border-ink/10 bg-white/85 px-6 py-16 text-center shadow-luxe backdrop-blur sm:px-10 sm:py-20">
          <span className="text-[10px] tracking-wideluxe text-gold-deep sm:text-[11px]">
            THE LUMIÈRE EXPERIENCE
          </span>

          <h2 className="mt-6 max-w-2xl font-serif text-2xl font-normal leading-[1.16] tracking-tight text-ink sm:text-3xl lg:text-[2.6rem]">
            Make Every Moment Unforgettable
          </h2>

          <p className="mt-5 max-w-xl text-[14px] font-light leading-[1.85] text-ink/70 sm:text-[15px]">
            Discover jewellery crafted with passion, precision, and timeless elegance—designed to
            become part of your most cherished moments.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
            <Button as="a" href="#collections" tone="solid" size="lg">
              Explore Collection
              <ArrowRight
                size={14}
                strokeWidth={1.6}
                className="transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
              />
            </Button>

            <Button as="a" href="#story" tone="glass" size="lg" className="bg-white/70 text-ink hover:text-ink">
              Discover Our Story
              <ArrowRight
                size={14}
                strokeWidth={1.6}
                className="transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
