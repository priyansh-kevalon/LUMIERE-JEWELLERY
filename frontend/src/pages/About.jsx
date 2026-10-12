import SmartImage from '../components/common/SmartImage';
import FinalCTA from '../components/home/FinalCTA';

/* ------------------------------------------------------------------ */
/* Imagery                                                            */
/* Reuses existing LUMIÈRE photography. Swap any path below for a      */
/* dedicated asset of the same aspect ratio when it becomes available. */
/* ------------------------------------------------------------------ */
const img = {
  heroLeft: '/images/about/Rectangle 34624207.png',
  heroRight: '/images/about/Rectangle 34624206.png',
  legacy: '/images/about/image 26.png',
  storyMain: '/images/arrivals/arrival-2.png',
  storySmallNecklace: '/images/story/story-inset.png',
  storySmallRings: '/images/offers/ring.png',
  craftConsult: '/images/arrivals/arrival-1.png',
  craftArtisan: '/images/arrivals/arrival-3.png',
  craftSetting: '/images/collections/rings-photo.png',
  craftPatience: '/images/arrivals/arrival-4.png',
  craftFinishing: '/images/moments/moment-anniversary.png',
  certHallmark: '/images/about/cert-hallmark.svg',
  certDiamond: '/images/about/cert-diamond.svg',
  certAuthenticity: '/images/about/cert-authenticity.svg',
};

const legacyBlocks = [
  {
    title: 'The Beginning',
    text: 'Our journey began with a simple promise—uncompromising quality and honest craftsmanship.',
  },
  {
    title: 'Growing With Trust',
    text: 'As our family of customers grew, so did our passion for creating jewellery that lasts.',
  },
  {
    title: 'A New Era',
    text: 'Traditional artistry came together with contemporary design, creating a new expression of timeless luxury.',
  },
  {
    title: 'Looking Ahead',
    text: 'Today, we continue to honour our heritage while creating jewellery for a new generation.',
  },
];

const goldParagraphs = [
  'What began with a passion for fine jewellery has grown into a legacy built on trust, craftsmanship and timeless design.',
  'From the first sketch to the final polish, every creation reflects our belief that true luxury lies in the details. We bring together traditional craftsmanship and contemporary design to create jewellery that feels both meaningful and enduring.',
  'Each piece is created to become part of a story — a first celebration, a wedding, a milestone, or a treasured gift passed from one generation to another.',
];

const certCards = [
  {
    image: img.certHallmark,
    alt: 'BIS hallmark gold purity certificate',
    caption:
      'Assurance of the purity of eligible gold jewellery as per applicable BIS standards.',
  },
  {
    image: img.certDiamond,
    alt: 'Diamond grading laboratory report',
    caption: 'Diamonds can be accompanied by recognised laboratory certification.',
  },
  {
    image: img.certAuthenticity,
    alt: 'Jewellery authenticity certificate',
    caption:
      "Every purchase comes with documentation detailing the jewellery's material.",
  },
];

