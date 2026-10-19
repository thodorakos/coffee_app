import React from 'react';
import { useStore } from '@nanostores/react';
import { $toast } from '../stores/app';

/** ToastIsland — tiny, `client:load` so save-feedback is never missed. */
export default function ToastIsland() {
  const msg = useStore($toast);
  return (
    <div className={`toast${msg ? ' show' : ''}`} role="status" aria-live="polite">
      {msg}
    </div>
  );
}
