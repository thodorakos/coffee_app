import React, { useCallback, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $activeTab, $favs, scrollPos, setTab, type Tab } from '../stores/app';
import { Icon } from '../components/icons/Icons';

const DOCK: { tab: Tab; lb: string; ic: string }[] = [
  { tab: 'quiz', lb: 'Quiz', ic: 'list' },
  { tab: 'discover', lb: 'Discover', ic: 'compass' },
  { tab: 'learn', lb: 'Learn', ic: 'book' },
  { tab: 'saved', lb: 'Saved', ic: 'bookmark' },
];

function applyTabToDom(tab: Tab) {
  document.querySelectorAll('.screen').forEach((s) => {
    s.classList.toggle('active', s.id === `scr-${tab}`);
  });
}

function tapFeedback(light = false) {
  try {
    // Utility-only haptics: tab commits get a light tap, same frame as the visual switch.
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      navigator.vibrate(light ? 8 : 12);
    }
  } catch {
    // haptics unavailable — visual feedback still carries it
  }
}

function smoothScrollTop(el: HTMLElement) {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}

/**
 * DockIsland — persistent chrome, `client:load`.
 * Owns tab switching + per-tab scroll restoration.
 * Sections themselves stay static Astro markup; we only flip `.active`.
 */
export default function DockIsland() {
  const active = useStore($activeTab);
  const favs = useStore($favs);

  // Keep static Astro sections in sync when another island (quiz/saved CTAs) changes the tab.
  useEffect(() => {
    applyTabToDom(active);
  }, [active]);

  const switchTab = useCallback(
    (tab: Tab) => {
      const scroller = document.getElementById('scroller');
      if (!scroller) {
        tapFeedback();
        setTab(tab);
        return;
      }
      if (tab === active) {
        smoothScrollTop(scroller);
        return;
      }
      // Causality: haptic fires on the same frame as the visual tab commit.
      tapFeedback(true);
      scrollPos[active] = scroller.scrollTop;
      setTab(tab);
      requestAnimationFrame(() => {
        scroller.scrollTop = scrollPos[tab] ?? 0;
      });
    },
    [active],
  );

  return (
    <nav className="dock" role="tablist" aria-label="Main navigation">
      {DOCK.map((d) => {
        const on = active === d.tab;
        return (
          <button
            key={d.tab}
            type="button"
            id={`tab-${d.tab}`}
            className={`dock-btn${on ? ' active' : ''}`}
            role="tab"
            aria-selected={on}
            aria-controls={`scr-${d.tab}`}
            onClick={() => switchTab(d.tab)}
          >
            <span className="d-ic">
              <Icon name={d.ic} />
              {d.tab === 'saved' && favs.size > 0 && <span className="d-count">{favs.size}</span>}
            </span>
            <span className="lb">{d.lb}</span>
          </button>
        );
      })}
    </nav>
  );
}