/* ------------------------------------------------------------------ */
/* 1. Hero — Where Heritage Meets Timeless Beauty                     */
/* ------------------------------------------------------------------ */
function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Edge-to-edge 50/50 split with no gap between panels */}
      <div className="grid h-[560px] grid-cols-2 md:h-[520px] lg:h-[515px]">
        <SmartImage
          src={img.heroLeft}
          alt="Woman’s hand wearing a diamond ring with a diamond necklace at the collarbone against a deep black background"
          priority
          objectPosition="left 30%"
          className="h-full w-full"
          imgClassName="block"
        />
        <SmartImage
          src={img.heroRight}
          alt="Sparkling diamond drop earrings against flowing dark champagne-gold silk"
          priority
          objectPosition="center 40%"
          className="h-full w-full"
          imgClassName="block"
        />
      </div>

      {/* Subtle, text-specific darkening — keeps the imagery edges intact */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(13,13,13,0.62)_0%,rgba(13,13,13,0.30)_48%,rgba(13,13,13,0)_78%)]"
      />

      {/* Single shared overlay crossing both panels */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-[650px] font-serif text-[30px] font-normal leading-[1.15] tracking-[-0.01em] text-[#f5f0eb] [text-shadow:0_2px_26px_rgba(0,0,0,0.55)] md:text-[34px] lg:text-[40px]">
          Where Heritage Meets
          <span className="block">Timeless Beauty</span>
        </h1>
        <p className="mt-[24px] max-w-[520px] text-[12px] font-light leading-[1.5] text-[#f5f0eb]/80 [text-shadow:0_1px_16px_rgba(0,0,0,0.5)] sm:text-[13px]">
          For generations, we have believed that jewellery is more than an ornament. It is a story
          that deserves to be cherished.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. A Legacy That Continues                                          */
/* ------------------------------------------------------------------ */
function LegacySection() {
  return (
    <section className="bg-[#0d0d0d]">
      <div className="grid grid-cols-1 items-center gap-10 px-6 py-11 md:grid-cols-[0.9fr_1.1fr] md:px-[6.3%] lg:gap-[clamp(40px,8vw,115px)]">
        {/* Portrait — existing bridal asset, square-ish corners, no overlay */}
        <SmartImage
          src={img.legacy}
          alt="Woman wearing traditional Indian gold jewellery with a statement necklace and earrings"
          className="aspect-[4/5] w-full rounded-sm"
          objectPosition="center 30%"
        />

        {/* Text column — heading + four stacked blocks */}
        <div className="flex flex-col">
          <h2 className="font-serif text-[28px] font-normal leading-[1.2] tracking-tight text-[#f2ece6] lg:text-[30px]">
            A Legacy That Continues
          </h2>

          <div className="mt-7 flex flex-col gap-6">
            {legacyBlocks.map((block) => (
              <div key={block.title}>
                <h3 className="text-[11px] font-medium uppercase tracking-[2px] text-[#eee7e0]">
                  {block.title}
                </h3>
                <p className="mt-2 max-w-[480px] text-[11px] font-light leading-[1.5] text-[#aaa39b] sm:text-[12px]">
                  {block.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. A Story Written in Gold                                          */
/* ------------------------------------------------------------------ */
function StoryInGold() {
  return (
    <section className="bg-[#EEE4D9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <h2 className="font-serif text-[23px] font-normal leading-tight tracking-tight text-ink sm:text-[25px] lg:text-[26px]">
              A Story Written in Gold
            </h2>
            <div className="mt-6 max-w-xl space-y-4">
              {goldParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-[11px] font-light leading-[1.85] text-ink/70 sm:text-[12px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Image composition */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:h-[540px]">
            <SmartImage
              src={img.storyMain}
              alt="Woman wearing a gold choker necklace"
              className="col-span-2 aspect-[16/10] w-full rounded-sm lg:col-span-1 lg:row-span-2 lg:aspect-auto lg:h-full"
              objectPosition="center 30%"
            />
            <SmartImage
              src={img.storySmallNecklace}
              alt="Close-up of a delicate gold necklace"
              className="col-span-1 aspect-[4/5] w-full rounded-sm lg:aspect-auto lg:h-full"
            />
            <SmartImage
              src={img.storySmallRings}
              alt="Hands wearing elegant gold rings"
              className="col-span-1 aspect-[4/5] w-full rounded-sm lg:aspect-auto lg:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Certified. Authentic. Assured.                                   */
/* ------------------------------------------------------------------ */
function CertifiedSection() {
  return (
    <section className="bg-[#0d0d0d] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-serif text-[22px] font-normal leading-tight tracking-tight text-ivory sm:text-[24px] lg:text-[25px]">
            Certified. Authentic. Assured.
          </h2>
          <p className="mt-4 max-w-2xl text-[10px] font-light leading-relaxed text-muted sm:text-[11px]">
            Every precious piece deserves complete transparency. Our jewellery is accompanied by
            appropriate purity and authenticity certification, giving you confidence in what you
            wear and cherish.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {certCards.map((card) => (
            <figure key={card.alt} className="flex flex-col">
              <SmartImage
                src={card.image}
                alt={card.alt}
                className="aspect-[4/3] w-full rounded-sm"
              />
              <figcaption className="mt-4 text-center text-[10px] font-light leading-relaxed text-muted">
                {card.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. The Art Behind Every Creation                                    */
/* ------------------------------------------------------------------ */
function CraftsmanshipSection() {
  return (
    <section className="bg-[#EEE4D9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {/* Left — intro + consultation */}
          <div className="sm:col-span-2 lg:col-span-5">
            <h2 className="font-serif text-[23px] font-normal leading-tight tracking-tight text-ink sm:text-[25px] lg:text-[26px]">
              The Art Behind Every Creation
            </h2>
            <p className="mt-4 max-w-xl text-[11px] font-light leading-[1.85] text-ink/70 sm:text-[12px]">
              Behind every finished piece is a process of tradition, precision and human touch. Our
              artisans transform precious materials into jewellery that carries character, detail
              and soul.
            </p>
            <SmartImage
              src={img.craftConsult}
              alt="Jewellery consultation between a customer and a LUMIÈRE professional"
              className="mt-6 aspect-[16/10] w-full rounded-sm"
            />
          </div>

          {/* Middle — experience + precision */}
          <div className="lg:col-span-4 lg:pt-8">
            <SmartImage
              src={img.craftArtisan}
              alt="Experienced jewellery artisan at work"
              className="aspect-[4/5] w-full rounded-sm"
              objectPosition="center 30%"
            />
            <div className="mt-4">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink">
                Experience
              </h3>
              <p className="mt-1 text-[10px] font-light leading-relaxed text-ink/60 sm:text-[11px]">
                Years of knowledge passed through skilled hands.
              </p>
            </div>

            <SmartImage
              src={img.craftSetting}
              alt="Jeweller setting a diamond into a ring"
              className="mt-6 aspect-[4/3] w-full rounded-sm"
            />
            <div className="mt-4">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink">
                Precision
              </h3>
              <p className="mt-1 text-[10px] font-light leading-relaxed text-ink/60 sm:text-[11px]">
                Every detail is carefully shaped, set and finished.
              </p>
            </div>
          </div>

          {/* Right — patience + finishing */}
          <div className="lg:col-span-3 lg:pt-16">
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink">
                Patience
              </h3>
              <p className="mt-1 text-[10px] font-light leading-relaxed text-ink/60 sm:text-[11px]">
                Fine jewellery cannot be rushed. Every piece receives the attention it deserves.
              </p>
            </div>

            <SmartImage
              src={img.craftPatience}
              alt="Traditional necklace craftsmanship detail"
              className="mt-6 aspect-[3/4] w-full rounded-sm"
              objectPosition="center 30%"
            />

            <div className="mt-6">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink">
                Finishing
              </h3>
              <p className="mt-1 text-[10px] font-light leading-relaxed text-ink/60 sm:text-[11px]">
                The final polish brings the design to life.
              </p>
            </div>

            <SmartImage
              src={img.craftFinishing}
              alt="Finished LUMIÈRE jewellery after final polish"
              className="mt-6 aspect-[4/3] w-full rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function About() {
  return (
    <main>
      <AboutHero />
      <LegacySection />
      <StoryInGold />
      <CertifiedSection />
      <CraftsmanshipSection />
      <FinalCTA />
    </main>
  );
}
