import { atom } from 'nanostores';

export type Tab = 'discover' | 'quiz' | 'saved' | 'learn';
export type FilterKey = string | null;

const FAV_KEY = 'fyc-faves';

function loadFavs(): Set<string> {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(FAV_KEY) ?? '[]';
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export const $activeTab = atom<Tab>('quiz');
export const $filter = atom<FilterKey>(null);
export const $favs = atom<Set<string>>(loadFavs());
export const $toast = atom<string>('');
export const $quizStarted = atom<boolean>(false);
// scroll positions per tab, kept in-memory only (no SSR concerns)
export const scrollPos: Record<Tab, number> = { discover: 0, quiz: 0, saved: 0, learn: 0 };

let toastTimer: ReturnType<typeof setTimeout> | undefined;

export function showToast(msg: string) {
  $toast.set(msg);
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $toast.set(''), 2100);
}

export function setTab(tab: Tab) {
  $activeTab.set(tab);
}

export function setFilter(key: FilterKey) {
  $filter.set(key);
}

export function clearFilter() {
  $filter.set(null);
}

export function surpriseFilter() {
  const pool = ['dessert', 'juicy', 'nutty', 'floral'].filter((k) => k !== $filter.get());
  const next = pool[Math.floor(Math.random() * pool.length)];
  $filter.set(next);
  return next;
}

export function toggleFav(id: string): boolean {
  const next = new Set($favs.get());
  const on = !next.has(id);
  if (on) next.add(id);
  else next.delete(id);
  $favs.set(next);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(FAV_KEY, JSON.stringify([...next]));
    }
  } catch {
    // private mode — ignore
  }
  showToast(on ? 'Saved to your faves ♥' : 'Removed from your faves');
  return on;
}

export function markQuizStarted() {
  $quizStarted.set(true);
}
