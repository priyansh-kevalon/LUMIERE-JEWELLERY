import { useMemo, useState } from 'react';
import { Mail, Search } from 'lucide-react';
import { Card, EmptyState, PageHeader, TableWrap, Td, Th, TextInput } from '../ui';
import { useSubscribers } from '../../data/adminData';

export default function AdminSubscribers() {
  const subscribers = useSubscribers();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return subscribers;
    return subscribers.filter((item) => item.email.toLowerCase().includes(term));
  }, [subscribers, query]);

  const dateLabel = (value) =>
    value
      ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      : '—';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Newsletter Subscribers"
        subtitle={`${subscribers.length} subscriber${subscribers.length === 1 ? '' : 's'}`}
      />

      <Card className="p-4">
        <div className="relative">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f6a64]" />
          <TextInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by email…"
            className="pl-10"
          />
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Mail size={20} />}
          title={subscribers.length === 0 ? 'No subscribers yet' : 'No matches found'}
          copy={
            subscribers.length === 0
              ? 'Emails submitted through the footer “Be the First to Know” form appear here.'
              : 'Try a different search.'
          }
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th className="w-[70%] whitespace-nowrap">Email</Th>
              <Th className="w-[30%] whitespace-nowrap">Subscribed</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((subscriber) => (
              <tr key={subscriber.email} className="transition-colors hover:bg-white/[0.03]">
                <Td>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C6A16A]/40 bg-[#1c1a18] text-[#d8b47e]">
                      <Mail size={15} strokeWidth={1.6} />
                    </span>
                    <a
                      href={`mailto:${subscriber.email}`}
                      className="min-w-0 truncate text-[13px] text-[#f2ece8] transition-colors hover:text-[#C6A16A]"
                    >
                      {subscriber.email}
                    </a>
                  </div>
                </Td>
                <Td className="whitespace-nowrap">{dateLabel(subscriber.createdAt)}</Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </div>
  );
}
