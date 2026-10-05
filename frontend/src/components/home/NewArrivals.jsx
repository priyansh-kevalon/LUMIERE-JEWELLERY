import { ArrowRight } from 'lucide-react';

export default function NewArrivals() {
  return (
    <section id="arrivals" className="bg-[#0D0D0D] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.35fr] lg:auto-rows-[240px] lg:grid-rows-[240px_240px] lg:gap-5">
          {/* 1. Large landscape */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] lg:col-span-1 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2">
            <img
              src="/images/arrivals/arrival-1.png"
              alt="Diamond necklace"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 2. Earrings */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2">
            <img
              src="/images/arrivals/arrival-2.png"
              alt="Diamond earrings"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 3. Model bracelet */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2">
            <img
              src="/images/arrivals/arrival-3.png"
              alt="Jewellery model"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 4. Necklace */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
            <img
              src="/images/arrivals/arrival-4.png"
              alt="Diamond necklace"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 5. Model earrings */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
            <img
              src="/images/arrivals/arrival-5.png"
              alt="Model wearing earrings"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 6. Card */}
          <div className="flex flex-col justify-center rounded-2xl border border-white/15 bg-[#0D0D0D] px-6 py-8 sm:px-8 sm:py-10 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 lg:px-9 lg:py-0">
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold">JUST IN</span>
            <h2 className="mt-3 font-serif text-3xl font-normal leading-[1.08] text-white">New Arrivals</h2>
            <p className="mt-3 max-w-[320px] text-sm font-medium leading-[1.75] text-white/90">
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
