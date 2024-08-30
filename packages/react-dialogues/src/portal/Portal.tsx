import { useEffect, useState } from 'react';
import { dialogues } from '../core/dialogues';
import { ModalContainer } from './ModalContainer';
import { NotificationContainer } from './NotificationContainer';

export default function Portal() {
  const [amodalState, setAmodalState] = useState(dialogues.internal.state);

  useEffect(() => {
    dialogues.internal.onPortalMounted({ setPortalState: setAmodalState });
    return () => dialogues.internal.onPortalUnmounted();
  }, []);

  return (
    <>
      <ModalContainer items={amodalState.getItemsByType('modal')} />
      <NotificationContainer
        items={amodalState.getItemsByType('notification') as any}
      />
    </>
  );
}
