import { BadgeCheck, Gem, Gift, Headphones, Sparkles, Star } from 'lucide-react';

const loveItems = [
  { icon: Sparkles, label: 'Craftsmanship' },
  { icon: Gem, label: 'Design' },
  { icon: BadgeCheck, label: 'Quality' },
  { icon: Gift, label: 'Packaging' },
  { icon: Headphones, label: 'Customer Service' },
];

function Stars({ rating, size = 16 }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          size={size}
          strokeWidth={1.3}
          className={
            index <= Math.round(rating) ? 'fill-[#C6A16A] text-[#C6A16A]' : 'text-[#5a554f]'
          }
        />
      ))}
    </span>
  );
}

export default function ReviewsSection({ summary }) {
  const { average, total, distribution, isSample } = summary;
  const formattedTotal = total.toLocaleString('en-IN');

  return (
    <section
      aria-label="Customer reviews"
      className="border-t border-[#242424] bg-[#111111] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 text-center lg:grid-cols-[minmax(0,240px)_1fr_minmax(0,280px)] lg:items-center lg:gap-12 lg:text-left">
          {/* Overall */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#bcb4ad]">
              Overall Rating
            </p>
            <p className="mt-3 font-serif text-[56px] font-normal leading-none text-[#f2ece8]">
              {average}
            </p>
            <div className="mt-3">
              <Stars rating={average} />
            </div>
            <p className="mt-2 text-[12px] font-light text-[#8f8a84]">
              Based on {formattedTotal} Reviews
            </p>
          </div>

          {/* Breakdown */}
          <div className="lg:border-x lg:border-white/10 lg:px-12">
            <div className="mx-auto flex max-w-[520px] flex-col gap-3">
              {distribution.map((row) => {
                const pct = total ? Math.round((row.count / total) * 100) : 0;
                return (
                  <div key={row.stars} className="flex items-center gap-3">
                    <span className="w-12 shrink-0 text-[11px] text-[#bcb4ad]">{row.stars} star</span>
                    <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-[#C6A16A]"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="w-10 shrink-0 text-right text-[11px] text-[#8f8a84]">
                      {row.count}
                    </span>
                  </div>
                );
              })}
              {isSample && (
                <p className="mt-1 text-[10px] font-light uppercase tracking-[0.14em] text-[#6b6560]">
                  Illustrative sample data — connect a reviews service for live figures.
                </p>
              )}
            </div>
          </div>

          {/* What customers love */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f2ece8]">
              What Our Customers Love
            </p>
            <ul className="mt-5 flex w-full max-w-[280px] flex-col gap-3.5">
              {loveItems.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon size={18} strokeWidth={1.4} className="text-[#C6A16A]" aria-hidden="true" />
                  <span className="text-[12px] font-light text-[#cdc6be]">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
