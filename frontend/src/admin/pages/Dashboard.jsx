import { useMemo } from 'react';
import { ArrowRight, IndianRupee, ShoppingCart, Users, TrendingUp, PackageX, Boxes } from 'lucide-react';
import { Badge, Card, PageHeader, SectionTitle, TableWrap, Td, Th, cx } from '../ui';
import { useOrders, useSettings, useCustomers, buildCustomers } from '../../data/adminData';
import { readStorage } from '../../data/store';
import { formatINR, useProducts } from '../../data/products';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <Card className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8d867f]">{label}</p>
        <p className="mt-2.5 font-serif text-[26px] leading-none text-[#f2ece8]">{value}</p>
        {sub ? <p className="mt-2 text-[11px] text-[#6f6a64]">{sub}</p> : null}
      </div>
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C6A16A]/30 bg-[#C6A16A]/10 text-[#C6A16A]">
        <Icon size={18} strokeWidth={1.6} />
      </span>
    </Card>
  );
}

export default function Dashboard() {
  const orders = useOrders();
  const products = useProducts();
  const settings = useSettings();
  const remoteCustomers = useCustomers();
  const users = useMemo(() => readStorage('lumiere-users', []), []);

  const stats = useMemo(() => {
    const paid = orders.filter((order) => order.payment === 'paid');
    const revenue = paid.reduce((sum, order) => sum + order.total, 0);
    const customers = remoteCustomers.length ? remoteCustomers : buildCustomers(orders, users);
    const aov = paid.length ? Math.round(revenue / paid.length) : 0;

    return {
      revenue,
      orderCount: orders.length,
      customerCount: customers.length,
      aov,
      productCount: products.length,
    };
  }, [orders, products, users, remoteCustomers]);

  const lowStock = useMemo(
    () =>
      products
        .filter((product) => (product.stock ?? 0) <= (settings.lowStockThreshold ?? 5))
        .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0)),
    [products, settings.lowStockThreshold],
  );

  const revenueSeries = useMemo(() => {
    const buckets = [];
    const base = new Date();
    base.setDate(1);
    for (let offset = 5; offset >= 0; offset -= 1) {
      const date = new Date(base.getFullYear(), base.getMonth() - offset, 1);
      buckets.push({ key: `${date.getFullYear()}-${date.getMonth()}`, label: MONTHS[date.getMonth()], total: 0 });
    }
    const index = new Map(buckets.map((bucket, position) => [bucket.key, position]));
    for (const order of orders) {
      if (order.payment !== 'paid') continue;
      const date = new Date(order.createdAt);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (index.has(key)) buckets[index.get(key)].total += order.total;
    }
    return buckets;
  }, [orders]);

  const maxRevenue = Math.max(...revenueSeries.map((bucket) => bucket.total), 1);

  const topProducts = useMemo(() => {
    const tally = new Map();
    for (const order of orders) {
      for (const item of order.items || []) {
        const entry = tally.get(item.id) || { id: item.id, name: item.name, image: item.image, qty: 0, revenue: 0 };
        entry.qty += item.qty;
        entry.revenue += item.qty * item.price;
        tally.set(item.id, entry);
      }
    }
    return [...tally.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [orders]);

  const recentOrders = useMemo(
    () => [...orders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6),
    [orders],
  );

  const dateLabel = (value) =>
    new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" subtitle="A live overview of your store performance." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={IndianRupee} label="Total Revenue" value={formatINR(stats.revenue)} sub="Paid orders" />
        <StatCard icon={ShoppingCart} label="Orders" value={stats.orderCount} sub={`${orders.filter((o) => o.status === 'pending').length} pending`} />
        <StatCard icon={Users} label="Customers" value={stats.customerCount} sub="Unique buyers" />
        <StatCard icon={TrendingUp} label="Avg. Order Value" value={formatINR(stats.aov)} sub="Across paid orders" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <SectionTitle>Revenue · Last 6 Months</SectionTitle>
          <div className="flex h-[220px] items-end gap-3 sm:gap-5">
            {revenueSeries.map((bucket) => {
              const height = Math.max(4, Math.round((bucket.total / maxRevenue) * 180));
              return (
                <div key={bucket.key} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-[10px] tabular-nums text-[#8d867f]">
                    {bucket.total ? formatINR(bucket.total) : '—'}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#8F7340] to-[#C6A16A] transition-all duration-500"
                    style={{ height }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#6f6a64]">
                    {bucket.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionTitle
            action={
              <a href="#/admin/products" className="text-[10px] uppercase tracking-[0.14em] text-[#C6A16A] hover:text-[#e2c694]">
                View all
              </a>
            }
          >
            Low Stock
          </SectionTitle>
          <div className="space-y-3">
            {lowStock.length === 0 ? (
              <p className="text-[12px] font-light text-[#8d867f]">All pieces are comfortably stocked.</p>
            ) : (
              lowStock.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] text-[#e8e2db]">{product.name}</p>
                    <p className="text-[10.5px] uppercase tracking-[0.12em] text-[#6f6a64]">
                      {product.category} · {product.type}
                    </p>
                  </div>
                  <Badge tone={(product.stock ?? 0) <= 0 ? 'cancelled' : 'pending'}>
                    {(product.stock ?? 0) <= 0 ? 'Out' : `${product.stock} left`}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <SectionTitle
            action={
              <a href="#/admin/orders" className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[#C6A16A] hover:text-[#e2c694]">
                All orders
                <ArrowRight size={12} />
              </a>
            }
          >
            Recent Orders
          </SectionTitle>
          <div className="-mx-5 sm:-mx-6">
            <TableWrap>
              <thead>
                <tr>
                  <Th>Order</Th>
                  <Th>Customer</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Total</Th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-white/[0.03]">
                    <Td>
                      <a href={`#/admin/orders/${order.id}`} className="text-[#C6A16A] hover:text-[#e2c694]">
                        {order.id}
                      </a>
                      <span className="mt-0.5 block text-[10.5px] text-[#6f6a64]">{dateLabel(order.createdAt)}</span>
                    </Td>
                    <Td>{order.customer?.name || 'Guest'}</Td>
                    <Td>
                      <Badge tone={order.status}>{order.status}</Badge>
                    </Td>
                    <Td className="text-right tabular-nums">{formatINR(order.total)}</Td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          </div>
        </Card>

        <Card>
          <SectionTitle>Top Selling Pieces</SectionTitle>
          <div className="space-y-3.5">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3.5">
                <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#1c1a18]">
                  {product.image ? (
                    <img src={product.image} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] text-[#e8e2db]">{product.name}</p>
                  <p className="text-[10.5px] text-[#6f6a64]">{product.qty} sold</p>
                </div>
                <span className="text-[12.5px] tabular-nums text-[#d8b47e]">{formatINR(product.revenue)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className={cx('flex items-center gap-3.5')}>
          <Boxes size={20} className="text-[#C6A16A]" strokeWidth={1.6} />
          <div>
            <p className="text-[20px] font-serif text-[#f2ece8]">{stats.productCount}</p>
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-[#8d867f]">Products</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3.5">
          <PackageX size={20} className="text-[#e0a08f]" strokeWidth={1.6} />
          <div>
            <p className="text-[20px] font-serif text-[#f2ece8]">{lowStock.length}</p>
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-[#8d867f]">Low Stock Alerts</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3.5">
          <TrendingUp size={20} className="text-[#9fc6a2]" strokeWidth={1.6} />
          <div>
            <p className="text-[20px] font-serif text-[#f2ece8]">
              {orders.filter((order) => order.status === 'delivered').length}
            </p>
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-[#8d867f]">Delivered Orders</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
