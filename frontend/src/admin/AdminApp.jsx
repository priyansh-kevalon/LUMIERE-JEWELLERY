import { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Gem,
  Tags,
  ShoppingCart,
  Users,
  TicketPercent,
  Star,
  Settings as SettingsIcon,
  LogOut,
  Store,
  Menu,
  X,
} from 'lucide-react';
import { ToastProvider } from './toast';
import { cx } from './ui';
import { getAdminSession, adminSignOut } from '../services/adminAuth';
import { hydrateAdmin, resetAdminSync } from '../data/sync';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AdminProducts from './pages/AdminProducts';
import AdminProductForm from './pages/AdminProductForm';
import AdminCategories from './pages/AdminCategories';
import AdminOrders from './pages/AdminOrders';
import AdminOrderDetail from './pages/AdminOrderDetail';
import AdminCustomers from './pages/AdminCustomers';
import AdminCoupons from './pages/AdminCoupons';
import AdminReviews from './pages/AdminReviews';
import AdminSettings from './pages/AdminSettings';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { id: 'products', label: 'Products', icon: Gem, path: '/admin/products' },
  { id: 'categories', label: 'Categories', icon: Tags, path: '/admin/categories' },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
  { id: 'coupons', label: 'Coupons', icon: TicketPercent, path: '/admin/coupons' },
  { id: 'reviews', label: 'Reviews', icon: Star, path: '/admin/reviews' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/admin/settings' },
];

function go(path) {
  window.location.hash = path;
  window.scrollTo({ top: 0 });
}

function resolvePage(segments) {
  const [first, second] = segments;
  switch (first) {
    case undefined:
    case '':
      return { id: 'dashboard', node: <Dashboard /> };
    case 'products':
      if (!second) return { id: 'products', node: <AdminProducts /> };
      return {
        id: 'products',
        node: <AdminProductForm key={second} productId={second === 'new' ? null : Number(second)} />,
      };
    case 'categories':
      return { id: 'categories', node: <AdminCategories /> };
    case 'orders':
      return second
        ? { id: 'orders', node: <AdminOrderDetail key={second} orderId={second} /> }
        : { id: 'orders', node: <AdminOrders /> };
    case 'customers':
      return { id: 'customers', node: <AdminCustomers /> };
    case 'coupons':
      return { id: 'coupons', node: <AdminCoupons /> };
    case 'reviews':
      return { id: 'reviews', node: <AdminReviews /> };
    case 'settings':
      return { id: 'settings', node: <AdminSettings /> };
    default:
      return { id: 'dashboard', node: <Dashboard /> };
  }
}

function Wordmark() {
  return (
    <a href="#/admin" className="flex flex-col leading-none" aria-label="Lumière Admin">
      <span className="font-serif text-[17px] tracking-[0.24em] text-white">LUMIÈRE</span>
      <span className="mt-1 text-[7px] uppercase tracking-[0.38em] text-[#C6A16A]">ADMIN CONSOLE</span>
    </a>
  );
}

function SidebarContent({ activeId, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-6 py-6">
        <Wordmark />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={cx(
                'flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-[12.5px] font-light transition-colors duration-200',
                active
                  ? 'bg-[#C6A16A]/12 text-[#e2c694]'
                  : 'text-[#a7a19b] hover:bg-white/[0.05] hover:text-[#f2ece8]',
              )}
            >
              <Icon size={17} strokeWidth={1.6} className={active ? 'text-[#C6A16A]' : ''} />
              <span className="tracking-wide">{item.label}</span>
              {active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#C6A16A]" /> : null}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <a
          href="#home"
          className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[12.5px] font-light text-[#a7a19b] transition-colors hover:bg-white/[0.05] hover:text-[#f2ece8]"
        >
          <Store size={17} strokeWidth={1.6} />
          View Store
        </a>
      </div>
    </div>
  );
}

function AdminShell({ session, onSignOut, segments }) {
  const page = useMemo(() => resolvePage(segments), [segments]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [segments]);

  const navigate = (path) => go(path);

  return (
    <div className="min-h-dvh bg-[#0f0e0d] text-[#f2ece8]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-white/10 bg-[#141312] lg:block">
        <SidebarContent activeId={page.id} onNavigate={navigate} />
      </aside>

      {/* Mobile sidebar */}
      <div className={cx('fixed inset-0 z-50 lg:hidden', sidebarOpen ? '' : 'pointer-events-none')}>
        <div
          onClick={() => setSidebarOpen(false)}
          className={cx(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
            sidebarOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <aside
          className={cx(
            'absolute inset-y-0 left-0 w-[260px] border-r border-white/10 bg-[#141312] transition-transform duration-300',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex justify-end px-3 pt-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#a7a19b] hover:text-[#f2ece8]"
            >
              <X size={18} />
            </button>
          </div>
          <SidebarContent activeId={page.id} onNavigate={navigate} />
        </aside>
      </div>

      <div className="lg:pl-[248px]">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0f0e0d]/90 px-5 py-3.5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#f2ece8] lg:hidden"
            >
              <Menu size={18} />
            </button>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#8d867f]">Admin Panel</p>
              <p className="text-[13px] text-[#e2c694]">
                {NAV.find((item) => item.id === page.id)?.label || 'Dashboard'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[12px] text-[#f2ece8]">{session.name}</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#8d867f]">{session.role}</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C6A16A]/50 bg-[#1c1a18] font-serif text-[14px] text-[#d8b47e]">
              {(session.name || 'A').slice(0, 1).toUpperCase()}
            </span>
            <button
              type="button"
              onClick={onSignOut}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#a7a19b] transition-colors hover:border-[#e07a7a]/50 hover:text-[#e0a08f]"
            >
              <LogOut size={14} strokeWidth={1.6} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[92rem] px-5 py-7 sm:px-8 sm:py-9">{page.node}</main>
      </div>
    </div>
  );
}

export default function AdminApp({ segments = [] }) {
  const [session, setSession] = useState(getAdminSession);

  useEffect(() => {
    if (session) hydrateAdmin();
  }, [session]);

  const handleSignOut = () => {
    resetAdminSync();
    adminSignOut();
    setSession(null);
  };

  return (
    <ToastProvider>
      {session ? (
        <AdminShell session={session} onSignOut={handleSignOut} segments={segments} />
      ) : (
        <AdminLogin onAuthenticated={setSession} />
      )}
    </ToastProvider>
  );
}
