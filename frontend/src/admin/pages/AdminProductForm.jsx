import { useMemo, useRef, useState } from 'react';
import { ArrowLeft, Trash2, Upload, Plus, Save } from 'lucide-react';
import {
  Button,
  Card,
  Field,
  IconButton,
  PageHeader,
  Select,
  SectionTitle,
  TextInput,
  Textarea,
  Toggle,
} from '../ui';
import { useToast } from '../toast';
import {
  filterGroups,
  getProductById,
  saveProduct,
  useCategories,
} from '../../data/products';

const groupOptions = (key) => filterGroups.find((group) => group.key === key)?.options || [];

const emptyProduct = () => ({
  name: '',
  category: 'GOLD',
  type: 'Rings',
  metal: '18K Gold',
  occasion: 'Everyday',
  style: 'Minimal',
  availability: 'In Stock',
  price: '',
  compareAt: '',
  stock: 10,
  diamondShape: '',
  diamondType: '',
  diamondCarat: '',
  material: '',
  weight: '',
  description: '',
  details: '',
  about: '',
  badge: '',
  image: '',
  alt: '',
  finishes: [],
  sizes: [],
  featured: false,
  active: true,
});

function ImageField({ label, value, onChange, onUpload, onClear }) {
  const inputRef = useRef(null);
  return (
    <Field label={label}>
      <div className="flex gap-4">
        <span className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#1c1a18]">
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : null}
        </span>
        <div className="flex-1 space-y-2">
          <TextInput
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="/images/... or https://…"
          />
          <div className="flex flex-wrap gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onUpload(file);
                event.target.value = '';
              }}
            />
            <Button variant="ghost" size="sm" onClick={() => inputRef.current?.click()}>
              <Upload size={13} strokeWidth={1.8} />
              Upload
            </Button>
            {value ? (
              <Button variant="danger" size="sm" onClick={onClear}>
                <Trash2 size={13} strokeWidth={1.8} />
                Clear
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Field>
  );
}

