import { useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import {
  Badge,
  Card,
  EmptyState,
  PageHeader,
  Select,
  TableWrap,
  Td,
  Th,
  TextInput,
} from '../ui';
import { ORDER_FLOW, useOrders } from '../../data/adminData';
import { formatINR } from '../../data/products';

export default function AdminOrders() {
  const orders = useOrders();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('ALL');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return orders
      .filter((order) => status === 'ALL' || order.status === status)
      .filter(
        (order) =>
          !term ||
          order.id.toLowerCase().includes(term) ||
          (order.customer?.name || '').toLowerCase().includes(term) ||
          (order.customer?.email || '').toLowerCase().includes(term),
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [orders, query, status]);

  const dateLabel = (value) =>
    new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" subtitle={`${orders.length} orders placed`} />

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f6a64]" />
            <TextInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search order ID, customer or email…"
              className="pl-10"
            />
          </div>
          <Select value={status} onChange={(event) => setStatus(event.target.value)} className="sm:w-48">
            <option value="ALL">All Statuses</option>
            {ORDER_FLOW.map((entry) => (
              <option key={entry} value={entry}>
                {entry.charAt(0).toUpperCase() + entry.slice(1)}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={<Search size={20} />} title="No orders found" copy="Adjust your search or filters." />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Order</Th>
              <Th>Customer</Th>
              <Th>Items</Th>
              <Th>Payment</Th>
              <Th>Status</Th>
              <Th className="text-right">Total</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="transition-colors hover:bg-white/[0.03]">
                <Td>
                  <span className="text-[#f2ece8]">{order.id}</span>
                  <span className="mt-0.5 block text-[10.5px] text-[#6f6a64]">{dateLabel(order.createdAt)}</span>
                </Td>
                <Td>
                  <span className="text-[#e8e2db]">{order.customer?.name || 'Guest'}</span>
                  <span className="mt-0.5 block text-[10.5px] text-[#6f6a64]">{order.customer?.email}</span>
                </Td>
                <Td className="tabular-nums">{(order.items || []).reduce((sum, item) => sum + item.qty, 0)}</Td>
                <Td>
                  <Badge tone={order.payment}>{order.payment}</Badge>
                </Td>
                <Td>
                  <Badge tone={order.status}>{order.status}</Badge>
                </Td>
                <Td className="text-right tabular-nums">{formatINR(order.total)}</Td>
                <Td className="text-right">
                  <a
                    href={`#/admin/orders/${order.id}`}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-[#C6A16A] transition-colors hover:text-[#e2c694]"
                  >
                    View
                    <ArrowRight size={13} />
                  </a>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </div>
  );
}
