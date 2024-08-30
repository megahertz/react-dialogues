import { type MouseEvent, useEffect, useState } from 'react';
import { dialogues } from '../core/dialogues';
import { useUiItem } from '../core/itemContext';
import type { RdItem } from '../core/RdState';
import { Dialog, type DialogProps } from '../dialog/Dialog';
import { cls } from '../utils/string';
import { Progress } from './Progress';
import './styles.css';

const defaults: NotificationProps = {
  className: '',
  duration: 5000,
  keepOnFocusLoss: true,
  pauseOnHover: true,
  placement: 'bottomRight',
  role: 'alert',
  showProgress: true,
};

export function Notification({
  className = defaults.className,
  duration = defaults.duration,
  keepOnFocusLoss = defaults.keepOnFocusLoss,
  pauseOnHover = defaults.pauseOnHover,
  placement,
  role = defaults.role,
  showProgress = defaults.showProgress,
  ...props
}: NotificationProps) {
  const item = useUiItem();
  const timer = useCountdownTimer({
    duration,
    keepOnFocusLoss,
    onFinish: () => item?.destroy('timeout'),
  });
  const cssClass = cls('rd-notification', className);

  return (
    <Dialog
      lastChild={
        duration && showProgress ? (
          <Progress duration={duration} paused={timer.paused} />
        ) : null
      }
      className={cssClass}
      onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
        props.onMouseEnter?.(e);
        if (pauseOnHover) {
          timer.pause();
        }
      }}
      onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
        props.onMouseLeave?.(e);
        if (pauseOnHover) {
          timer.continue();
        }
      }}
      role={role}
      {...props}
    />
  );
}

Notification.defaults = defaults;

Notification.show = createShowFunction();
Notification.info = createShowFunction({ type: 'info' });
Notification.success = createShowFunction({ type: 'success' });
Notification.warning = createShowFunction({ type: 'warning' });
Notification.error = createShowFunction({ type: 'error' });

Notification.destroyAll = (result?: unknown) => {
  for (const item of dialogues.internal.state.getItemsByType('notification')) {
    item.destroy(result);
  }
};

function createShowFunction(overrides: NotificationProps = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TResult = any,>(
    props: NotificationProps,
  ): RdItem<NotificationProps, TResult> => {
    const element = dialogues.internal.state.add<NotificationProps, TResult>({
      type: 'notification',
      props: { placement: defaults.placement, ...overrides, ...props },
      component: props.component || Notification,
    });

    dialogues.internal.ensurePortalRendered();

    return element;
  };
}

function useCountdownTimer({
  duration,
  keepOnFocusLoss = true,
  onFinish,
}: {
  duration?: number;
  keepOnFocusLoss?: boolean;
  onFinish: () => void;
}) {
  const tick = 200;
  const [timeLeft, setTimeLeft] = useState(duration || 0);
  const [paused, setPaused] = useState(false);

  useEffect(() => setTimeLeft(duration || 0), [duration]);

  useEffect(() => {
    if (
      paused ||
      !duration ||
      (keepOnFocusLoss && typeof document === 'object' && document.hidden)
    ) {
      return undefined;
    }

    if (timeLeft <= 0) {
      onFinish();
      return undefined;
    }

    const intervalId = setInterval(() => setTimeLeft((p) => p - tick), tick);
    return () => clearInterval(intervalId);
  }, [duration, keepOnFocusLoss, onFinish, paused, timeLeft]);

  return {
    paused,
    continue() {
      setPaused(false);
    },
    pause() {
      setPaused(true);
    },
  };
}

export interface NotificationProps extends DialogProps {
  duration?: number;
  keepOnFocusLoss?: boolean;
  pauseOnHover?: boolean;
  placement?: NotificationPlacement;
  showProgress?: boolean;
}

export type NotificationPlacement =
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'topLeft'
  | 'topRight';
