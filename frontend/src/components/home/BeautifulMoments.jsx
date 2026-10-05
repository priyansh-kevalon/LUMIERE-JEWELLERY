import { moments } from '../../data/collections';

export default function BeautifulMoments() {
  return (
    <section id="moments" className="bg-[#0D0D0D] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        {/* Title */}
        <div className="text-center">
          <span className="text-[11px] font-medium tracking-[0.25em] text-gold uppercase">
            JEWELLERY FOR EVERY MOMENT
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Made for Your Most Beautiful Moments
          </h2>
        </div>

        {/* 4 Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {moments.map(({ key, title, image, alt }) => (
            <a
              key={key}
              href="#collections"
              className="group relative block aspect-[380/480] overflow-hidden rounded-[20px] border border-white/10 bg-[#141414] shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40"
            >
              <img
                src={image}
                alt={alt || title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
