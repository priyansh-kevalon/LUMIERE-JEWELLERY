import { trustFeatures } from '../../data/navigation';

export default function TrustFeatures() {
  return (
    <section aria-label="Why choose Lumiere" className="relative z-20 -mt-12 sm:-mt-16 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl rounded-[28px] border border-white/20 bg-[#1E1B18]/75 shadow-2xl backdrop-blur-xl px-6 py-6 sm:px-8 sm:py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-0">
          {trustFeatures.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`flex items-center gap-3.5 sm:px-4 ${
                i > 0 ? 'lg:border-l lg:border-white/10' : ''
              }`}
            >
              <Icon
                size={30}
                strokeWidth={1.2}
                className="shrink-0 text-gold"
                aria-hidden="true"
              />

              <div className="min-w-0">
                <h3 className="text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase text-white leading-snug">
                  {title}
                </h3>
                <p className="mt-1 text-[11px] font-light leading-snug text-white/65">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
