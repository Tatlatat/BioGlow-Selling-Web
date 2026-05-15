"use client";

const STORAGE_KEY = "bgvn-wishlist-v1";
const EVENT_NAME = "bgvn-wishlist-changed";

export type WishlistEntry = {
  slug: string;
  /** ISO timestamp khi user save */
  savedAt: string;
};

function isStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const k = "__bgvn_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

function readRaw(): WishlistEntry[] {
  if (!isStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is WishlistEntry =>
        typeof e?.slug === "string" && typeof e?.savedAt === "string",
    );
  } catch {
    return [];
  }
}

function writeRaw(entries: WishlistEntry[]): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    /* quota / blocked — silently noop */
  }
}

export function getWishlist(): WishlistEntry[] {
  return readRaw().sort((a, b) => (a.savedAt < b.savedAt ? 1 : -1));
}

export function getWishlistSlugs(): string[] {
  return getWishlist().map((e) => e.slug);
}

export function isInWishlist(slug: string): boolean {
  return readRaw().some((e) => e.slug === slug);
}

export function addToWishlist(slug: string): void {
  const current = readRaw();
  if (current.some((e) => e.slug === slug)) return;
  writeRaw([...current, { slug, savedAt: new Date().toISOString() }]);
}

export function removeFromWishlist(slug: string): void {
  writeRaw(readRaw().filter((e) => e.slug !== slug));
}

export function toggleWishlist(slug: string): boolean {
  if (isInWishlist(slug)) {
    removeFromWishlist(slug);
    return false;
  }
  addToWishlist(slug);
  return true;
}

export function clearWishlist(): void {
  writeRaw([]);
}

/**
 * Subscribe vào thay đổi wishlist (cùng tab và cross-tab).
 * Trả về unsubscribe function.
 */
export function subscribeWishlist(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (): void => callback();
  // Cùng tab: custom event
  window.addEventListener(EVENT_NAME, handler);
  // Cross-tab: storage event (chỉ fire trên tab khác)
  const storageHandler = (e: StorageEvent): void => {
    if (e.key === STORAGE_KEY) handler();
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", storageHandler);
  };
}
