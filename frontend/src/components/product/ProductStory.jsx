import { BadgeCheck, Gem } from 'lucide-react';
import SmartImage from '../common/SmartImage';

export default function ProductStory({ product }) {
  const lifestyle = '/images/about/Rectangle 34624213.png';
  const necklace = '/images/collections/necklace-photo.png';

  const indicators = [
    { icon: BadgeCheck, label: 'BIS Hallmarked' },
    product.diamondType ? { icon: Gem, label: 'Certified Diamonds' } : null,
  ].filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-[#eee5db] py-14 sm:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(120%_90%_at_15%_10%,rgba(199,161,106,0.16),transparent_55%),radial-gradient(100%_80%_at_90%_100%,rgba(120,90,45,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[80rem] grid-cols-1 items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-10">
        {/* Collage */}
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px]">
          <div className="absolute left-0 top-0 h-[76%] w-[64%] overflow-hidden rounded-sm shadow-[0_24px_50px_-30px_rgba(40,30,15,0.6)]">
            <SmartImage
              src={lifestyle}
              alt="Model wearing a diamond ring, captured in soft natural light"
              objectPosition="center 30%"
              className="h-full w-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[60%] w-[52%] overflow-hidden rounded-sm border-[6px] border-[#eee5db] shadow-[0_24px_50px_-28px_rgba(40,30,15,0.55)]">
            <SmartImage
              src={necklace}
              alt="Close-up of a matching gold necklace resting on a neutral surface"
              className="h-full w-full"
            />
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[3px] text-[#b9965b]">
            The Story Behind the Piece
          </p>
          <h2 className="mt-3 font-serif text-[24px] font-normal leading-tight tracking-tight text-[#171513] sm:text-[28px] lg:text-[32px]">
            Made to Hold a Moment.
          </h2>
          <p className="mt-5 max-w-xl text-[13px] font-light leading-[1.9] text-[#4b4640] sm:text-[14px]">
            Inspired by the quiet beauty of timeless elegance, this piece is designed to celebrate
            moments that deserve to be remembered. Every curve, setting and detail is thoughtfully
            crafted to create jewellery that feels personal.
          </p>

          <ul className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            {indicators.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-[#2a2521]">
                <Icon size={22} strokeWidth={1.3} className="text-[#b9965b]" aria-hidden="true" />
                <span className="text-[12px] font-medium tracking-[0.06em]">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
