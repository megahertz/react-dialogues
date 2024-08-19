import { useEffect, useState } from 'react';
import { amodal } from '../core/amodal';
import ModalContainer from './ModalContainer';

export default function Portal() {
  const [amodalState, setAmodalState] = useState(amodal.internal.state);

  useEffect(() => {
    amodal.internal.onPortalMounted({ setPortalState: setAmodalState });
    return () => amodal.internal.onPortalUnmounted();
  }, []);

  return <ModalContainer items={amodalState.getItemsByType('modal')} />;
}

// amodule.renderPortal();
// amodule.config initialize
// amodule.config.getContainer
// amodule.internal.elements = []
// Render ModalContainer (empty)
// Render NotificationContainer(empty)
// Modal.show should be exported
// Modal.show should add elements to amodule.internal.elements collection
// When Portal is renderered, it should set amodule.internal.setPortalState

// Modals
// Each modal should have context which points to Element instance
