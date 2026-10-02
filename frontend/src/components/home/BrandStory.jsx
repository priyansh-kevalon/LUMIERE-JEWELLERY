import { ArrowRight } from 'lucide-react';
import SmartImage from '../common/SmartImage';
import Button from '../common/Button';
import { images } from '../../data/images';

export default function BrandStory() {
  return (
    <section id="story" className="relative isolate overflow-hidden bg-ivory py-24 sm:py-28 lg:py-36">
      {/* Decorative soft arc behind the collage. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-gold/5 opacity-80 blur-3xl"
      />

      <div className="mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------- LEFT: Layered image collage ---------- */}
          <div className="relative order-1 lg:order-1 lg:col-span-6">
            <div className="relative aspect-[4/5] max-w-[480px] sm:max-w-[540px] lg:max-w-none">
              {/* Large background jewellery image */}
              <div className="absolute inset-0 overflow-hidden border border-ink/5 bg-cream shadow-luxe">
                <SmartImage
                  src={images.story.main}
                  alt="Master craftsman inspecting a high-carat diamond ring in the atelier"
                  sizes="(max-width: 1024px) 90vw, 48vw"
                  className="absolute inset-0 h-full w-full"
                  objectPosition="center 20%"
                />
              </div>

              {/* Smaller overlapping detail image */}
              <div className="absolute -bottom-8 -right-4 aspect-[4/5] w-[56%] overflow-hidden border-4 border-ivory bg-cream shadow-luxe sm:-bottom-12 sm:-right-8 sm:w-[48%] lg:-bottom-10 lg:-right-10 lg:w-[42%]">
                <SmartImage
                  src={images.story.secondary}
                  alt="Hand-finished diamond earrings showing setting detail"
                  sizes="(max-width: 640px) 40vw, 20vw"
                  className="absolute inset-0 h-full w-full"
                  objectPosition="center 15%"
                />
              </div>

              {/* Thin gold rule accent */}
              <span
                aria-hidden="true"
                className="absolute -left-3 top-1/2 hidden h-px w-14 origin-left rotate-90 bg-gold/70 sm:block lg:-left-6"
              />
            </div>
          </div>

          {/* ---------- RIGHT: Copy ---------- */}
          <div className="order-2 lg:order-2 lg:col-span-6 xl:pl-4">
            <span className="text-[10px] tracking-wideluxe text-gold-deep sm:text-[11px]">OUR STORY</span>

            <h2 className="mt-5 font-serif text-2xl font-normal leading-[1.16] tracking-tight text-ink sm:text-3xl lg:text-[2.75rem]">
              Where Passion
              <span className="block italic">Becomes Perfection</span>
            </h2>

            <div className="mt-6 space-y-5 text-[14px] font-light leading-[1.8] text-ink/70 sm:text-[15px]">
              <p>
                At Lumière Jewellery, every piece tells a story of passion, precision, and purpose. We
                blend timeless design with masterful craftsmanship to create jewels that celebrate life,
                love, and unforgettable moments.
              </p>
              <p>
                From wax carving to the final loupe inspection, each ornament is hand-finished in our
                atelier — hallmarked, certified and beautifully presented for the moments that matter.
              </p>
            </div>

            <div className="mt-10">
              <Button as="a" href="#contact" tone="solid" size="lg">
                KNOW MORE
                <ArrowRight
                  size={14}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
