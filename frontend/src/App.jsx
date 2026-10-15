import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import ShopDrawer from './components/layout/ShopDrawer';
import Footer from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import InfoPage from './pages/InfoPage';
import Auth from './pages/Auth';
import UserProfile from './pages/UserProfile';
import { infoPages } from './data/infoPages';
import AdminApp from './admin/AdminApp';
import ScrollToTop from './components/common/ScrollToTop';

/* Lightweight hash router — no dependency added.
   `#/about` renders the About Us page, `#/collections` renders the
   Collections page,    `#/contact` renders the Contact Us page,
   `#/login` and `#/register` render the account page, and
   `#/product/:id` renders a Product Detail page; every other hash renders
   Home and scrolls to the matching in-page section. */

function readRoute() {
  const hash = window.location.hash;
  if (!hash.startsWith('#/')) return { name: 'home' };

  const [rawPath, queryString = ''] = hash.slice(2).split('?');
  const path = rawPath.replace(/\/+$/, '');
  const params = new URLSearchParams(queryString);

  if (path === 'admin' || path.startsWith('admin/')) {
    return { name: 'admin', segments: path.split('/').slice(1) };
  }

  if (path === 'about') return { name: 'about' };
  if (path === 'collections') {
    return {
      name: 'collections',
      category: params.get('category') || null,
      occasion: params.get('occasion') || null,
      sort: params.get('sort') || null,
      search: params.get('q') || null,
    };
  }
  if (path === 'contact') return { name: 'contact' };
  if (path === 'login') return { name: 'login' };
  if (path === 'register') return { name: 'register' };
  if (path === 'profile') return { name: 'profile' };

  const productMatch = path.match(/^product\/(\d+)$/);
  if (productMatch) return { name: 'product', id: Number(productMatch[1]) };

  if (infoPages[path]) return { name: 'info', slug: path };

  return { name: 'home' };
}

/* Routes that live at the top of their own page rather than as an
   in-page scroll target. */
const scrollsToTop = new Set(['about', 'collections', 'contact', 'product', 'login', 'register', 'profile', 'admin', 'info']);

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
          : route.name === 'login' || route.name === 'register'
            ? 'account'
            : route.name === 'profile'
              ? 'account'
              : route.name === 'info'
                ? infoPages[route.slug]?.nav || 'home'
                : 'home';

  const isAuthRoute = route.name === 'login' || route.name === 'register';

  if (route.name === 'admin') {
    return <AdminApp segments={route.segments} />;
  }

  return (
    <CartProvider>
      <div className="flex min-h-dvh flex-col overflow-x-clip bg-ink antialiased">
        {!isAuthRoute && <Navbar activeId={activeId} />}
        {route.name === 'about' && <About />}
        {route.name === 'collections' && (
          <Collections
            category={route.category}
            occasion={route.occasion}
            sort={route.sort}
            search={route.search}
          />
        )}
        {route.name === 'contact' && <Contact />}
        {route.name === 'login' && <Auth mode="login" />}
        {route.name === 'register' && <Auth mode="register" />}
        {route.name === 'profile' && <UserProfile />}
        {route.name === 'product' && <ProductDetail key={route.id} productId={route.id} />}
        {route.name === 'info' && <InfoPage key={route.slug} slug={route.slug} />}
        {route.name === 'home' && <Home />}
        {!isAuthRoute && <Footer />}
        {!isAuthRoute && <ScrollToTop />}
        {!isAuthRoute && <ShopDrawer />}
      </div>
    </CartProvider>
  );
}
