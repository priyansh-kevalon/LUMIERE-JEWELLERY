import { ArrowRight } from 'lucide-react';

export default function FeaturedCollections() {
  return (
    <section id="collections" className="bg-ink py-24 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12 xl:px-14">
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] uppercase tracking-wideluxe text-gold sm:text-[11px]">
            EXPLORE OUR COLLECTION
          </span>
          <h2 className="mt-5 font-serif text-2xl font-normal leading-[1.12] tracking-[0.16em] text-ivory sm:text-3xl lg:text-[2.6rem]">
            FEATURED COLLECTION
          </h2>
          <span
            aria-hidden="true"
            className="mt-5 h-px w-14 bg-gradient-to-r from-gold/0 via-gold to-gold/0"
          />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {[
            {
              key: 'necklace',
              name: 'NECKLACE',
              alt: 'Diamond pendant necklace',
              image: '/images/collections/necklace-photo.png',
              href: '#collections',
            },
            {
              key: 'rings',
              name: 'RINGS',
              alt: 'Diamond ring',
              image: '/images/collections/rings-photo.png',
              href: '#collections',
            },
            {
              key: 'bracelets',
              name: 'BRACELETS',
              alt: 'Diamond bracelet',
              image: '/images/collections/bracelets-photo.png',
              href: '#collections',
            },
            {
              key: 'earrings',
              name: 'EARRINGS',
              alt: 'Diamond earrings',
              image: '/images/collections/earrings-photo.png',
              href: '#collections',
            },
          ].map(({ key, name, image, alt, href }, i) => (
            <a
              key={key}
              href={href}
              className="group relative isolate flex flex-col overflow-hidden rounded-t-[220px] transition-all duration-500 ease-luxe"
              style={{ transitionDelay: `${80 * i}ms` }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[220px] border border-b-0 border-white/40 transition-all duration-500 ease-luxe group-hover:border-white/60">
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="absolute inset-0 h-full w-full object-cover object-[center_25%] transform-gpu transition-transform duration-[2000ms] ease-luxe group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-b-sm border border-t-0 border-white/40 bg-white px-3 py-5 text-center transition-all duration-500 ease-luxe group-hover:border-white/60 sm:py-6">
                <span className="text-[10px] tracking-wideluxe text-ink sm:text-[11px]">{name}</span>
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-gold/70 transition-all duration-500 ease-luxe group-hover:w-14"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[1px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
