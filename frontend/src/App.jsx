import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';

/* Lightweight hash router — no dependency added.
   `#/about` renders the About Us page, `#/collections` renders the
   Collections page; every other hash renders Home and scrolls to the
   matching in-page section. */
const ABOUT_HASH = '#/about';
const COLLECTIONS_HASH = '#/collections';
const readRoute = () => {
  if (window.location.hash === ABOUT_HASH) return 'about';
  if (window.location.hash === COLLECTIONS_HASH) return 'collections';
  return 'home';
};

export default function App() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const onHashChange = () => {
      const next = readRoute();
      setRoute(next);

      if (next === 'about' || next === 'collections') {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      const id = window.location.hash.replace(/^#\/?/, '');
      if (id && !id.startsWith('/')) {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => {
      document.documentElement.style.scrollBehavior = '';
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-ink antialiased">
      <Navbar activeId={route === 'about' ? 'about' : route === 'collections' ? 'collections' : 'home'} />
      {route === 'about' ? (
        <About />
      ) : route === 'collections' ? (
        <Collections />
      ) : (
        <Home />
      )}
      <Footer />
    </div>
  );
}
