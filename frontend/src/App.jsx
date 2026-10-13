import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import ScrollToTop from './components/common/ScrollToTop';

/* Lightweight hash router — no dependency added.
   `#/about` renders the About Us page, `#/collections` renders the
   Collections page, `#/contact` renders the Contact Us page, and
   `#/product/:id` renders a Product Detail page; every other hash renders
   Home and scrolls to the matching in-page section. */
const ABOUT_HASH = '#/about';
const COLLECTIONS_HASH = '#/collections';
const CONTACT_HASH = '#/contact';
const PRODUCT_PREFIX = '#/product/';

const readRoute = () => {
  const { hash } = window.location;
  if (hash === ABOUT_HASH) return { name: 'about' };
  if (hash === COLLECTIONS_HASH) return { name: 'collections' };
  if (hash === CONTACT_HASH) return { name: 'contact' };
  if (hash.startsWith(PRODUCT_PREFIX)) {
    const id = Number.parseInt(hash.slice(PRODUCT_PREFIX.length), 10);
    return { name: 'product', id: Number.isNaN(id) ? null : id };
  }
  return { name: 'home' };
};

/* Routes that live at the top of their own page rather than as an
   in-page scroll target. */
const scrollsToTop = new Set(['about', 'collections', 'contact', 'product']);

export default function App() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const onHashChange = () => {
      const next = readRoute();
      setRoute(next);

      if (scrollsToTop.has(next.name)) {
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
    onHashChange();

    return () => {
      document.documentElement.style.scrollBehavior = '';
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const activeId =
    route.name === 'about'
      ? 'about'
      : route.name === 'contact'
        ? 'contact'
        : route.name === 'collections' || route.name === 'product'
          ? 'collections'
          : 'home';

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-ink antialiased">
      <Navbar activeId={activeId} />
      {route.name === 'about' && <About />}
      {route.name === 'collections' && <Collections />}
      {route.name === 'contact' && <Contact />}
      {route.name === 'product' && <ProductDetail key={route.id} productId={route.id} />}
      {route.name === 'home' && <Home />}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
