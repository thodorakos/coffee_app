import React, { memo, useState } from 'react';
import type { Coffee } from '../../data/coffee';
import { Badge, Icon } from '../icons/Icons';
import { Meter } from './Meter';

interface CoffeeCardProps {
  coffee: Coffee;
  isFav: boolean;
  onToggleFav: (id: string) => void;
  highlightId?: string | null;
}

export const CoffeeCard = memo(function CoffeeCard({
  coffee,
  isFav,
  onToggleFav,
}: CoffeeCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`card${open ? ' open' : ''}`}
      data-id={coffee.id}
      data-craving={coffee.craving}
    >
      <button
        type="button"
        className={`c-heart${isFav ? ' on' : ''}`}
        aria-pressed={isFav}
        aria-label={`Save ${coffee.name}`}
        onClick={() => onToggleFav(coffee.id)}
      >
        <Icon name="heart" />
      </button>

      <div className="c-top">
        <Badge name={coffee.badge} />
        <div className="c-head">
          <h3>{coffee.name}</h3>
          <p className="c-sub">{coffee.words}</p>
        </div>
      </div>

      <div className="c-meters">
        <Meter label="Sweetness" value={coffee.scores.sweet} />
        <Meter label="Juiciness" value={coffee.scores.juice} />
        <Meter label="Richness" value={coffee.scores.rich} />
      </div>

      <p className="c-brew">{coffee.brew}</p>

      <button
        type="button"
        className="c-guide"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="g-label">{open ? 'Hide brew steps' : 'Brew steps'}</span>
        <span className="g-chev">
          <Icon name="chev" />
        </span>
      </button>
      <div className="c-steps">
        <div className="c-steps-in">
          <ol>
            {coffee.steps.map((s, j) => (
              <li key={j}>
                <span className="n">{j + 1}</span>
                <p>{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
});
