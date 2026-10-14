import { useSyncExternalStore } from 'react';

/**
 * Minimal persistent store.
 *
 * A tiny external store backed by `localStorage`, shared between the
 * storefront and the admin panel so catalogue edits made in `#/admin` are
 * reflected on the public site. Components subscribe through `useStore`,
 * which relies on `useSyncExternalStore` so reads stay tear-free.
 */
export function createStore(key, seedFactory) {
  const seed = () => {
    const value = typeof seedFactory === 'function' ? seedFactory() : seedFactory;
    return JSON.parse(JSON.stringify(value));
  };

  const load = () => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) return JSON.parse(raw);
    } catch {
      /* storage unavailable — fall through to seed */
    }
    return seed();
  };

  let state = load();
  const listeners = new Set();

  const emit = () => listeners.forEach((listener) => listener());

  const persist = () => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* storage unavailable — keep the in-memory state */
    }
  };

  return {
    key,
    get: () => state,
    set: (updater) => {
      state = typeof updater === 'function' ? updater(state) : updater;
      persist();
      emit();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    reset: () => {
      state = seed();
      persist();
      emit();
    },
  };
}

/** Subscribe a component to a store's current value. */
export function useStore(store) {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

/** Read a value authored by another module (e.g. the account store). */
export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw != null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
