import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="cta" className="scroll-mt-20 bg-[#0D0D0D] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-[#F7F2EB] via-[#F1E8DB] to-[#E7D9C4] px-6 py-16 sm:px-12 sm:py-20 text-center shadow-2xl">
          {/* Subtle warm glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(185,150,91,0.16),transparent_62%)]"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#8F7340] uppercase">
              YOUR STORY, YOUR JEWELLERY
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111]">
              Make Every Moment Unforgettable
            </h2>

            <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed text-[#333333]">
              Discover jewellery crafted with passion, precision, and timeless elegance—designed
              to become part of your most cherished moments.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#collections"
                className="inline-flex items-center gap-2.5 rounded-full border border-black px-7 py-3 text-xs font-medium tracking-wider uppercase text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                <span>Explore Collection</span>
                <ArrowRight size={14} strokeWidth={1.6} />
              </a>

              <a
                href="#story"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#151515] px-7 py-3 text-xs font-medium tracking-wider uppercase text-white transition-all duration-300 hover:bg-black"
              >
                <span>Discover Our Story</span>
                <ArrowRight size={14} strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
