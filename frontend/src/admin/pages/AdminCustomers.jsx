import { useMemo, useState } from 'react';
import { Search, Crown } from 'lucide-react';
import { Badge, Card, EmptyState, PageHeader, TableWrap, Td, Th, TextInput } from '../ui';
import { buildCustomers, useCustomers, useOrders } from '../../data/adminData';
import { readStorage } from '../../data/store';
import { formatINR } from '../../data/products';

export default function AdminCustomers() {
  const orders = useOrders();
  const remoteCustomers = useCustomers();
  const users = useMemo(() => readStorage('lumiere-users', []), []);
  const [query, setQuery] = useState('');

  const customers = useMemo(
    () => (remoteCustomers.length ? remoteCustomers : buildCustomers(orders, users)),
    [remoteCustomers, orders, users],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return customers;
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) || customer.email.toLowerCase().includes(term),
    );
  }, [customers, query]);

  const spendValues = customers.map((customer) => customer.spend);
  const vipThreshold = spendValues.length
    ? spendValues.sort((a, b) => b - a)[Math.max(0, Math.floor(spendValues.length * 0.25) - 1)] || 0
    : 0;

  const dateLabel = (value) =>
    value ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" subtitle={`${customers.length} registered & guest buyers`} />

      <Card className="p-4">
        <div className="relative">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f6a64]" />
          <TextInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or email…"
            className="pl-10"
          />
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={<Search size={20} />} title="No customers found" copy="Try a different search." />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Customer</Th>
              <Th>Phone</Th>
              <Th className="text-center">Orders</Th>
              <Th className="text-right">Lifetime Spend</Th>
              <Th>Last Order</Th>
              <Th>Tag</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => {
              const vip = vipThreshold > 0 && customer.spend >= vipThreshold;
              return (
                <tr key={customer.email} className="transition-colors hover:bg-white/[0.03]">
                  <Td>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C6A16A]/40 bg-[#1c1a18] font-serif text-[13px] text-[#d8b47e]">
                        {(customer.name || '?').slice(0, 1).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-[13px] text-[#f2ece8]">{customer.name}</p>
                        <p className="text-[10.5px] text-[#6f6a64]">{customer.email}</p>
                      </div>
                    </div>
                  </Td>
                  <Td>{customer.phone || '—'}</Td>
                  <Td className="text-center tabular-nums">{customer.orders}</Td>
                  <Td className="text-right tabular-nums text-[#d8b47e]">{formatINR(customer.spend)}</Td>
                  <Td>{dateLabel(customer.lastOrderAt)}</Td>
                  <Td>
                    {vip ? (
                      <Badge tone="approved">
                        <Crown size={11} className="mr-1" /> VIP
                      </Badge>
                    ) : (
                      <Badge tone="inactive">Standard</Badge>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      )}
    </div>
  );
}
