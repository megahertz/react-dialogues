import { ReactNode } from 'react';
import { NotificationType } from '../utils/types';

function createCircleIcon({
  type,
  children,
}: {
  type: NotificationType;
  children: ReactNode;
}) {
  return CircleIcon;

  function CircleIcon() {
    return <div className={`rd-ci ${type}`}>{children}</div>;
  }
}

export const SuccessIcon = createCircleIcon({ type: 'success', children: '✓' });
export const InfoIcon = createCircleIcon({ type: 'info', children: 'i' });
export const WarnIcon = createCircleIcon({ type: 'warn', children: '!' });
export const ErrorIcon = createCircleIcon({ type: 'error', children: '✗' });
