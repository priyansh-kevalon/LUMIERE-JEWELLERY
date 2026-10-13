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
      return raw != null ? JSON.parse(raw) : initialValue;
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
