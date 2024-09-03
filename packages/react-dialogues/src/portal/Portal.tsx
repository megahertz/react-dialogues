import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { RdItem } from '../core/RdState';
import { ModalContainer } from './ModalContainer';
import { NotificationContainer } from './NotificationContainer';

export function Portal({
  initItems = [],
  onMount,
  onUnmount,
}: {
  initItems?: RdItem[];
  onMount: OnPortalMount;
  onUnmount: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setPortalItems] = useState<RdItem[]>(initItems);

  const modalItems = items.filter((i) => i.type === 'modal');
  const notificationItems = items.filter((i) => i.type === 'notification');

  useEffect(() => {
    onMount({
      element: ref.current?.parentNode as HTMLElement,
      setPortalItems,
    });
    return () => onUnmount();
  }, [onMount, onUnmount, setPortalItems]);

  return (
    <>
      <ModalContainer items={modalItems} />
      <NotificationContainer items={notificationItems} />
      <div ref={ref} />
    </>
  );
}

type OnPortalMount = (payload: PortalMountedPayload) => void;

export interface PortalMountedPayload {
  element: HTMLElement;
  setPortalItems: Dispatch<SetStateAction<RdItem[]>>;
}
