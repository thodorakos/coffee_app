import React, { memo, useCallback, useEffect, useState } from 'react';
import { CHEATS, SNOW } from '../data/coffee';
import { Icon } from '../components/icons/Icons';

const Accordion = memo(function Accordion({
  idx,
  title,
  icon,
  accent,
  body,
  open,
  onToggle,
}: {
  idx: number;
  title: string;
  icon: string;
  accent: string;
  body: string;
  open: boolean;
  onToggle: (idx: number) => void;
}) {
  return (
    <div className={`acc${open ? ' open' : ''}`} data-accent={accent}>
      <button
        type="button"
        className="acc-btn"
        aria-expanded={open}
        aria-controls={`acc-body-${idx}`}
        id={`acc-btn-${idx}`}
        onClick={() => onToggle(idx)}
      >
        <span className="acc-ic">
          <Icon name={icon} />
        </span>
        <span className="acc-t">{title}</span>
        <span className="acc-chev">
          <Icon name="chev" />
        </span>
      </button>
      <div className="acc-body" id={`acc-body-${idx}`} role="region" aria-labelledby={`acc-btn-${idx}`}>
        <div className="acc-inner">
          <div className="acc-content" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </div>
    </div>
  );
});

/**
 * LearnIsland — lowest priority, `client:idle`.
 * Fully SSR-rendered cheat sheet; hydration only adds accordion + translator interactivity.
 */
export default function LearnIsland() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  // Deterministic initial index so SSR HTML matches first client render.
  // Randomize after mount to avoid a hydration mismatch (React 19 warns).
  const [tIdx, setTIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setTIdx(Math.floor(Math.random() * SNOW.length));
  }, []);

  const toggleAcc = useCallback((idx: number) => {
    setOpenIdx((cur) => (cur === idx ? null : idx));
  }, []);

  const nextTranslation = useCallback(() => {
    setTIdx((cur) => {
      let next = Math.floor(Math.random() * SNOW.length);
      if (SNOW.length > 1) {
        while (next === cur) next = Math.floor(Math.random() * SNOW.length);
      }
      return next;
    });
    setAnimKey((k) => k + 1);
  }, []);

  const [from, to] = SNOW[tIdx] ?? SNOW[0];

  return (
    <div className="learn-wrap">
      <div>
        {CHEATS.map((c, i) => (
          <Accordion
            key={c.t}
            idx={i}
            title={c.t}
            icon={c.icon}
            accent={c.accent}
            body={c.body}
            open={openIdx === i}
            onToggle={toggleAcc}
          />
        ))}
      </div>

      <div className="translator">
        <div className="t-head">
          <div>
            <h3>Coffee terms, translated</h3>
            <p>What menus really mean.</p>
          </div>
        </div>
        <div className="t-body anim" key={animKey}>
          <div className="t-card t-from">{from}</div>
          <div className="t-arrow">
            <Icon name="arrowD" />
          </div>
          <div className="t-card t-to">{to}</div>
        </div>
        <button type="button" className="t-btn" onClick={nextTranslation}>
          <Icon name="dice" /> Show another
        </button>
      </div>
    </div>
  );
}
