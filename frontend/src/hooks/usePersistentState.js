import { useEffect, useState } from 'react';

/**
 * State that mirrors itself into `localStorage`, so the wishlist and bag
 * survive navigation and reloads. Falls back to in-memory state whenever
 * storage is unavailable (private mode, blocked cookies, SSR).
 */
export default function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return initialValue;
      const parsed = JSON.parse(raw);
      /* Guard against stale or corrupt values written by a previous version.
         If the seed is an array, only accept an array — otherwise the cart
         and wishlist reducers would throw and crash the whole app. */
      if (Array.isArray(initialValue) && !Array.isArray(parsed)) return initialValue;
      return parsed;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  }, [key, value]);

  return [value, setValue];
}
