import SmartImage from '../common/SmartImage';
import { moments } from '../../data/collections';
import { getImage } from '../../data/images';

export default function BeautifulMoments() {
  return (
    <section id="moments" className="bg-ink py-24 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12">
        {/* Heading block */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="text-[10px] tracking-wideluxe text-gold sm:text-[11px]">THE MOMENTS</span>
          <h2 className="mt-5 font-serif text-2xl font-normal leading-[1.16] tracking-tight text-ivory sm:text-3xl lg:text-[2.6rem]">
            Made for Your Most Beautiful Moments
          </h2>
          <span
            aria-hidden="true"
            className="mt-5 h-px w-14 bg-gradient-to-r from-gold/0 via-gold to-gold/0"
          />
        </div>

        {/* 2 cols mobile, 4 cols desktop. */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {moments.map(({ key, label, title, description, image, alt }, i) => (
            <article
              key={key}
              className="group relative isolate aspect-[3/4] overflow-hidden rounded-card border border-white/[0.05] bg-ink-soft"
              style={{ transitionDelay: `${70 * i}ms` }}
            >
              <SmartImage
                src={image}
                alt={alt}
                sizes="(max-width: 640px) 50vw, 25vw"
                className="absolute inset-0 h-full w-full"
                imgClassName="transform-gpu transition-transform duration-[2000ms] ease-luxe group-hover:scale-[1.05]"
                objectPosition="center 20%"
              />

              {/* Bottom-up overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent"
              />

              {/* Text */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-4 pb-6 sm:px-5 sm:pb-7 lg:px-6">
                <span className="text-[9px] tracking-wideluxe text-gold sm:text-[10px]">{label}</span>
                <h3 className="font-serif text-lg leading-tight text-ivory sm:text-xl">{title}</h3>
                <p className="max-w-[18ch] text-[11px] font-light leading-[1.8] text-ivory/70 opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100 sm:max-w-none sm:text-[12px]">
                  {description}
                </p>
              </div>

              {/* Gold accent bar */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[1px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
