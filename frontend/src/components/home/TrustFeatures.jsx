import { trustFeatures } from '../../data/navigation';

export default function TrustFeatures() {
  return (
    <section aria-label="Why choose Lumiere" className="relative z-20 -mt-12 sm:-mt-16 px-4 sm:px-6">
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/15 bg-[#1E1B18]/40 shadow-2xl ring-1 ring-inset ring-white/10 backdrop-blur-2xl backdrop-saturate-150 px-6 py-6 sm:px-8 sm:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent"
        />
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-0">
          {trustFeatures.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`flex items-stretch gap-3.5 sm:px-4 ${
                i > 0 ? 'lg:border-l lg:border-white/10' : ''
              }`}
            >
              <Icon
                size={30}
                strokeWidth={1.2}
                className="h-full min-h-[30px] w-auto shrink-0 self-stretch text-gold"
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
