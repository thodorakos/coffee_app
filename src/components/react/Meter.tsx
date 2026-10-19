import React, { memo } from 'react';

interface MeterProps {
  label: string;
  value: number;
}

export const Meter = memo(function Meter({ label, value }: MeterProps) {
  return (
    <div className="meter">
      <span className="m-label">{label}</span>
      <span className="m-pills" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < value ? 'p on' : 'p'} />
        ))}
      </span>
      <span className="m-val">{value}/5</span>
    </div>
  );
});
