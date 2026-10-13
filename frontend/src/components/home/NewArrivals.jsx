import { ArrowRight } from 'lucide-react';

const tiles = [
  {
    key: 'bust-necklace',
    image: '/images/arrivals/arrival-1.png',
    alt: 'Traditional gold necklace with matching earrings and ring on cream jewellery stands',
    frame: 'aspect-[802/540] sm:col-span-2',
    span: 'lg:col-span-6',
  },
  {
    key: 'chandelier-earrings',
    image: '/images/arrivals/arrival-2.png',
    alt: 'Traditional gold chandelier earrings with pink gemstone tops on burgundy velvet',
    frame: 'aspect-[389/540]',
    span: 'lg:col-span-3',
  },
  {
    key: 'bracelet-model',
    image: '/images/arrivals/arrival-3.png',
    alt: 'Model wearing delicate gold bracelets in a cream satin outfit',
    frame: 'aspect-[389/540]',
    span: 'lg:col-span-3',
  },
  {
    key: 'ruby-pendant',
    image: '/images/arrivals/arrival-4.png',
    alt: 'Statement gold necklace with deep ruby-red rectangular gemstone pendant',
    frame: 'aspect-[389/540]',
    span: 'lg:col-span-3',
  },
  {
    key: 'green-earrings-model',
    image: '/images/arrivals/arrival-5.png',
    alt: 'Model wearing long gold chandelier earrings with green gemstones',
    frame: 'aspect-[389/540]',
    span: 'lg:col-span-3',
  },
];

export default function NewArrivals() {
  return (
    <section id="arrivals" className="scroll-mt-20 bg-[#101010] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:aspect-[16/10] lg:grid-cols-12 lg:grid-rows-2">
          {tiles.map(({ key, image, alt, frame, span }) => (
            <a
              key={key}
              href="#collections"
              className={`group relative isolate overflow-hidden rounded-[18px] border border-white/10 bg-ink-soft transition-colors duration-500 ease-luxe hover:border-gold/40 lg:aspect-auto lg:h-full ${frame} ${span}`}
            >
              <img
                src={image}
                alt={alt}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="absolute inset-0 h-full w-full transform-gpu object-cover object-center transition-transform duration-[1600ms] ease-luxe group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-luxe group-hover:opacity-100"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[1px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100"
              />
            </a>
          ))}

          {/* Promotional banner card */}
          <div className="col-span-1 flex flex-col items-center justify-center rounded-[18px] border border-white/15 bg-[#0B0B0B] px-8 py-14 text-center sm:col-span-2 sm:py-16 lg:col-span-6 lg:py-0">
            <span className="text-[10px] uppercase tracking-wideluxe text-gold">JUST IN</span>

            <h2 className="mt-5 font-serif text-3xl font-normal leading-[1.1] tracking-tight text-ivory sm:text-4xl lg:text-[2.6rem]">
              New Arrivals
            </h2>

            <span
              aria-hidden="true"
              className="mt-6 h-px w-14 bg-gradient-to-r from-gold/0 via-gold to-gold/0"
            />

            <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-white/70">
              Discover our latest expressions of timeless elegance, thoughtfully crafted to make
              every moment unforgettable.
            </p>

            <a
              href="#collections"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-ivory transition-all duration-300 ease-luxe hover:border-gold/40 hover:bg-white/[0.08] hover:text-gold"
            >
              <span>Explore Collection</span>
              <ArrowRight
                size={13}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
