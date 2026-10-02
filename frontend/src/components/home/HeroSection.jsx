import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import SmartImage from '../common/SmartImage';
import { images } from '../../data/images';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate flex h-[650px] w-full items-center overflow-hidden bg-ink md:h-[740px] lg:h-[800px] xl:h-[820px]"
    >
      {/* ---------- Full-bleed cinematic image ---------- */}
     <SmartImage
  src="/images/hero/image 5.png"
  alt="Elegant woman wearing a fine diamond jewellery set"
  priority
  sizes="100vw"
  className="absolute inset-0 -z-20 h-full w-full object-cover"
  objectPosition="center 30%"
/>

      {/* Subtle left scrim keeps the copy readable without flattening the image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10"
      />
      {/* Bottom scrim ties the hero into the dark sections below. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      {/* ---------- Copy — anchored ~9% from the left ---------- */}
      <div className="mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl lg:pl-[2%]">
          <span className="inline-flex animate-fade-in items-center gap-3 text-[10px] tracking-wideluxe text-gold sm:text-[11px]">
            <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
            CRAFTED TO CAPTIVATE
          </span>

          <h1 className="mt-6 animate-fade-up font-serif text-[34px] font-normal leading-[1.1] tracking-tight text-ivory sm:text-5xl md:text-[56px] lg:text-[64px]">
            Timeless Beauty,
            <span className="block italic text-gold-light">Made to Be Yours</span>
          </h1>

          <p className="mt-6 max-w-md animate-fade-up text-[14px] font-light leading-[1.75] text-ivory/75 sm:text-[15px] lg:mt-8 lg:text-base">
            Discover exquisite jewellery crafted to celebrate
            <br className="hidden sm:block" /> your most beautiful moments and become a part of
            <br className="hidden sm:block" /> your story.
          </p>

          <div className="mt-9 animate-fade-up lg:mt-11">
            <Button as="a" href="#collections" tone="glass" size="lg">
              Explore Collection
              <ArrowRight
                size={14}
                strokeWidth={1.6}
                className="transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </div>

      {/* ---------- Scroll hint ---------- */}
      <div className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 sm:right-10 lg:flex xl:right-14">
        <span className="text-[9px] tracking-[0.3em] text-ivory/50 [writing-mode:vertical-rl]">SCROLL</span>
        <span
          aria-hidden="true"
          className="h-12 w-px animate-scroll-hint bg-gradient-to-b from-gold/80 to-transparent"
        />
      </div>
    </section>
  );
}
