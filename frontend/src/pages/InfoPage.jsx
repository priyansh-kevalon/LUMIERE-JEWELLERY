import { ChevronDown, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { infoPages } from '../data/infoPages';
import NotFound from './NotFound';

/* ------------------------------------------------------------------ */
/* Section primitives                                                  */
/* ------------------------------------------------------------------ */

function Paragraphs({ items }) {
  return (
    <div className="mt-5 space-y-4">
      {items.map((text) => (
        <p key={text.slice(0, 24)} className="max-w-3xl text-[13px] font-light leading-[1.9] text-[#a8a19a] sm:text-[14px]">
          {text}
        </p>
      ))}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[13px] font-light leading-relaxed text-[#a8a19a]">
          <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-[#C6A16A]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Steps({ items }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((step, index) => (
        <div key={step.title} className="rounded-[10px] border border-white/10 bg-white/[0.02] p-6">
          <span className="font-serif text-[16px] text-[#C6A16A]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f2ece8]">
            {step.title}
          </h3>
          <p className="mt-2 text-[12.5px] font-light leading-relaxed text-[#9d968f]">{step.text}</p>
        </div>
      ))}
    </div>
  );
}

function FaqList({ items }) {
  return (
    <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[14px] font-light text-[#f2ece8] [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown
              size={16}
              strokeWidth={1.6}
              className="shrink-0 text-[#C6A16A] transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 max-w-3xl text-[13px] font-light leading-relaxed text-[#9d968f]">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

function Quotes({ items }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((quote) => (
        <figure
          key={quote.name}
          className="flex flex-col rounded-[10px] border border-white/10 bg-white/[0.02] p-6"
        >
          <blockquote className="text-[13.5px] font-light leading-relaxed text-[#e9e3dd]">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-[10.5px] uppercase tracking-[0.2em] text-[#C6A16A]">
            {quote.name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function Stores({ items }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((store) => (
        <div key={store.name} className="rounded-[10px] border border-white/10 bg-white/[0.02] p-6">
          <h3 className="font-serif text-[18px] font-normal text-[#f2ece8]">{store.name}</h3>
          <p className="mt-3 flex gap-2.5 text-[12.5px] font-light leading-relaxed text-[#9d968f]">
            <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C6A16A]" />
            {store.address}
          </p>
          {store.phone && (
            <a
              href={`tel:${store.phone.replace(/\s/g, '')}`}
              className="mt-2 flex gap-2.5 text-[12.5px] font-light text-[#9d968f] transition-colors hover:text-[#C6A16A]"
            >
              <Phone size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C6A16A]" />
              {store.phone}
            </a>
          )}
          {store.hours && (
            <p className="mt-2 flex gap-2.5 text-[12.5px] font-light text-[#9d968f]">
              <Clock size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C6A16A]" />
              {store.hours}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function Section({ section }) {
  return (
    <section>
      {section.heading && (
        <h2 className="font-serif text-[21px] font-normal leading-tight tracking-tight text-[#f2ece8] sm:text-[24px]">
          {section.heading}
        </h2>
      )}
      {section.paragraphs && <Paragraphs items={section.paragraphs} />}
      {section.list && <BulletList items={section.list} />}
      {section.steps && <Steps items={section.steps} />}
      {section.faqs && <FaqList items={section.faqs} />}
      {section.quotes && <Quotes items={section.quotes} />}
      {section.stores && <Stores items={section.stores} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function InfoPage({ slug }) {
  const page = infoPages[slug];
  if (!page) return <NotFound />;

  return (
    <main className="bg-ink">
      {/* Hero */}
      <section className="relative isolate mt-20 overflow-hidden border-b border-white/[0.06]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(198,161,106,0.12),transparent_70%)]"
        />
        <div className="relative mx-auto w-full max-w-shell px-6 pb-12 pt-14 sm:px-8 lg:px-12 lg:pb-16 lg:pt-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#C6A16A]">
            {page.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[30px] font-normal leading-[1.12] tracking-tight text-[#f5f0eb] sm:text-[36px] lg:text-[42px]">
            {page.title}
          </h1>
          {page.intro && (
            <p className="mt-5 max-w-2xl text-[13px] font-light leading-[1.9] text-[#a8a19a] sm:text-[14px]">
              {page.intro}
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto w-full max-w-shell px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-14 lg:gap-16">
          {page.sections.map((section, index) => (
            <Section key={section.heading || index} section={section} />
          ))}
        </div>

        {page.cta && (
          <div className="mt-16 flex flex-col items-start gap-5 rounded-[12px] border border-[#C6A16A]/25 bg-[#C6A16A]/[0.06] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-serif text-[20px] font-normal text-[#f2ece8]">{page.cta.title}</h3>
              {page.cta.text && (
                <p className="mt-1 max-w-xl text-[13px] font-light text-[#9d968f]">{page.cta.text}</p>
              )}
            </div>
            <a
              href={page.cta.href}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#C6A16A] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0D0D0D] transition-colors hover:bg-[#d8b47e]"
            >
              {page.cta.label}
              <ArrowRight size={14} strokeWidth={1.8} />
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
