import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import usePersistentState from '../hooks/usePersistentState';
import { getProductById } from '../data/products';

/**
 * Global shopping bag + wishlist state, shared by every page so an item added
 * on a product page or in the collection grid is instantly visible in the
 * header drawer. Persisted to `localStorage` through `usePersistentState`, so
 * the bag and wishlist survive navigation and reloads.
 */
const CartContext = createContext(null);

const sameLine = (a, b) =>
  a.id === b.id && (a.size ?? null) === (b.size ?? null) && (a.metal ?? null) === (b.metal ?? null);

/** Fold a bag line into a list, merging quantities of the exact same variant. */
export function mergeBagLines(current, line) {
  const existing = current.find((entry) => sameLine(entry, line));
  if (existing) {
    return current.map((entry) =>
      sameLine(entry, line) ? { ...entry, qty: entry.qty + line.qty } : entry,
    );
  }
  return [...current, line];
}

export function CartProvider({ children }) {
  const [bag, setBag] = usePersistentState('lumiere-bag', []);
  const [wishlist, setWishlist] = usePersistentState('lumiere-wishlist', []);
  const [drawer, setDrawer] = useState(null);

  const addToBag = useCallback(
    (product, options = {}) => {
      const line = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image ?? product.gallery?.[0] ?? null,
        qty: options.qty ?? 1,
        size: options.size ?? null,
        metal: options.metal ?? null,
      };
      setBag((current) => mergeBagLines(current, line));
      return line;
    },
    [setBag],
  );

  const removeFromBag = useCallback(
    (target) => setBag((current) => current.filter((entry) => !sameLine(entry, target))),
    [setBag],
  );

  const setBagQty = useCallback(
    (target, qty) =>
      setBag((current) =>
        current
          .map((entry) => (sameLine(entry, target) ? { ...entry, qty: Math.max(0, qty) } : entry))
          .filter((entry) => entry.qty > 0),
      ),
    [setBag],
  );

  const clearBag = useCallback(() => setBag([]), [setBag]);

  const isWishlisted = useCallback((id) => wishlist.includes(id), [wishlist]);

  const toggleWishlist = useCallback(
    (product) =>
      setWishlist((current) =>
        current.includes(product.id)
          ? current.filter((id) => id !== product.id)
          : [...current, product.id],
      ),
    [setWishlist],
  );

  const removeFromWishlist = useCallback(
    (id) => setWishlist((current) => current.filter((entry) => entry !== id)),
    [setWishlist],
  );

  const openDrawer = useCallback((tab = 'bag') => setDrawer(tab), []);
  const closeDrawer = useCallback(() => setDrawer(null), []);

  const value = useMemo(() => {
    const bagCount = bag.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = bag.reduce((sum, line) => sum + line.price * line.qty, 0);
    const wishlistProducts = wishlist.map((id) => getProductById(id)).filter(Boolean);

    return {
      bag,
      wishlist,
      wishlistProducts,
      bagCount,
      wishlistCount: wishlist.length,
      subtotal,
      addToBag,
      removeFromBag,
      setBagQty,
      clearBag,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      drawer,
      openDrawer,
      closeDrawer,
      setDrawerTab: openDrawer,
    };
  }, [
    bag,
    wishlist,
    addToBag,
    removeFromBag,
    setBagQty,
    clearBag,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
    drawer,
    openDrawer,
    closeDrawer,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
