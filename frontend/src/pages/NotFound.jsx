import { ArrowRight, Sparkles } from 'lucide-react';

export default function NotFound({ title = 'Page not found' }) {
  return (
    <main className="bg-[#0D0D0D]">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-shell flex-col items-center justify-center px-6 pt-24 text-center">
        <Sparkles size={28} strokeWidth={1.2} className="text-[#C6A16A]" aria-hidden="true" />
        <h1 className="mt-4 font-serif text-2xl text-[#f2ece8]">{title}</h1>
        <p className="mt-3 max-w-sm text-[12px] font-light leading-relaxed text-[#a7a19b]">
          The page you are looking for may have moved or is no longer available.
        </p>
        <a
          href="#/collections"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#C6A16A]/60 px-7 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C6A16A] transition-colors hover:bg-[#C6A16A] hover:text-[#0D0D0D]"
        >
          Back to Collections
          <ArrowRight size={14} strokeWidth={1.6} />
        </a>
      </div>
    </main>
  );
}
