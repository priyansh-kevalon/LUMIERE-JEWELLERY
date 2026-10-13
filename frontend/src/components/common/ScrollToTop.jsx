import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/* Distance (px) the page must be scrolled before the button appears. */
const SHOW_AFTER = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-gold text-ink shadow-luxe transition-all duration-500 ease-luxe hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:bottom-8 sm:right-8 sm:h-12 sm:w-12 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp
        size={18}
        strokeWidth={1.8}
        className="transition-transform duration-500 ease-luxe group-hover:-translate-y-0.5"
      />
    </button>
  );
}