function TagListEditor({ label, hint, values, onChange, placeholder }) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...values, value]);
    setDraft('');
  };
  return (
    <Field label={label} hint={hint}>
      <div className="flex gap-2">
        <TextInput
          value={draft}
          placeholder={placeholder}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              add();
            }
          }}
        />
        <Button variant="ghost" onClick={add} className="shrink-0 px-3.5">
          <Plus size={15} strokeWidth={2} />
        </Button>
      </div>
      {values.length > 0 ? (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {values.map((value, index) => (
            <span
              key={`${value}-${index}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] text-[#c9c2bb]"
            >
              {value}
              <button
                type="button"
                aria-label={`Remove ${value}`}
                onClick={() => onChange(values.filter((_, position) => position !== index))}
                className="text-[#8d867f] transition-colors hover:text-[#e0a08f]"
              >
                <Trash2 size={11} />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </Field>
  );
}

export default function AdminProductForm({ productId = null }) {
  const categories = useCategories();
  const toast = useToast();
  const existing = useMemo(() => (productId ? getProductById(productId) : null), [productId]);

  const [values, setValues] = useState(() => (existing ? { ...emptyProduct(), ...existing } : emptyProduct()));
  const [error, setError] = useState('');

  const set = (key, value) => setValues((current) => ({ ...current, [key]: value }));

  const readFile = (file) => {
    if (file.size > 1.5 * 1024 * 1024) {
      toast('Image is larger than 1.5MB — use an image path instead.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => set('image', String(reader.result));
    reader.readAsDataURL(file);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!values.name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (values.price === '' || Number.isNaN(Number(values.price))) {
      setError('A valid price is required.');
      return;
    }

    const record = {
      ...values,
      id: existing?.id,
      name: values.name.trim(),
      price: Number(values.price),
      compareAt: values.compareAt === '' ? undefined : Number(values.compareAt),
      stock: Number(values.stock) || 0,
      finishes: values.finishes.filter((finish) => finish.name),
      sizes: values.sizes,
    };

    saveProduct(record);
    toast(existing ? 'Product updated' : 'Product created');
    window.location.hash = '#/admin/products';
  };

  const finishName = values._finishName ?? '';
  const finishColor = values._finishColor ?? '#C6A16A';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PageHeader
        title={existing ? 'Edit Product' : 'Add Product'}
        subtitle={existing ? `LUM-${String(existing.id).padStart(3, '0')}` : 'Create a new catalogue piece'}
        actions={
          <>
            <Button variant="ghost" onClick={() => { window.location.hash = '#/admin/products'; }}>
              <ArrowLeft size={15} strokeWidth={1.8} />
              Back
            </Button>
            <Button type="submit">
              <Save size={15} strokeWidth={1.8} />
              Save
            </Button>
          </>
        }
      />

      {error ? (
        <p className="rounded-lg border border-[#e07a7a]/30 bg-[#e07a7a]/10 px-4 py-3 text-[12px] text-[#f0b4b4]">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Card className="space-y-5">
            <SectionTitle>Basics</SectionTitle>
            <Field label="Product Name">
              <TextInput value={values.name} onChange={(event) => set('name', event.target.value)} placeholder="e.g. Diamond Solitaire Ring" />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Category">
                <Select value={values.category} onChange={(event) => set('category', event.target.value)}>
                  {categories.map((entry) => (
                    <option key={entry.key} value={entry.key}>
                      {entry.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Jewellery Type">
                <Select value={values.type} onChange={(event) => set('type', event.target.value)}>
                  {groupOptions('type').map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Metal">
                <Select value={values.metal} onChange={(event) => set('metal', event.target.value)}>
                  {groupOptions('metal').map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Occasion">
                <Select value={values.occasion} onChange={(event) => set('occasion', event.target.value)}>
                  {groupOptions('occasion').map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Style">
                <Select value={values.style} onChange={(event) => set('style', event.target.value)}>
                  {groupOptions('style').map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Availability">
                <Select value={values.availability} onChange={(event) => set('availability', event.target.value)}>
                  {groupOptions('availability').map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          </Card>

          <Card className="space-y-5">
            <SectionTitle>Pricing &amp; Inventory</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Price (₹)">
                <TextInput type="number" min="0" value={values.price} onChange={(event) => set('price', event.target.value)} placeholder="84500" />
              </Field>
              <Field label="Compare-at (₹)" hint="Optional">
                <TextInput type="number" min="0" value={values.compareAt} onChange={(event) => set('compareAt', event.target.value)} placeholder="98000" />
              </Field>
              <Field label="Stock">
                <TextInput type="number" min="0" value={values.stock} onChange={(event) => set('stock', event.target.value)} />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Material" hint="Optional">
                <TextInput value={values.material} onChange={(event) => set('material', event.target.value)} placeholder="18K Gold" />
              </Field>
              <Field label="Weight" hint="Optional">
                <TextInput value={values.weight} onChange={(event) => set('weight', event.target.value)} placeholder="3.82g" />
              </Field>
              <Field label="Badge" hint="e.g. Bestseller">
                <TextInput value={values.badge} onChange={(event) => set('badge', event.target.value)} placeholder="New" />
              </Field>
            </div>
          </Card>

          <Card className="space-y-5">
            <SectionTitle>Diamond Details</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Diamond Shape">
                <Select value={values.diamondShape} onChange={(event) => set('diamondShape', event.target.value)}>
                  <option value="">None</option>
                  {groupOptions('diamondShape').map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Diamond Type">
                <Select value={values.diamondType} onChange={(event) => set('diamondType', event.target.value)}>
                  <option value="">None</option>
                  {groupOptions('diamondType').map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Carat" hint="Optional">
                <TextInput value={values.diamondCarat} onChange={(event) => set('diamondCarat', event.target.value)} placeholder="0.45 ct" />
              </Field>
            </div>
          </Card>

          <Card className="space-y-5">
            <SectionTitle>Description</SectionTitle>
            <Field label="Short Description">
              <Textarea value={values.description} onChange={(event) => set('description', event.target.value)} />
            </Field>
            <Field label="Product Details">
              <Textarea value={values.details} onChange={(event) => set('details', event.target.value)} />
            </Field>
            <Field label="About the Piece">
              <Textarea value={values.about} onChange={(event) => set('about', event.target.value)} />
            </Field>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-5">
            <SectionTitle>Media</SectionTitle>
            <ImageField
              label="Primary Image"
              value={values.image}
              onChange={(value) => set('image', value)}
              onUpload={readFile}
              onClear={() => set('image', '')}
            />
            <Field label="Image Alt Text">
              <TextInput value={values.alt} onChange={(event) => set('alt', event.target.value)} placeholder="Describe the image" />
            </Field>
          </Card>

          <Card className="space-y-5">
            <SectionTitle>Options</SectionTitle>
            <TagListEditor
              label="Sizes"
              hint="Shown as a picker for ring-style pieces."
              values={values.sizes}
              onChange={(next) => set('sizes', next)}
              placeholder="e.g. 7"
            />

            <div>
              <SectionTitle>Finishes</SectionTitle>
              <div className="flex gap-2">
                <TextInput
                  value={finishName}
                  placeholder="Finish name"
                  onChange={(event) => set('_finishName', event.target.value)}
                />
                <input
                  type="color"
                  aria-label="Finish colour"
                  value={finishColor}
                  onChange={(event) => set('_finishColor', event.target.value)}
                  className="h-10 w-14 shrink-0 cursor-pointer rounded-lg border border-white/10 bg-[#1c1a18] px-1"
                />
                <Button
                  variant="ghost"
                  className="shrink-0 px-3.5"
                  onClick={() => {
                    if (!finishName.trim()) return;
                    set('finishes', [...values.finishes, { name: finishName.trim(), color: finishColor }]);
                    set('_finishName', '');
                  }}
                >
                  <Plus size={15} strokeWidth={2} />
                </Button>
              </div>
              {values.finishes.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {values.finishes.map((finish, index) => (
                    <div key={`${finish.name}-${index}`} className="flex items-center gap-2.5 rounded-lg border border-white/10 px-3 py-2">
                      <span className="h-4 w-4 rounded-full border border-white/20" style={{ background: finish.color }} />
                      <span className="flex-1 text-[12px] text-[#c9c2bb]">{finish.name}</span>
                      <IconButton
                        label={`Remove ${finish.name}`}
                        className="h-7 w-7 border-transparent hover:border-[#e07a7a]/50 hover:text-[#e0a08f]"
                        onClick={() => set('finishes', values.finishes.filter((_, position) => position !== index))}
                      >
                        <Trash2 size={13} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Card>

          <Card className="space-y-4">
            <SectionTitle>Visibility</SectionTitle>
            <Toggle checked={values.featured} onChange={(next) => set('featured', next)} label="Featured piece" />
            <Toggle checked={values.active} onChange={(next) => set('active', next)} label="Active on storefront" />
          </Card>
        </div>
      </div>
    </form>
  );
}
