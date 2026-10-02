import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

export default function App() {
  /* Enable smooth, elegant scroll for all internal anchor links. */
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-ink antialiased">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
