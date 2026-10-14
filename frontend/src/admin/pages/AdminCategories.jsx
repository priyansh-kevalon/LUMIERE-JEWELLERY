import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Button,
  Card,
  EmptyState,
  Field,
  IconButton,
  Modal,
  PageHeader,
  TextInput,
} from '../ui';
import { useToast } from '../toast';
import { deleteCategory, saveCategory, useCategories, useProducts } from '../../data/products';

const emptyCategory = { key: '', label: '', image: '', alt: '' };

export default function AdminCategories() {
  const categories = useCategories();
  const products = useProducts();
  const toast = useToast();
  const [draft, setDraft] = useState(null);
  const [pending, setPending] = useState(null);

  const countFor = (key) => products.filter((product) => product.category === key).length;

  const openNew = () => setDraft(emptyCategory);
  const openEdit = (category) => setDraft({ ...category });

  const submit = () => {
    if (!draft.label.trim() && !draft.key.trim()) {
      toast('A category label is required', 'error');
      return;
    }
    saveCategory(draft);
    toast('Category saved');
    setDraft(null);
  };

  const confirmDelete = () => {
    deleteCategory(pending.key);
    toast('Category deleted');
    setPending(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        subtitle={`${categories.length} collections`}
        actions={
          <Button onClick={openNew}>
            <Plus size={15} strokeWidth={2} />
            Add Category
          </Button>
        }
      />

      {categories.length === 0 ? (
        <EmptyState title="No categories yet" copy="Add your first category to organise the catalogue." />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.key} className="p-0">
              <div className="relative h-40 overflow-hidden rounded-t-xl bg-[#1c1a18]">
                {category.image ? (
                  <img src={category.image} alt={category.alt} className="h-full w-full object-cover" />
                ) : null}
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#e2c694] backdrop-blur-sm">
                  {countFor(category.key)} items
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate text-[14px] text-[#f2ece8]">{category.label}</p>
                  <p className="text-[10.5px] uppercase tracking-[0.14em] text-[#6f6a64]">{category.key}</p>
                </div>
                <div className="flex gap-2">
                  <IconButton label="Edit" onClick={() => openEdit(category)}>
                    <Pencil size={14} strokeWidth={1.6} />
                  </IconButton>
                  <IconButton
                    label="Delete"
                    className="hover:border-[#e07a7a]/50 hover:text-[#e0a08f]"
                    onClick={() => setPending(category)}
                  >
                    <Trash2 size={14} strokeWidth={1.6} />
                  </IconButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={Boolean(draft)}
        onClose={() => setDraft(null)}
        title={draft?.key ? 'Edit Category' : 'Add Category'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Button>
            <Button onClick={submit}>Save Category</Button>
          </>
        }
      >
        {draft ? (
          <div className="space-y-4">
            <Field label="Label">
              <TextInput
                value={draft.label}
                placeholder="e.g. GOLD"
                onChange={(event) => {
                  const label = event.target.value;
                  setDraft((current) => ({
                    ...current,
                    label,
                    key: current.key || label.trim().toUpperCase().replace(/[^A-Z0-9]+/g, '-'),
                  }));
                }}
              />
            </Field>
            <Field label="Key" hint="Used in URLs and filtering.">
              <TextInput
                value={draft.key}
                placeholder="GOLD"
                onChange={(event) => setDraft((current) => ({ ...current, key: event.target.value.toUpperCase() }))}
              />
            </Field>
            <Field label="Image Path or URL">
              <TextInput
                value={draft.image}
                placeholder="/images/..."
                onChange={(event) => setDraft((current) => ({ ...current, image: event.target.value }))}
              />
            </Field>
            <Field label="Image Alt Text">
              <TextInput
                value={draft.alt}
                onChange={(event) => setDraft((current) => ({ ...current, alt: event.target.value }))}
              />
            </Field>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(pending)}
        onClose={() => setPending(null)}
        title="Delete category"
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
          Delete <span className="text-[#f2ece8]">{pending?.label}</span>? Products in this category will
          remain but lose their category grouping.
        </p>
      </Modal>
    </div>
  );
}
