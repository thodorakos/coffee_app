import React, { useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { COFFEES } from '../data/coffee';
import { $favs, setTab, toggleFav } from '../stores/app';
import { Mug } from '../components/icons/Icons';
import { CoffeeCard } from '../components/react/CoffeeCard';

/**
 * SavedIsland — deferred hydration (`client:idle`).
 * Subscribes to shared $favs; empty state drives tab switches via the store.
 */
export default function SavedIsland() {
  const favs = useStore($favs);
  const list = COFFEES.filter((c) => favs.has(c.id));

  const handleToggleFav = useCallback((id: string) => {
    toggleFav(id);
  }, []);

  if (list.length === 0) {
    return (
      <div className="empty">
        <div className="empty-mug">
          <Mug className="" />
        </div>
        <h3>Nothing saved yet</h3>
        <p>Tap the heart on any coffee to keep it here.</p>
        <button type="button" className="btn-primary" onClick={() => setTab('quiz')}>
          Take the quiz
        </button>
        <button type="button" className="btn-link" onClick={() => setTab('discover')}>
          Browse picks
        </button>
      </div>
    );
  }

  return (
    <div className="cards">
      {list.map((c) => (
        <CoffeeCard key={c.id} coffee={c} isFav onToggleFav={handleToggleFav} />
      ))}
    </div>
  );
}
