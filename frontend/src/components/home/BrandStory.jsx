import { ArrowRight } from 'lucide-react';

export default function BrandStory() {
  return (
    <section
      id="story"
      className="relative isolate overflow-hidden bg-[#EFEAE2] py-20 sm:py-24 lg:py-28"
      style={{
        backgroundImage: 'url(/images/story/story-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------- LEFT: Collage ---------- */}
          <div className="relative lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[560px]">
              {/* Main large image */}
              <div className="relative overflow-hidden rounded-[4px] shadow-xl">
                <img
                  src="/images/story/story-main.png"
                  alt="High jewellery diamond necklace set"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Inset overlapping image at bottom right */}
              <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-6 w-[45%] overflow-hidden rounded-[2px] shadow-2xl border-4 border-[#EFEAE2]">
                <img
                  src="/images/story/story-inset.png"
                  alt="Hand wearing fine diamond rings"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* ---------- RIGHT: Copy ---------- */}
          <div className="lg:col-span-6 lg:pl-6">
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#8F7340] uppercase">
              OUR STORY
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.18] tracking-tight text-[#111111]">
              Where Passion
              <span className="block mt-1">Becomes Perfection</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm sm:text-base font-light leading-[1.8] text-[#333333]">
              At Lumiere Carats, every piece tells a story of passion, precision, and purpose. We
              blend timeless design with masterful craftsmanship to create jewelry that celebrates
              life, love, and unforgettable moments.
            </p>

            <div className="mt-8">
              <a
                href="#collections"
                className="inline-flex items-center gap-2.5 rounded-full border border-black/80 px-7 py-2.5 text-xs font-medium tracking-wider uppercase text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                <span>KNOW MORE</span>
                <ArrowRight size={14} strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
