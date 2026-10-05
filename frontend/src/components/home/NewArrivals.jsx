import { ArrowRight } from 'lucide-react';

export default function NewArrivals() {
  return (
    <section id="arrivals" className="bg-[#0D0D0D] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* 1. Large landscape necklace display */}
          <div className="sm:col-span-2 lg:col-span-6 overflow-hidden rounded-[24px] border border-white/10 bg-[#141414] aspect-[800/410]">
            <img
              src="/images/arrivals/arrival-1.png"
              alt="Diamond necklace and jewellery set on cream display"
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* 2. Pink chandelier earrings */}
          <div className="sm:col-span-1 lg:col-span-3 overflow-hidden rounded-[24px] border border-white/10 bg-[#141414] aspect-[390/410]">
            <img
              src="/images/arrivals/arrival-2.png"
              alt="Pink chandelier earrings on maroon drape"
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* 3. Gold bangles on model's wrist */}
          <div className="sm:col-span-1 lg:col-span-3 overflow-hidden rounded-[24px] border border-white/10 bg-[#141414] aspect-[390/410]">
            <img
              src="/images/arrivals/arrival-3.png"
              alt="Model wearing gold clover bracelets"
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* 4. Ruby pendant on rustic wood */}
          <div className="sm:col-span-1 lg:col-span-3 overflow-hidden rounded-[24px] border border-white/10 bg-[#141414] aspect-[390/410]">
            <img
              src="/images/arrivals/arrival-4.png"
              alt="Ruby pendant on rustic wood"
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* 5. Model with long emerald earrings */}
          <div className="sm:col-span-1 lg:col-span-3 overflow-hidden rounded-[24px] border border-white/10 bg-[#141414] aspect-[390/410]">
            <img
              src="/images/arrivals/arrival-5.png"
              alt="Model wearing long emerald and gold earrings"
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* 6. Text Card */}
          <div className="sm:col-span-2 lg:col-span-6 rounded-[24px] border border-white/20 bg-[#121212] p-8 sm:p-12 flex flex-col justify-between aspect-[800/410] relative">
            <div className="flex justify-end">
              <span className="text-[11px] font-medium tracking-[0.25em] text-gold uppercase">
                JUST IN
              </span>
            </div>

            <div className="my-auto">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
                New Arrivals
              </h2>
              <p className="mt-4 max-w-md text-sm sm:text-[15px] font-light leading-relaxed text-white/70">
                Discover our latest expressions of timeless elegance, thoughtfully crafted to make
                every moment unforgettable.
              </p>
            </div>

            <div>
              <a
                href="#collections"
                className="inline-flex items-center gap-2 rounded-full bg-[#2D2D2D] hover:bg-[#3D3D3D] px-6 py-2.5 text-xs font-light text-white tracking-wide transition-colors"
              >
                <span>Explore Collection</span>
                <ArrowRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
