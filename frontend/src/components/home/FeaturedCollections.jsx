const collections = [
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
];

export default function FeaturedCollections() {
  return (
    <section id="collections" className="scroll-mt-24 bg-ink py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-12 xl:px-14">
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

        <div className="collection-grid mx-auto mt-14 lg:mt-16">
          {collections.map(({ key, name, image, alt, href }) => (
            <a key={key} href={href} className="collection-card">
              <div className="collection-card__media">
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 25vw"
                />
              </div>
              <div className="collection-card__label">
                <span className="collection-card__name">{name}</span>
                <span aria-hidden="true" className="collection-card__underline" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
