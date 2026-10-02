import { trustFeatures } from '../../data/navigation';

/**
 * Floating bar that straddles the seam between the hero and the first dark
 * section. Pulled up with a negative margin rather than positioned absolutely
 * so it never overlaps the hero copy at any breakpoint.
 */
export default function TrustFeatures() {
  return (
    <section
      aria-label="Why choose Lumiere"
      className="relative z-20 -mt-14 px-4 sm:-mt-16 sm:px-6 lg:-mt-[4.5rem]"
    >
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-white/[0.09] bg-ink-soft/85 shadow-luxe backdrop-blur-xl">
        {/* 1 col → 2 cols on mobile · 4 cols from md up */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {trustFeatures.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={[
                'flex items-start gap-3 px-5 py-6 sm:gap-4 sm:px-6 sm:py-7',
                /* hairline dividers that survive the 2×2 mobile grid */
                i % 2 === 1 ? 'border-l border-white/[0.07]' : '',
                i >= 2 ? 'border-t border-white/[0.07] md:border-t-0' : '',
                i > 0 ? 'md:border-l md:border-white/[0.07]' : '',
              ].join(' ')}
            >
              <Icon
                size={26}
                strokeWidth={1}
                className="mt-0.5 shrink-0 text-gold transition-transform duration-700 ease-luxe"
                aria-hidden="true"
              />

              <div className="min-w-0">
                <h3 className="text-[9px] leading-snug tracking-[0.14em] text-ivory sm:text-[10px] sm:tracking-[0.16em]">
                  {title}
                </h3>
                <p className="mt-1.5 text-[10px] font-light leading-relaxed text-muted sm:text-[11px]">
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
