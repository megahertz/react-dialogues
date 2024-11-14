import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { RdController } from '../core/RdState';
import { ModalContainer } from './ModalContainer';
import { NotificationContainer } from './NotificationContainer';

export function Portal({
  initControllers = [],
  onMount,
  onUnmount,
}: {
  initControllers?: RdController[];
  onMount: OnPortalMount;
  onUnmount: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [controllers, setPortalControllers] =
    useState<RdController[]>(initControllers);

  const modalItems = controllers.filter((i) => i.controllerType === 'modal');
  const notificationItems = controllers.filter(
    (i) => i.controllerType === 'notification',
  );

  useEffect(() => {
    onMount({
      element: ref.current?.parentNode as HTMLElement,
      setPortalControllers,
    });
    return () => onUnmount();
  }, [onMount, onUnmount, setPortalControllers]);

  return (
    <>
      <ModalContainer controllers={modalItems} />
      <NotificationContainer controllers={notificationItems} />
      <div ref={ref} />
    </>
  );
}

type OnPortalMount = (payload: PortalMountedPayload) => void;

export interface PortalMountedPayload {
  element: HTMLElement;
  setPortalControllers: Dispatch<SetStateAction<RdController[]>>;
}
