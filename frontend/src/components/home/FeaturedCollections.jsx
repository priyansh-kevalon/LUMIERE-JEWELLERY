import { ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import SmartImage from '../common/SmartImage';
import { collections } from '../../data/collections';
import { getImage } from '../../data/images';

export default function FeaturedCollections() {
  return (
    <section id="collections" className="bg-ink py-24 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12">
        <SectionTitle
          eyebrow="Explore Our Collection"
          title="FEATURED COLLECTION"
          lede="Four signatures — each designed to be worn every day and kept for a lifetime."
          tone="dark"
        />

        {/* 2 cols on mobile/tablet, 4 cols from lg up. */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-16 lg:grid-cols-4">
          {collections.map(({ key, name, image, alt, href }, i) => (
            <a
              key={key}
              href={href}
              className="group relative isolate flex flex-col overflow-hidden border border-white/[0.05] bg-ink-soft transition-colors duration-500 ease-luxe hover:border-gold/40"
              style={{ transitionDelay: `${80 * i}ms` }}
            >
              {/* Tall portrait card */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <SmartImage
                  src={image}
                  alt={alt}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="absolute inset-0 h-full w-full"
                  imgClassName="transform-gpu transition-transform duration-[1600ms] ease-luxe group-hover:scale-[1.04]"
                />

                {/* Inner vignette to lift the label legibly. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent"
                />
              </div>

              {/* Cream label band (matches the design brief: ivory/white bottom label). */}
              <div className="flex items-center justify-center gap-2 border-t border-white/[0.05] bg-ivory px-3 py-4 text-center sm:py-5">
                <span className="text-[9px] tracking-wideluxe text-ink sm:text-[10px]">{name}</span>
                <ArrowRight
                  size={12}
                  strokeWidth={1.6}
                  className="text-gold transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                />
              </div>

              {/* Gold edge accent on hover */}
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
