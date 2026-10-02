import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import SmartImage from '../common/SmartImage';
import { images } from '../../data/images';

export default function OfferBanners() {
  return (
    <section id="offers" className="bg-ink">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* ---------- LEFT BANNER — Diamond ---------- */}
        <div className="group relative isolate flex min-h-[68vh] items-center justify-center overflow-hidden bg-[#14110A] lg:min-h-[80vh]">
          <SmartImage
            src={images.offers.diamond}
            alt="Large diamond solitaire ring against a warm champagne background"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="absolute inset-0 h-full w-full"
            imgClassName="transform-gpu transition-transform duration-[2000ms] ease-luxe group-hover:scale-[1.03]"
            objectPosition="center 35%"
          />

          {/* Soft warm overlay to reinforce the gold/brown aesthetic. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-[#0F0B05]/92 via-[#0F0B05]/50 to-[#0F0B05]/10"
          />

          <div className="relative z-10 mx-auto max-w-xl px-6 py-16 text-center sm:px-10 lg:py-24">
            <span className="text-[10px] tracking-wideluxe text-gold sm:text-[11px]">SPECIAL OFFER</span>

            <h2 className="mt-6 font-serif text-3xl leading-[1.12] tracking-tight text-ivory sm:text-4xl lg:text-5xl">
              FLAT 20% OFF
              <span className="block italic text-gold-light">On Diamond Jewellery</span>
            </h2>

            <div className="mt-10 flex justify-center">
              <Button as="a" href="#collections" tone="gold" size="lg">
                Shop Diamond
                <ArrowRight
                  size={14}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
                />
              </Button>
            </div>
          </div>

          {/* Large product overlay image on the right. */}
          <div className="absolute -right-4 top-1/2 hidden aspect-[4/5] w-[40%] -translate-y-1/2 overflow-hidden rounded-card border border-white/15 shadow-luxe sm:block lg:-right-8 lg:w-[38%] xl:right-0 xl:w-[36%]">
            <SmartImage
              src={images.offers.diamond}
              alt="Diamond solitaire ring close-up"
              sizes="(max-width: 1024px) 40vw, 20vw"
              className="absolute inset-0 h-full w-full"
              objectPosition="center 40%"
            />
          </div>
        </div>

        {/* ---------- RIGHT BANNER — Emerald ---------- */}
        <div className="group relative isolate flex min-h-[68vh] items-center justify-center overflow-hidden bg-[#F5F1EC] lg:min-h-[80vh]">
          <SmartImage
            src={images.offers.emerald}
            alt="Emerald and diamond earrings against a soft cream background"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="absolute inset-0 h-full w-full"
            imgClassName="transform-gpu transition-transform duration-[2000ms] ease-luxe group-hover:scale-[1.03]"
            objectPosition="center 30%"
          />

          {/* Cream tint overlay. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tl from-[#F7F1E9]/95 via-[#F7F1E9]/40 to-[#F7F1E9]/0"
          />

          <div className="relative z-10 mx-auto max-w-xl px-6 py-16 text-center sm:px-10 lg:py-24">
            <span className="text-[10px] tracking-wideluxe text-gold-deep sm:text-[11px]">SPECIAL OFFER</span>

            <h2 className="mt-6 font-serif text-3xl leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              FLAT 20% OFF
              <span className="block italic text-gold-deep">On Diamond Jewellery</span>
            </h2>

            <div className="mt-10 flex justify-center">
              <Button as="a" href="#collections" tone="solid" size="lg">
                Shop Diamond
                <ArrowRight
                  size={14}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
                />
              </Button>
            </div>
          </div>

          {/* Floating product on the left (balances the split). */}
          <div className="absolute -left-4 top-1/2 hidden aspect-[4/5] w-[40%] -translate-y-1/2 overflow-hidden rounded-card border border-ink/10 shadow-luxe sm:block lg:-left-8 lg:w-[38%] xl:left-0 xl:w-[36%]">
            <SmartImage
              src={images.offers.emerald}
              alt="Emerald and diamond earrings close-up"
              sizes="(max-width: 1024px) 40vw, 20vw"
              className="absolute inset-0 h-full w-full"
              objectPosition="center 25%"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
