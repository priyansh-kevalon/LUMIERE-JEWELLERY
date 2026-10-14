import { useState } from 'react';
import { Save, RotateCcw, Check } from 'lucide-react';
import { Button, Card, Field, Modal, PageHeader, SectionTitle, TextInput } from '../ui';
import { useToast } from '../toast';
import { updateSettings, useSettings, ordersStore, couponsStore, reviewsStore, settingsStore } from '../../data/adminData';
import { categoriesStore, productsStore } from '../../data/products';

const ALL_PAYMENT_METHODS = ['UPI', 'Card', 'Net Banking', 'Bank Transfer', 'Cash on Delivery'];

export default function AdminSettings() {
  const settings = useSettings();
  const toast = useToast();
  const [draft, setDraft] = useState(settings);
  const [resetOpen, setResetOpen] = useState(false);

  const set = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const setSocial = (key, value) => setDraft((current) => ({ ...current, social: { ...current.social, [key]: value } }));

  const togglePayment = (method) => {
    setDraft((current) => {
      const has = current.paymentMethods.includes(method);
      return {
        ...current,
        paymentMethods: has
          ? current.paymentMethods.filter((entry) => entry !== method)
          : [...current.paymentMethods, method],
      };
    });
  };

  const save = () => {
    updateSettings({
      ...draft,
      gstRate: Number(draft.gstRate) || 0,
      freeShippingThreshold: Number(draft.freeShippingThreshold) || 0,
      lowStockThreshold: Number(draft.lowStockThreshold) || 0,
    });
    toast('Settings saved');
  };

  const resetDemo = () => {
    productsStore.reset();
    categoriesStore.reset();
    ordersStore.reset();
    couponsStore.reset();
    reviewsStore.reset();
    settingsStore.reset();
    setDraft(settingsStore.get());
    setResetOpen(false);
    toast('Demo data restored');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Store profile, tax and operational preferences"
        actions={
          <>
            <Button variant="ghost" onClick={() => setResetOpen(true)}>
              <RotateCcw size={14} strokeWidth={1.8} />
              Reset Demo Data
            </Button>
            <Button onClick={save}>
              <Save size={15} strokeWidth={1.8} />
              Save Changes
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="space-y-5">
          <SectionTitle>Store Profile</SectionTitle>
          <Field label="Store Name">
            <TextInput value={draft.storeName} onChange={(event) => set('storeName', event.target.value)} />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Contact Email">
              <TextInput type="email" value={draft.contactEmail} onChange={(event) => set('contactEmail', event.target.value)} />
            </Field>
            <Field label="Phone">
              <TextInput value={draft.phone} onChange={(event) => set('phone', event.target.value)} />
            </Field>
          </div>
          <Field label="Address">
            <TextInput value={draft.address} onChange={(event) => set('address', event.target.value)} />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Currency">
              <TextInput value={draft.currency} onChange={(event) => set('currency', event.target.value)} />
            </Field>
            <Field label="Timezone">
              <TextInput value={draft.timezone} onChange={(event) => set('timezone', event.target.value)} />
            </Field>
          </div>
        </Card>

        <Card className="space-y-5">
          <SectionTitle>Tax &amp; Shipping</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="GST Rate (%)">
              <TextInput type="number" min="0" value={draft.gstRate} onChange={(event) => set('gstRate', event.target.value)} />
            </Field>
            <Field label="Low Stock Threshold">
              <TextInput
                type="number"
                min="0"
                value={draft.lowStockThreshold}
                onChange={(event) => set('lowStockThreshold', event.target.value)}
              />
            </Field>
          </div>
          <Field label="Free Shipping Above (₹)">
            <TextInput
              type="number"
              min="0"
              value={draft.freeShippingThreshold}
              onChange={(event) => set('freeShippingThreshold', event.target.value)}
            />
          </Field>

          <div>
            <span className="mb-2.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a19b]">
              Payment Methods
            </span>
            <div className="flex flex-wrap gap-2">
              {ALL_PAYMENT_METHODS.map((method) => {
                const active = draft.paymentMethods.includes(method);
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => togglePayment(method)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11px] transition-colors ${
                      active
                        ? 'border-[#C6A16A]/50 bg-[#C6A16A]/12 text-[#e2c694]'
                        : 'border-white/15 text-[#8d867f] hover:border-white/30 hover:text-[#c9c2bb]'
                    }`}
                  >
                    {active ? <Check size={12} strokeWidth={2.6} /> : null}
                    {method}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        <Card className="space-y-5 xl:col-span-2">
          <SectionTitle>Social Links</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Instagram">
              <TextInput value={draft.social.instagram} onChange={(event) => setSocial('instagram', event.target.value)} />
            </Field>
            <Field label="Facebook">
              <TextInput value={draft.social.facebook} onChange={(event) => setSocial('facebook', event.target.value)} />
            </Field>
            <Field label="Pinterest">
              <TextInput value={draft.social.pinterest} onChange={(event) => setSocial('pinterest', event.target.value)} />
            </Field>
          </div>
        </Card>
      </div>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset demo data"
        footer={
          <>
            <Button variant="ghost" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={resetDemo}>
              Reset Everything
            </Button>
          </>
        }
      >
        <p className="text-[13px] leading-relaxed text-[#c9c2bb]">
          This restores the original demo catalogue, categories, orders, coupons, reviews and settings.
          Any changes you have made will be lost.
        </p>
      </Modal>
    </div>
  );
}
