import { dialogues } from '../core/dialogues';
import { Portal } from './Portal';

export function RdPortal() {
  return (
    <Portal
      onMount={dialogues.internal.onPortalMounted}
      onUnmount={dialogues.internal.onPortalUnmounted}
    />
  );
}
