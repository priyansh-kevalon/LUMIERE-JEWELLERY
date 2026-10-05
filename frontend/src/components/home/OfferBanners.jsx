import { ArrowRight } from 'lucide-react';

export default function OfferBanners() {
  return (
    <section id="offers" className="bg-[#0D0D0D]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* ---------- LEFT BANNER — Diamond ---------- */}
        <a
          href="#collections"
          className="group relative block aspect-[960/550] overflow-hidden"
        >
          <img
            src="/images/offers/banner-diamond.png"
            alt="Flat 20% Off On Diamond Jewellery"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </a>

        {/* ---------- RIGHT BANNER — Emerald ---------- */}
        <a
          href="#collections"
          className="group relative block aspect-[960/550] overflow-hidden"
        >
          <img
            src="/images/offers/banner-emerald.png"
            alt="Flat 20% Off On Diamond Jewellery"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </a>
      </div>
    </section>
  );
}
