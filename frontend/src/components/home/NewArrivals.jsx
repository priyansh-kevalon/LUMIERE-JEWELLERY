import { ArrowRight } from 'lucide-react';

export default function NewArrivals() {
  return (
    <section id="arrivals" className="bg-[#0D0D0D] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1.35fr] lg:grid-rows-[240px_240px] lg:gap-[18px] xl:grid-rows-[250px_250px]">
          {/* 1. Large landscape */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] aspect-[16/10] sm:aspect-[4/3] md:col-span-2 md:aspect-[16/9] lg:aspect-auto lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2">
            <img
              src="/images/arrivals/arrival-1.png"
              alt="Diamond necklace"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 2. Earrings */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-auto lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2">
            <img
              src="/images/arrivals/arrival-2.png"
              alt="Diamond earrings"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 3. Model bracelet */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-auto lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2">
            <img
              src="/images/arrivals/arrival-3.png"
              alt="Jewellery model"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 4. Necklace */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-auto lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
            <img
              src="/images/arrivals/arrival-4.png"
              alt="Diamond necklace"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 5. Model earrings */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-auto lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
            <img
              src="/images/arrivals/arrival-5.png"
              alt="Model wearing earrings"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 6. Card */}
          <div className="flex flex-col justify-center rounded-2xl border border-white/15 bg-[#0D0D0D] px-8 py-10 min-h-[280px] sm:px-10 sm:py-12 md:col-span-3 lg:col-span-1 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 lg:px-10 lg:py-0 lg:min-h-0">
            <div className="flex justify-end">
              <span className="text-[10px] uppercase tracking-[0.32em] text-gold">JUST IN</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-[1.08] text-white sm:text-4xl lg:text-[2.75rem]">New Arrivals</h2>
            <p className="mt-3 max-w-[320px] text-sm font-medium leading-[1.8] text-white/90">
              Discover our latest expressions of timeless elegance, thoughtfully crafted to make
              every moment unforgettable.
            </p>
            <div className="mt-6">
              <a
                href="#collections"
                className="group inline-flex items-center gap-2 rounded-full border border-white/80 px-6 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                Explore Collection
                <ArrowRight size={12} strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
