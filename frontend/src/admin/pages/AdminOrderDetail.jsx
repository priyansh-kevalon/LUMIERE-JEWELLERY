import { useMemo, useState } from 'react';
import { ArrowLeft, Check, Truck, Save, RotateCcw } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  Field,
  PageHeader,
  SectionTitle,
  Select,
  TableWrap,
  Td,
  Th,
  TextInput,
} from '../ui';
import { useToast } from '../toast';
import { ORDER_FLOW, ORDER_STATUSES, PAYMENT_STATUSES, updateOrder, useOrders } from '../../data/adminData';
import { formatINR } from '../../data/products';

export default function AdminOrderDetail({ orderId }) {
  const orders = useOrders();
  const toast = useToast();
  const order = useMemo(() => orders.find((entry) => entry.id === orderId), [orders, orderId]);
  const [tracking, setTracking] = useState(order?.tracking || '');

  if (!order) {
    return (
      <div className="space-y-6">
        <PageHeader title="Order not found" />
        <Button variant="ghost" onClick={() => { window.location.hash = '#/admin/orders'; }}>
          <ArrowLeft size={15} strokeWidth={1.8} />
          Back to Orders
        </Button>
      </div>
    );
  }

  const currentStep = ORDER_STATUSES.indexOf(order.status);
  const dateLabel = (value) =>
    new Date(value).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const setStatus = (status) => {
    updateOrder(order.id, { status });
    toast(`Order marked ${status}`);
  };

  const setPayment = (payment) => {
    updateOrder(order.id, { payment });
    toast(`Payment marked ${payment}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={order.id}
        subtitle={`Placed on ${dateLabel(order.createdAt)}`}
        actions={
          <Button variant="ghost" onClick={() => { window.location.hash = '#/admin/orders'; }}>
            <ArrowLeft size={15} strokeWidth={1.8} />
            Back
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Card>
            <SectionTitle>Items</SectionTitle>
            <div className="-mx-5 sm:-mx-6">
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Piece</Th>
                    <Th className="text-right">Price</Th>
                    <Th className="text-center">Qty</Th>
                    <Th className="text-right">Total</Th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={`${item.id}-${item.size ?? ''}`}>
                      <Td>
                        <div className="flex items-center gap-3">
                          <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#1c1a18]">
                            {item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : null}
                          </span>
                          <div>
                            <p className="text-[13px] text-[#f2ece8]">{item.name}</p>
                            {item.size || item.metal ? (
                              <p className="text-[10.5px] uppercase tracking-[0.12em] text-[#6f6a64]">
                                {[item.metal, item.size ? `Size ${item.size}` : null].filter(Boolean).join(' · ')}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </Td>
                      <Td className="text-right tabular-nums">{formatINR(item.price)}</Td>
                      <Td className="text-center tabular-nums">{item.qty}</Td>
                      <Td className="text-right tabular-nums">{formatINR(item.price * item.qty)}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            </div>

            <div className="mt-5 ml-auto max-w-xs space-y-2 text-[13px]">
              <div className="flex justify-between text-[#9d968f]">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#e8e2db]">{formatINR(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#9d968f]">
                <span>Shipping</span>
                <span className="tabular-nums text-[#e8e2db]">{order.shipping ? formatINR(order.shipping) : 'Free'}</span>
              </div>
              <div className="flex justify-between text-[#9d968f]">
                <span>Tax (GST)</span>
                <span className="tabular-nums text-[#e8e2db]">{formatINR(order.tax)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-[15px]">
                <span className="text-[#f2ece8]">Total</span>
                <span className="tabular-nums text-[#d8b47e]">{formatINR(order.total)}</span>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle>Fulfilment Timeline</SectionTitle>
            <ol className="relative space-y-5 border-l border-white/10 pl-6">
              {ORDER_STATUSES.map((step, index) => {
                const done = index <= currentStep && order.status !== 'cancelled';
                return (
                  <li key={step} className="relative">
                    <span
                      className={`absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full border ${
                        done ? 'border-[#C6A16A] bg-[#C6A16A] text-[#0D0D0D]' : 'border-white/20 bg-[#141312] text-transparent'
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-[13px] capitalize ${done ? 'text-[#f2ece8]' : 'text-[#8d867f]'}`}>
                        {step}
                      </span>
                      {order.status !== step ? (
                        <button
                          type="button"
                          onClick={() => setStatus(step)}
                          className="text-[10px] uppercase tracking-[0.14em] text-[#C6A16A] transition-colors hover:text-[#e2c694]"
                        >
                          Set
                        </button>
                      ) : (
                        <Badge tone="active">Current</Badge>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            {order.status !== 'cancelled' ? (
              <Button variant="danger" className="mt-5" onClick={() => setStatus('cancelled')}>
                Cancel Order
              </Button>
            ) : (
              <div className="mt-5 flex items-center gap-3">
                <Badge tone="cancelled">Cancelled</Badge>
                <button
                  type="button"
                  onClick={() => setStatus('pending')}
                  className="text-[10px] uppercase tracking-[0.14em] text-[#C6A16A] hover:text-[#e2c694]"
                >
                  Reinstate
                </button>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-4">
            <SectionTitle>Customer</SectionTitle>
            <div>
              <p className="text-[14px] text-[#f2ece8]">{order.customer.name}</p>
              <p className="text-[12px] text-[#9d968f]">{order.customer.email}</p>
              <p className="text-[12px] text-[#9d968f]">{order.customer.phone}</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#8d867f]">
                Shipping Address
              </p>
              <p className="text-[12.5px] leading-relaxed text-[#c9c2bb]">
                {order.address.line1}
                <br />
                {order.address.city}, {order.address.state} {order.address.pincode}
              </p>
            </div>
          </Card>

          <Card className="space-y-4">
            <SectionTitle
              action={
                <Badge tone={order.payment}>
                  {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
                </Badge>
              }
            >
              Payment
            </SectionTitle>
            <Field label="Payment Status">
              <Select value={order.payment} onChange={(event) => setPayment(event.target.value)}>
                {PAYMENT_STATUSES.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry.charAt(0).toUpperCase() + entry.slice(1)}
                  </option>
                ))}
              </Select>
            </Field>
            <p className="text-[12px] text-[#8d867f]">
              Method: <span className="text-[#c9c2bb]">{order.paymentMethod}</span>
            </p>
            {order.payment === 'refunded' ? (
              <p className="flex items-center gap-2 text-[12px] text-[#e8d3a0]">
                <RotateCcw size={14} strokeWidth={1.8} />
                Refund issued to the customer.
              </p>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-center"
                disabled={order.payment !== 'paid'}
                onClick={() => setPayment('refunded')}
              >
                <RotateCcw size={14} strokeWidth={1.8} />
                Issue Refund
              </Button>
            )}
          </Card>

          <Card className="space-y-4">
            <SectionTitle>Shipping</SectionTitle>
            <Field label="Tracking Number" hint="Optional">
              <TextInput value={tracking} onChange={(event) => setTracking(event.target.value)} placeholder="e.g. BLR7789123401" />
            </Field>
            <Button
              onClick={() => {
                updateOrder(order.id, { tracking: tracking.trim() });
                toast('Tracking number saved');
              }}
            >
              <Save size={14} strokeWidth={1.8} />
              Save Tracking
            </Button>
            {order.tracking ? (
              <p className="flex items-center gap-2 text-[12px] text-[#9d968f]">
                <Truck size={14} className="text-[#C6A16A]" />
                {order.tracking}
              </p>
            ) : null}
          </Card>

          <Card>
            <SectionTitle>Order Status</SectionTitle>
            <Select value={order.status} onChange={(event) => setStatus(event.target.value)}>
              {ORDER_FLOW.map((entry) => (
                <option key={entry} value={entry}>
                  {entry.charAt(0).toUpperCase() + entry.slice(1)}
                </option>
              ))}
            </Select>
          </Card>
        </div>
      </div>
    </div>
  );
}
