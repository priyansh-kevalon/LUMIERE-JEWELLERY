import { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, Star } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  EmptyState,
  IconButton,
  Modal,
  PageHeader,
  Select,
  TextInput,
  TableWrap,
  Td,
  Th,
} from '../ui';
import { useToast } from '../toast';
import { deleteProduct, formatINR, useCategories, useProducts } from '../../data/products';

export default function AdminProducts() {
  const products = useProducts();
  const categories = useCategories();
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ALL');
  const [pending, setPending] = useState(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products
      .filter((product) => category === 'ALL' || product.category === category)
      .filter(
        (product) =>
          !term ||
          product.name.toLowerCase().includes(term) ||
          product.type.toLowerCase().includes(term),
      )
      .sort((a, b) => b.id - a.id);
  }, [products, query, category]);

  const confirmDelete = () => {
    if (!pending) return;
    deleteProduct(pending.id);
    toast(`${pending.name} deleted`);
    setPending(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        subtitle={`${products.length} pieces in the catalogue`}
        actions={
          <Button onClick={() => { window.location.hash = '#/admin/products/new'; }}>
            <Plus size={15} strokeWidth={2} />
            Add Product
          </Button>
        }
      />

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f6a64]" />
            <TextInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or type…"
              className="pl-10"
            />
          </div>
          <Select value={category} onChange={(event) => setCategory(event.target.value)} className="sm:w-52">
            <option value="ALL">All Categories</option>
            {categories.map((entry) => (
              <option key={entry.key} value={entry.key}>
                {entry.label}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Search size={20} />}
          title="No products found"
          copy="Try a different search term or category filter."
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Product</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="transition-colors hover:bg-white/[0.03]">
                <Td>
                  <div className="flex items-center gap-3">
                    <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#1c1a18]">
                      {product.image ? (
                        <img src={product.image} alt="" className="h-full w-full object-cover" />
                      ) : null}
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 truncate text-[13px] text-[#f2ece8]">
                        {product.name}
                        {product.featured ? (
                          <Star size={11} className="shrink-0 fill-[#C6A16A] text-[#C6A16A]" />
                        ) : null}
                      </p>
                      <p className="text-[10.5px] uppercase tracking-[0.12em] text-[#6f6a64]">
                        {product.metal} · {product.type}
                      </p>
                    </div>
                  </div>
                </Td>
                <Td>{product.category}</Td>
                <Td className="tabular-nums">
                  {formatINR(product.price)}
                  {product.compareAt ? (
                    <span className="mt-0.5 block text-[10.5px] text-[#6f6a64] line-through">
                      {formatINR(product.compareAt)}
                    </span>
                  ) : null}
                </Td>
                <Td className="tabular-nums">
                  <span className={product.stock <= 5 ? 'text-[#e0a08f]' : ''}>{product.stock ?? 0}</span>
                </Td>
                <Td>
                  <Badge tone={product.active === false ? 'inactive' : 'active'}>
                    {product.active === false ? 'Inactive' : 'Active'}
                  </Badge>
                </Td>
                <Td>
                  <div className="flex items-center justify-end gap-2">
                    <IconButton
                      label="Edit"
                      onClick={() => { window.location.hash = `#/admin/products/${product.id}`; }}
                    >
                      <Pencil size={14} strokeWidth={1.6} />
                    </IconButton>
                    <IconButton
                      label="Delete"
                      className="hover:border-[#e07a7a]/50 hover:text-[#e0a08f]"
                      onClick={() => setPending(product)}
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
        open={Boolean(pending)}
        onClose={() => setPending(null)}
        title="Delete product"
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
          Are you sure you want to delete <span className="text-[#f2ece8]">{pending?.name}</span>? This
          removes it from the storefront catalogue.
        </p>
      </Modal>
    </div>
  );
}
