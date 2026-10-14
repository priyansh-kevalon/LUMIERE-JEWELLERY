import { useState } from 'react';
import { Plus, Pencil, Trash2, Ticket } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  IconButton,
  Modal,
  PageHeader,
  Select,
  TableWrap,
  Td,
  Th,
  TextInput,
  Toggle,
} from '../ui';
import { useToast } from '../toast';
import { deleteCoupon, saveCoupon, useCoupons } from '../../data/adminData';
import { formatINR } from '../../data/products';

const emptyCoupon = {
  code: '',
  type: 'percent',
  value: '',
  minOrder: '',
  usageLimit: '',
  active: true,
  firstOrderOnly: false,
  description: '',
};

export default function AdminCoupons() {
  const coupons = useCoupons();
  const toast = useToast();
  const [draft, setDraft] = useState(null);
  const [pending, setPending] = useState(null);

  const openNew = () => setDraft(emptyCoupon);
  const openEdit = (coupon) => setDraft({ ...emptyCoupon, ...coupon });

  const submit = () => {
    if (!draft.code.trim()) {
      toast('A coupon code is required', 'error');
      return;
    }
    if (draft.value === '' || Number.isNaN(Number(draft.value))) {
      toast('Enter a valid discount value', 'error');
      return;
    }
    saveCoupon({
      ...draft,
      value: Number(draft.value),
      minOrder: draft.minOrder === '' ? 0 : Number(draft.minOrder),
      usageLimit: draft.usageLimit === '' ? 0 : Number(draft.usageLimit),
    });
    toast('Coupon saved');
    setDraft(null);
  };

  const confirmDelete = () => {
    deleteCoupon(pending.code);
    toast('Coupon deleted');
    setPending(null);
  };

  const valueLabel = (coupon) =>
    coupon.type === 'percent' ? `${coupon.value}% off` : `${formatINR(coupon.value)} off`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coupons"
        subtitle={`${coupons.filter((coupon) => coupon.active).length} active promotions`}
        actions={
          <Button onClick={openNew}>
            <Plus size={15} strokeWidth={2} />
            Add Coupon
          </Button>
        }
      />

      {coupons.length === 0 ? (
        <EmptyState icon={<Ticket size={20} />} title="No coupons yet" copy="Create a discount code to get started." />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Code</Th>
              <Th>Discount</Th>
              <Th>Min. Order</Th>
              <Th>Usage</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.code} className="transition-colors hover:bg-white/[0.03]">
                <Td>
                  <span className="font-mono text-[13px] tracking-wide text-[#f2ece8]">{coupon.code}</span>
                  {coupon.description ? (
                    <span className="mt-0.5 block text-[10.5px] text-[#6f6a64]">{coupon.description}</span>
                  ) : null}
                </Td>
                <Td className="text-[#d8b47e]">{valueLabel(coupon)}</Td>
                <Td className="tabular-nums">{coupon.minOrder ? formatINR(coupon.minOrder) : '—'}</Td>
                <Td className="tabular-nums">
                  {coupon.used}
                  {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ''}
                </Td>
                <Td>
                  <Badge tone={coupon.active ? 'active' : 'inactive'}>
                    {coupon.active ? 'Active' : 'Inactive'}
                  </Badge>
                </Td>
                <Td>
                  <div className="flex items-center justify-end gap-2">
                    <IconButton label="Edit" onClick={() => openEdit(coupon)}>
                      <Pencil size={14} strokeWidth={1.6} />
                    </IconButton>
                    <IconButton
                      label="Delete"
                      className="hover:border-[#e07a7a]/50 hover:text-[#e0a08f]"
                      onClick={() => setPending(coupon)}
                    >
                      <Trash2 size={14} strokeWidth={1.6} />
                    </IconButton>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}

      <Modal
        open={Boolean(draft)}
        onClose={() => setDraft(null)}
        title={draft && draft.code && coupons.some((c) => c.code === draft.code) ? 'Edit Coupon' : 'Add Coupon'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Button>
            <Button onClick={submit}>Save Coupon</Button>
          </>
        }
      >
        {draft ? (
          <div className="space-y-4">
            <Field label="Coupon Code">
              <TextInput
                value={draft.code}
                placeholder="LUMIERE10"
                onChange={(event) => setDraft((current) => ({ ...current, code: event.target.value.toUpperCase() }))}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Type">
                <Select value={draft.type} onChange={(event) => setDraft((current) => ({ ...current, type: event.target.value }))}>
                  <option value="percent">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </Select>
              </Field>
              <Field label={draft.type === 'percent' ? 'Value (%)' : 'Value (₹)'}>
                <TextInput
                  type="number"
                  min="0"
                  value={draft.value}
                  onChange={(event) => setDraft((current) => ({ ...current, value: event.target.value }))}
                />
              </Field>
              <Field label="Min. Order (₹)" hint="0 for none">
                <TextInput
                  type="number"
                  min="0"
                  value={draft.minOrder}
                  onChange={(event) => setDraft((current) => ({ ...current, minOrder: event.target.value }))}
                />
              </Field>
              <Field label="Usage Limit" hint="0 for unlimited">
                <TextInput
                  type="number"
                  min="0"
                  value={draft.usageLimit}
                  onChange={(event) => setDraft((current) => ({ ...current, usageLimit: event.target.value }))}
                />
              </Field>
            </div>
            <Field label="Description" hint="Optional">
              <TextInput
                value={draft.description}
                onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
              />
            </Field>
            <div className="flex items-center gap-8">
              <Toggle checked={draft.active} onChange={(next) => setDraft((current) => ({ ...current, active: next }))} label="Active" />
              <Toggle
                checked={draft.firstOrderOnly}
                onChange={(next) => setDraft((current) => ({ ...current, firstOrderOnly: next }))}
                label="First order only"
              />
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(pending)}
        onClose={() => setPending(null)}
        title="Delete coupon"
        footer={
          <>
            <Button variant="ghost" onClick={() => setPending(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-[13px] leading-relaxed text-[#c9c2bb]">
          Delete coupon <span className="font-mono text-[#f2ece8]">{pending?.code}</span>?
        </p>
      </Modal>
    </div>
  );
}
