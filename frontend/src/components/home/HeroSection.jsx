import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92dvh] w-full items-center overflow-hidden bg-ink sm:min-h-[96dvh] lg:min-h-[98dvh]"
    >
      {/* ---------- Full-bleed cinematic image ---------- */}
      <img
        src="/images/hero/image 5.png"
        alt="LUMIÈRE Jewellery — Timeless beauty, made to be yours"
        loading="eager"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] md:object-[60%_center] lg:object-center"
      />

      {/* Subtle left scrim keeps the copy crisp without flattening the image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/70 to-transparent lg:from-ink/98 lg:via-ink/60 lg:to-ink/5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink via-ink/90 to-transparent"
      />

      {/* ---------- Content ---------- */}
      <div className="mx-auto w-full min-w-0 max-w-[92rem] px-5 sm:px-8 lg:px-12 xl:px-14 pt-16 sm:pt-20">
        <div className="min-w-0 max-w-xl sm:max-w-2xl lg:max-w-4xl lg:pl-[1%]">
          <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-gold sm:text-[11px] sm:tracking-wideluxe">
            <span aria-hidden="true" className="h-px w-7 bg-gold/70 sm:w-9" />
            CRAFTED TO CAPTIVATE
          </span>

          <h1 className="mt-6 animate-fade-up font-serif text-[40px] font-normal leading-[1.08] tracking-tight text-ivory sm:text-5xl md:text-[60px] lg:text-[70px] xl:text-[78px]">
            Timeless Beauty,
            <span className="mt-1 block text-white">Made to Be Yours</span>
          </h1>

          <p className="mt-6 max-w-2xl animate-fade-up text-[14px] font-light leading-[1.85] text-gold sm:text-[15px] lg:mt-8 lg:text-base xl:text-[17px]">
            Discover exquisite jewellery crafted to celebrate your most beautiful moments and become
            a part of your story.
          </p>

          <div className="mt-9 animate-fade-up lg:mt-12">
            <Button as="a" href="#/collections" tone="transparent" size="lg">
              Explore Collection
              <ArrowRight
                size={15}
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
