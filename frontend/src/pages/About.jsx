import SmartImage from '../components/common/SmartImage';

/* ------------------------------------------------------------------ */
/* Imagery                                                            */
/* Reuses existing LUMIÈRE photography. Swap any path below for a      */
/* dedicated asset of the same aspect ratio when it becomes available. */
/* ------------------------------------------------------------------ */
const img = {
  heroLeft: '/images/about/Rectangle 34624207.png',
  legacy: '/images/about/image 26.png',
  storyMain: '/images/about/Rectangle 34624211.png',
  storySmallNecklace: '/images/about/Rectangle 34624213.png',
  storySmallRings: '/images/about/Rectangle 34624212.png',
  craftConsult: '/images/about/Rectangle 34624219.png',
  craftArtisan: '/images/about/Rectangle 34624220.png',
  craftSetting: '/images/about/Rectangle 34624221.png',
  craftPatience: '/images/about/Rectangle 34624223.png',
  craftFinishing: '/images/about/Rectangle 34624222.png',
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
  
];

const goldParagraphs = [
  'What began with a passion for fine jewellery has grown into a legacy built on trust, craftsmanship and timeless design.',
  'From the first sketch to the final polish, every creation reflects our belief that true luxury lies in the details. We bring together traditional craftsmanship and contemporary design to create jewellery that feels both meaningful and enduring.',
  
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
    <section className="relative isolate mt-20 overflow-hidden bg-ink">
      {/* Single full-width hero image */}
      <div className="h-[680px] md:h-[640px] lg:h-[630px]">
        <SmartImage
          src={img.heroLeft}
          alt="Woman’s hand wearing a diamond ring with a diamond necklace at the collarbone against a deep black background"
          priority
          objectPosition="center 30%"
          className="h-full w-full"
          imgClassName="block"
        />
      </div>

      {/* Subtle, text-specific darkening — keeps the imagery edges intact */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(13,13,13,0.62)_0%,rgba(13,13,13,0.30)_48%,rgba(13,13,13,0)_78%)]"
      />

      {/* Centered headline overlay */}
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
      <div className="mx-auto grid w-full max-w-[80rem] grid-cols-1 items-stretch gap-9 px-6 py-10 sm:px-8 md:grid-cols-[0.7fr_1.3fr] md:px-10 lg:gap-[clamp(32px,5vw,72px)]">
        {/* Portrait — existing bridal asset, square-ish corners, no overlay */}
        <SmartImage
          src={img.legacy}
          alt="Woman wearing traditional Indian gold jewellery with a statement necklace and earrings"
          className="aspect-[4/5] w-full self-center rounded-sm lg:aspect-auto lg:h-[clamp(340px,28vw,420px)]"
          objectPosition="center 30%"
        />

        {/* Text column — heading + four stacked blocks */}
        <div className="flex flex-col">
          <h2 className="font-serif text-[26px] font-normal leading-[1.2] tracking-tight text-[#f2ece6] lg:text-[30px]">
            A Legacy That Continues
          </h2>

          <div className="mt-6 flex flex-col gap-6 lg:mt-7 lg:gap-7">
            {legacyBlocks.map((block) => (
              <div key={block.title}>
                <h3 className="text-[11px] font-medium uppercase tracking-[2px] text-[#eee7e0] lg:text-[12px]">
                  {block.title}
                </h3>
                <p className="mt-2 max-w-[480px] text-[13px] font-light leading-[1.95] text-[#aaa39b] sm:text-[14px] lg:max-w-none lg:text-[16px]">
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
    <section className="bg-[#EEE4D9] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Copy */}
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-[20px] font-normal leading-tight tracking-tight text-ink sm:text-[22px] lg:text-[26px]">
              A Story Written in Gold
            </h2>
            <div className="mt-5 space-y-3 lg:mt-7 lg:space-y-5">
              {goldParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="max-w-xl text-[12px] font-light leading-[1.9] text-ink/70 sm:text-[13px] lg:max-w-none lg:text-[18px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Image composition */}
          <div className="grid grid-cols-2 gap-2 self-center sm:gap-3 lg:h-[clamp(320px,26vw,380px)]">
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
          <h2 className="font-serif text-[24px] font-normal leading-tight tracking-tight text-ivory sm:text-[26px] lg:text-[28px]">
            Certified. Authentic. Assured.
          </h2>
          <p className="mt-4 max-w-2xl text-[12px] font-light leading-relaxed text-muted sm:text-[13px]">
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
              <figcaption className="mt-4 text-center text-[12px] font-light leading-relaxed text-muted">
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
const craftSteps = {
  consultation: {
    no: '01',
    title: 'Consultation',
    text: 'Every piece begins by listening — to the occasion, the wearer and the story yet to be told.',
  },
  experience: {
    no: '02',
    title: 'Experience',
    text: 'Years of knowledge, passed quietly from one pair of skilled hands to the next.',
  },
  precision: {
    no: '03',
    title: 'Precision',
    text: 'Each stone is measured, set and shaped by hand until every detail is exact.',
  },
  patience: {
    no: '04',
    title: 'Patience',
    text: 'Fine jewellery cannot be rushed. Time is the truest material of the craft.',
  },
  finishing: {
    no: '05',
    title: 'Finishing',
    text: 'The final polish draws out the light, and the design comes to life.',
  },
};

function CraftCaption({ no, title, text, className = '' }) {
  return (
    <figcaption className={className}>
      <div className="flex items-baseline gap-2.5">
        <span className="font-serif text-[15px] leading-none text-[#b9965b]">{no}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#171513]">
          {title}
        </span>
      </div>
      <p className="mt-2 max-w-[46ch] text-[11px] font-light leading-[1.6] text-[#5c554d] sm:text-[12px]">
        {text}
      </p>
    </figcaption>
  );
}

/* Five-step composition. Aspect ratios are chosen from the source images so
   columns sharing a row resolve to matching heights without hard crops. */
function CraftsmanshipSection() {
  return (
    <section className="bg-[#eee5db] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-8 lg:px-10">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-medium uppercase tracking-[3px] text-[#b9965b]">
              Our Craft
            </p>
            <h2 className="mt-3 font-serif text-[22px] font-normal leading-tight tracking-tight text-[#171513] sm:text-[24px] lg:text-[26px]">
              The Art Behind Every Creation
            </h2>
          </div>
         
        </div>

        {/* Five craft steps — 1 col (mobile) · 2 col (tablet) · 12 col (desktop) */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-8">
          <figure className="sm:col-span-2 lg:col-span-1">
            <SmartImage
              src={img.craftConsult}
              alt="Jewellery consultant discussing a design with a customer"
              className="aspect-[16/10] w-full rounded-sm lg:aspect-[4/5]"
              imgClassName="block"
            />
            <CraftCaption {...craftSteps.consultation} className="mt-4" />
          </figure>

          <figure>
            <SmartImage
              src={img.craftArtisan}
              alt="Experienced jewellery craftsman at work"
              className="aspect-[4/5] w-full rounded-sm lg:aspect-[4/5]"
              objectPosition="center 30%"
              imgClassName="block"
            />
            <CraftCaption {...craftSteps.experience} className="mt-4" />
          </figure>

          <figure>
            <SmartImage
              src={img.craftSetting}
              alt="Close-up of hands setting a diamond into a ring"
              className="aspect-[4/5] w-full rounded-sm lg:aspect-[4/5]"
              imgClassName="block"
            />
            <CraftCaption {...craftSteps.precision} className="mt-4" />
          </figure>

          <figure>
            <SmartImage
              src={img.craftPatience}
              alt="Vertical detail of traditional jewellery craftsmanship"
              className="aspect-[4/5] w-full rounded-sm lg:aspect-[4/5]"
              objectPosition="center 30%"
              imgClassName="block"
            />
            <CraftCaption {...craftSteps.patience} className="mt-4" />
          </figure>

          <figure>
            <SmartImage
              src={img.craftFinishing}
              alt="Hands carefully assembling an ornate necklace"
              className="aspect-[16/10] w-full rounded-sm sm:aspect-[4/5] lg:aspect-[4/5]"
              imgClassName="block"
            />
            <CraftCaption {...craftSteps.finishing} className="mt-4" />
          </figure>
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
    </main>
  );
}
