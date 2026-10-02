import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import SmartImage from '../common/SmartImage';
import { images } from '../../data/images';

const arrivals = [
  { id: 0, className: 'col-span-2 lg:col-span-6', aspect: 'aspect-[16/10] lg:aspect-[16/9]' },
  { id: 1, className: 'col-span-1 lg:col-span-3', aspect: 'aspect-[3/4]' },
  { id: 2, className: 'col-span-1 lg:col-span-3', aspect: 'aspect-[3/4]' },
  { id: 3, className: 'col-span-1 lg:col-span-2', aspect: 'aspect-[4/5]' },
  { id: 4, className: 'col-span-1 lg:col-span-4', aspect: 'aspect-[3/4]' },
];

export default function NewArrivals() {
  return (
    <section id="arrivals" className="bg-ink py-24 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12">
        {/* Editorial grid + text card on the bottom-right. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
          {/* ROW 1 */}
          <div className={arrivals[0].className}>
            <figure className={`relative h-full w-full overflow-hidden rounded-card border border-white/[0.05] bg-ink-soft ${arrivals[0].aspect}`}>
              <SmartImage
                src={images.arrivals[0]}
                alt="Model wearing a fine diamond necklace"
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="absolute inset-0 h-full w-full"
                imgClassName="transform-gpu transition-transform duration-[1800ms] ease-luxe hover:scale-[1.04]"
                objectPosition="center 25%"
              />
            </figure>
          </div>

          <div className={arrivals[1].className}>
            <figure className={`relative h-full w-full overflow-hidden rounded-card border border-white/[0.05] bg-ink-soft ${arrivals[1].aspect}`}>
              <SmartImage
                src={images.arrivals[1]}
                alt="Diamond drop earrings in a close-up editorial shot"
                sizes="(max-width: 640px) 50vw, 30vw"
                className="absolute inset-0 h-full w-full"
                imgClassName="transform-gpu transition-transform duration-[1800ms] ease-luxe hover:scale-[1.04]"
                objectPosition="center 10%"
              />
            </figure>
          </div>

          <div className={arrivals[2].className}>
            <figure className={`relative h-full w-full overflow-hidden rounded-card border border-white/[0.05] bg-ink-soft ${arrivals[2].aspect}`}>
              <SmartImage
                src={images.arrivals[2]}
                alt="Polished gold and diamond bracelet"
                sizes="(max-width: 640px) 50vw, 30vw"
                className="absolute inset-0 h-full w-full"
                imgClassName="transform-gpu transition-transform duration-[1800ms] ease-luxe hover:scale-[1.04]"
                objectPosition="center 20%"
              />
            </figure>
          </div>

          {/* ROW 2 */}
          <div className={arrivals[3].className}>
            <figure className={`relative h-full w-full overflow-hidden rounded-card border border-white/[0.05] bg-ink-soft ${arrivals[3].aspect}`}>
              <SmartImage
                src={images.arrivals[3]}
                alt="Gemstone necklace detail, photographed against black"
                sizes="(max-width: 640px) 50vw, 20vw"
                className="absolute inset-0 h-full w-full"
                imgClassName="transform-gpu transition-transform duration-[1800ms] ease-luxe hover:scale-[1.04]"
                objectPosition="center 30%"
              />
            </figure>
          </div>

          <div className={arrivals[4].className}>
            <figure className={`relative h-full w-full overflow-hidden rounded-card border border-white/[0.05] bg-ink-soft ${arrivals[4].aspect}`}>
              <SmartImage
                src={images.arrivals[4]}
                alt="Model wearing diamond earrings with soft directional lighting"
                sizes="(max-width: 640px) 50vw, 40vw"
                className="absolute inset-0 h-full w-full"
                imgClassName="transform-gpu transition-transform duration-[1800ms] ease-luxe hover:scale-[1.04]"
                objectPosition="center 15%"
              />
            </figure>
          </div>

          {/* TEXT CARD — large text block */}
          <div className="col-span-2 mt-2 flex flex-col justify-between rounded-card border border-white/10 bg-ink-soft p-6 sm:p-8 lg:col-span-6 lg:mt-0 lg:justify-end lg:p-10">
            <div>
              <span className="text-[10px] tracking-wideluxe text-gold sm:text-[11px]">NEW ARRIVALS</span>

              <h2 className="mt-4 font-serif text-2xl font-normal leading-[1.15] tracking-tight text-ivory sm:text-3xl lg:text-[2.4rem]">
                Discover our latest expressions
                <span className="block italic text-gold-light">of timeless elegance</span>
              </h2>

              <p className="mt-4 max-w-md text-[13px] font-light leading-[1.8] text-muted sm:text-[14px] lg:text-[15px]">
                Thoughtfully crafted to make every moment unforgettable.
              </p>
            </div>

            <div className="mt-8">
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
      </div>
    </section>
  );
}
