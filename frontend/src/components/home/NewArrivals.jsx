import { ArrowRight } from 'lucide-react';

export default function NewArrivals() {
  return (
    <section id="arrivals" className="bg-[#0D0D0D] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-[42%_22%_28%] lg:grid-rows-[200px_200px] xl:grid-rows-[210px_210px]">
          {/* 1. Large gold necklace on ivory bust - Top Left */}
          <div className="relative overflow-hidden rounded-[12px] border border-[#292929] bg-[#141414] sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2">
            <img
              src="/images/arrivals/arrival-1.png"
              alt="Gold necklace displayed on ivory jewellery bust"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 2. Gold chandelier earrings - Top Middle */}
          <div className="relative overflow-hidden rounded-[12px] border border-[#292929] bg-[#141414] lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2">
            <img
              src="/images/arrivals/arrival-2.png"
              alt="Gold chandelier earrings"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 3. Model wearing gold bracelets - Top Right */}
          <div className="relative overflow-hidden rounded-[12px] border border-[#292929] bg-[#141414] lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2">
            <img
              src="/images/arrivals/arrival-3.png"
              alt="Model wearing gold bracelets"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 4. Ruby pendant necklace - Bottom Left */}
          <div className="relative overflow-hidden rounded-[12px] border border-[#292929] bg-[#141414] lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
            <img
              src="/images/arrivals/arrival-4.png"
              alt="Statement necklace with ruby gemstone pendant"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 5. Model wearing green gemstone earrings - Bottom Middle */}
          <div className="relative overflow-hidden rounded-[12px] border border-[#292929] bg-[#141414] lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
            <img
              src="/images/arrivals/arrival-5.png"
              alt="Model wearing green gemstone gold earrings"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* 6. New Arrivals Card - Bottom Right */}
          <div className="flex flex-col justify-center rounded-[12px] border border-[#292929] bg-[#0D0D0D] px-8 py-10 min-h-[280px] sm:px-10 sm:py-12 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 lg:px-10 lg:py-0 lg:min-h-0">
            <div className="flex justify-start">
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
                EXPLORE COLLECTION →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
