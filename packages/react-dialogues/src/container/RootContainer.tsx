import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { RdController } from '../core/RdState';
import { UniversalContainer } from './UniversalContainer';
import { ToastContainer } from './ToastContainer';

export function RootContainer({
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
  const toastItems = controllers.filter((i) => i.controllerType === 'toast');
  const popoverItems = controllers.filter(
    (i) => i.controllerType === 'popover',
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
      <UniversalContainer controllers={modalItems} />
      <ToastContainer controllers={toastItems} />
      <UniversalContainer controllers={popoverItems} />
      <div ref={ref} />
    </>
  );
}

type OnPortalMount = (payload: PortalMountedPayload) => void;

export interface PortalMountedPayload {
  element: HTMLElement;
  setPortalControllers: Dispatch<SetStateAction<RdController[]>>;
}
