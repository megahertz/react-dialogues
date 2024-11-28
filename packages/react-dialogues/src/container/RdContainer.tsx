import { dialogues } from '../core/dialogues';
import { RootContainer } from './RootContainer';

export function RdContainer() {
  return (
    <RootContainer
      onMount={dialogues.internal.onPortalMounted}
      onUnmount={dialogues.internal.onPortalUnmounted}
    />
  );
}
