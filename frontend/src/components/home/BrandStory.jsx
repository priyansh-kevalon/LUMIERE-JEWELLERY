import { ArrowRight } from 'lucide-react';

export default function BrandStory() {
  return (
    <section
      id="story"
      className="relative isolate overflow-hidden bg-[#EFEAE2] py-12 sm:py-14 lg:py-16"
    >
      <div className="relative mx-auto w-full max-w-[90rem] px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* LEFT COLUMN: IMAGE COLLAGE */}
          <div className="relative flex justify-center lg:col-span-6 lg:justify-start">
            <div className="relative w-full max-w-[540px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
                <img
                  src="/images/story/story-main.png"
                  alt="LUMIÈRE Jewellery — diamond necklace"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-10 -right-4 aspect-[4/5] w-[40%] overflow-hidden rounded-sm border-4 border-[#EFEAE2] shadow-2xl sm:-bottom-12 sm:-right-8 sm:w-[38%]">
                <img
                  src="/images/story/story-inset.png"
                  alt="Fine diamond ring detail"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTENT */}
          <div className="flex flex-col justify-center lg:col-span-6 lg:pl-10 xl:pl-14">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#8F7340] sm:text-[11px]">
              OUR STORY
            </span>

            <h2 className="mt-4 font-serif text-3xl font-normal leading-[1.08] tracking-tight text-[#111111] sm:text-4xl lg:text-5xl xl:text-[2.75rem]">
              Where Passion
              <span className="mt-1 block">Becomes Perfection</span>
            </h2>

            <p className="mt-5 max-w-md text-sm font-medium leading-[1.8] text-[#1A1612] sm:text-[13px] lg:text-[14px] xl:text-[15px]">
              At Lumière Carats, every piece tells a story of passion,
              precision, and purpose. We blend timeless design with
              masterful craftsmanship to create jewellery that celebrates
              life, love, and unforgettable moments.
            </p>

            <div className="mt-6">
              <a
                href="#collections"
                className="group inline-flex items-center gap-2 rounded-full border border-[#111111] px-6 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#111111] transition-all duration-300 hover:bg-[#111111] hover:text-white"
              >
                KNOW MORE
                <ArrowRight size={12} strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
