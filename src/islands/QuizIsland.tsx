import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { QUIZ, COFFEES, ORIGIN_WHY, ORIGIN_HEADSUP, type QuizOption } from '../data/coffee';
import { $favs, setFilter, setTab, toggleFav } from '../stores/app';
import { Badge, Icon } from '../components/icons/Icons';
import { Meter } from '../components/react/Meter';

const QuizOptionButton = memo(function QuizOptionButton({
  option,
  selected,
  dimmed,
  onSelect,
}: {
  option: QuizOption;
  selected: boolean;
  dimmed: boolean;
  onSelect: (opt: QuizOption) => void;
}) {
  return (
    <button
      type="button"
      className={`q-opt${selected ? ' sel' : ''}`}
      data-pick={option.pick}
      onClick={() => onSelect(option)}
      aria-pressed={selected}
      tabIndex={dimmed ? -1 : 0}
    >
      <span className="q-ic">
        <Icon name={option.icon} />
      </span>
      <span className="q-txt">
        <strong>{option.label}</strong>
        <em>{option.cap}</em>
      </span>
      <span className="q-radio">
        <Icon name="check" />
      </span>
    </button>
  );
});

/**
 * QuizIsland — deferred hydration (`client:idle`).
 * Hidden tabs never intersect, so `client:visible` would never fire here.
 *
 * Scoring is weighted per origin: every answer spreads points across the
 * coffees it truly matches, so the winner is the closest real fit —
 * never a 1:1 horoscope mapping.
 */
export default function QuizIsland() {
  const favs = useStore($favs);
  const [qi, setQi] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const advanceTimer = useRef<number | undefined>(undefined);

  const tap = (pattern: number | number[] = 8) => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        navigator.vibrate(pattern);
      }
    } catch {
      // haptics unavailable
    }
  };

  // Clear the delayed advance if the island unmounts mid-transition.
  useEffect(() => {
    return () => {
      if (advanceTimer.current !== undefined) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  const step = QUIZ[qi];

  const result = useMemo(() => {
    if (!done) return null;
    let best = COFFEES[0];
    let bestScore = -1;
    let second = COFFEES[0];
    let secondScore = -1;
    for (const c of COFFEES) {
      const s = scores[c.id] ?? 0;
      if (s > bestScore) {
        second = best;
        secondScore = bestScore;
        best = c;
        bestScore = s;
      } else if (s > secondScore) {
        second = c;
        secondScore = s;
      }
    }
    void secondScore;
    // 5 questions × max 2 pts = 10 possible. Scale to the familiar 72–98 band.
    const pct = Math.min(98, Math.round(72 + 26 * (bestScore / (QUIZ.length * 2))));
    return { coffee: best, runner: second.id === best.id ? null : second, pct };
  }, [done, scores]);

  const choose = useCallback(
    (opt: QuizOption) => {
      if (picked) return;
      setPicked(opt.label);
      // Commit feedback on the causal event — same frame as the selection flash.
      tap(10);
      if (advanceTimer.current !== undefined) window.clearTimeout(advanceTimer.current);
      // Functional update keeps `choose` stable across fav-driven re-renders,
      // so the memoized option buttons don't re-render needlessly.
      advanceTimer.current = window.setTimeout(() => {
        const pts = opt.scores;
        setScores((prev) => {
          const next = { ...prev };
          for (const [id, v] of Object.entries(pts)) next[id] = (next[id] ?? 0) + v;
          return next;
        });
        setPicked(null);
        if (qi + 1 < QUIZ.length) setQi((v) => v + 1);
        else setDone(true);
      }, 430);
    },
    [picked, qi],
  );

  const restart = useCallback(() => {
    if (advanceTimer.current !== undefined) window.clearTimeout(advanceTimer.current);
    setQi(0);
    setScores({});
    setPicked(null);
    setDone(false);
  }, []);

  const viewCoffee = useCallback(
    (id: string) => {
      setFilter(null);
      setTab('discover');
      // Let DockIsland flip the visible section first, then scroll + pulse.
      window.setTimeout(() => {
        const card = document.querySelector<HTMLElement>(`#cards .card[data-id="${id}"]`);
        if (!card) return;
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.remove('pulse');
        void card.offsetWidth;
        card.classList.add('pulse');
      }, 120);
    },
    [],
  );

  if (done && result) {
    const fav = favs.has(result.coffee.id);
    const why = ORIGIN_WHY[result.coffee.id] ?? '';
    const headsup = ORIGIN_HEADSUP[result.coffee.id] ?? '';
    return (
      <>
        <div className="q-prog" aria-hidden="true">
          {QUIZ.map((_, i) => (
            <span key={i} className="seg done" />
          ))}
        </div>
        <div id="quizBody">
          <div className="q-view">
            <div className="r-wrap" data-craving={result.coffee.craving}>
              <div className="r-badge">
                <Badge name={result.coffee.badge} />
              </div>
              <div>
                <span className="r-match">{result.pct}% match</span>
              </div>
              <h2 className="r-name">{result.coffee.name}</h2>
              <p className="r-why">
                {why}
                {result.runner ? ` Runner-up: ${result.runner.name}.` : ''}
              </p>
              <p className="r-words">
                {result.coffee.words} {headsup}
              </p>
              <div className="c-meters">
                <Meter label="Sweetness" value={result.coffee.scores.sweet} />
                <Meter label="Juiciness" value={result.coffee.scores.juice} />
                <Meter label="Richness" value={result.coffee.scores.rich} />
              </div>
              <div className="r-actions">
                <button type="button" className="btn-primary" onClick={() => viewCoffee(result.coffee.id)}>
                  View coffee
                </button>
                <button
                  type="button"
                  className={`c-heart big${fav ? ' on' : ''}`}
                  aria-pressed={fav}
                  aria-label={`Save ${result.coffee.name}`}
                  onClick={() => toggleFav(result.coffee.id)}
                >
                  <Icon name="heart" />
                </button>
              </div>
              <button type="button" className="q-restart" onClick={restart}>
                Retake quiz
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="q-prog" aria-hidden="true">
        {QUIZ.map((_, i) => (
          <span key={i} className={`seg${i < qi ? ' done' : i === qi ? ' now' : ''}`} />
        ))}
      </div>
      <div id="quizBody">
        <div className="q-view" key={qi}>
          <div className="q-count">
            Question {qi + 1} of {QUIZ.length}
          </div>
          <h2 className="q-title">{step.q}</h2>
          <p className="q-sub">{step.sub}</p>
          <div className={`q-opts${picked ? ' picked' : ''}`}>
            {step.options.map((o) => (
              <QuizOptionButton
                key={o.label}
                option={o}
                selected={picked === o.label}
                dimmed={!!picked && picked !== o.label}
                onSelect={choose}
              />
            ))}
          </div>
          {qi > 0 && (
            <button type="button" className="q-restart" onClick={restart}>
              start over
            </button>
          )}
        </div>
      </div>
    </>
  );
}
