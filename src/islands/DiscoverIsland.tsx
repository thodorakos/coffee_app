import React, { useCallback, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { CRAVINGS, COFFEES, CRAVING_LABEL } from '../data/coffee';
import { $favs, $filter, setFilter, surpriseFilter, toggleFav, showToast, setTab } from '../stores/app';
import { Icon } from '../components/icons/Icons';
import { CoffeeCard } from '../components/react/CoffeeCard';

/**
 * DiscoverIsland — above-the-fold, high priority → `client:load`.
 * Owns filter chips + quiz entry + picks grid.
 */
export default function DiscoverIsland({ highlightId }: { highlightId?: string | null } = {}) {
  const filter = useStore($filter);
  const favs = useStore($favs);

  const scrollToPicks = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => {
      document.getElementById('picksStart')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  };

  const tap = (pattern: number | number[] = 8) => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        navigator.vibrate(pattern);
      }
    } catch {
      // no-op
    }
  };

  const tastes = useMemo(() => CRAVINGS.filter((c) => c.key !== 'surprise'), []);

  const visible = useMemo(
    () => (filter ? COFFEES.filter((c) => c.craving === filter) : COFFEES),
    [filter],
  );

  // Plain handler (not useCallback): each craving button binds via an inline
  // arrow anyway, so memoizing here adds cost without preventing re-renders.
  // The stable fav-toggle below is the one that keeps memoized cards cheap.
  const handleCrave = (key: string) => {
    if (key === 'surprise') {
      const next = surpriseFilter();
      tap(12);
      showToast(`Fate says: “${CRAVING_LABEL[next] ?? next}”`);
      scrollToPicks();
      return;
    }
    if (filter === key) {
      setFilter(null);
    } else {
      tap(8);
      setFilter(key);
      scrollToPicks();
    }
  };

  const handleToggleFav = useCallback((id: string) => {
    const on = toggleFav(id);
    // Saved = meaningful moment, so it earns a slightly firmer tap.
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        navigator.vibrate(on ? [10, 30, 12] : 8);
      }
    } catch {
      // no-op
    }
  }, []);

  return (
    <>
      <div className="s-head">
        <h2>Browse by taste</h2>
      </div>

      <div className="chip-row" role="group" aria-label="Filter by craving">
        {tastes.map((c) => {
          const active = filter === c.key;
          return (
            <button
              key={c.key}
              type="button"
              className={`chip-btn${active ? ' active' : ''}`}
              data-craving={c.key}
              aria-pressed={active}
              onClick={() => handleCrave(c.key)}
            >
              <span className="chip-dot" aria-hidden="true" />
              {c.label}
            </button>
          );
        })}
        <button type="button" className="chip-link" onClick={() => handleCrave('surprise')}>
          Surprise me
        </button>
      </div>

      <div className={`filter-note${filter ? ' on' : ''}`}>
        <span>{filter ? `Showing “${CRAVING_LABEL[filter] ?? filter}”` : ''}</span>
        <button type="button" className="f-clear" onClick={() => setFilter(null)}>
          <Icon name="close" /> Clear
        </button>
      </div>

      <div className="quiz-entry">
        <div className="quiz-entry-txt">
          <strong>Not sure where to start?</strong>
          <span>5 questions, one honest pick.</span>
        </div>
        <button type="button" className="btn-primary btn-sm" onClick={() => setTab('quiz')}>
          Take the quiz
        </button>
      </div>

      <div className="s-head" id="picksStart">
        <h2>Single origins</h2>
        <p>{filter ? `${visible.length} to explore.` : 'Ten places to start.'}</p>
      </div>
      <div className="cards" id="cards">
        {visible.map((c) => (
          <CoffeeCard
            key={c.id}
            coffee={c}
            isFav={favs.has(c.id)}
            onToggleFav={handleToggleFav}
            highlightId={highlightId}
          />
        ))}
      </div>
    </>
  );
}
