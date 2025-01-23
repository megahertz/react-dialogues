import {
  type ComponentProps,
  type ComponentType,
  type MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { dialogues } from '../core/dialogues';
import { useRdController } from '../core/controllerContext';
import type { RdController } from '../core/RdState';
import { Dialog, type DialogSlots, type DialogProps } from '../dialog/Dialog';
import { separateContentAndProps } from '../utils/helpers';
import { cls } from '../utils/string';
import type { Result } from '../utils/types';
import { Progress } from './Progress';

const defaults: ToastProps = {
  className: '',
  duration: 5000,
  keepOnFocusLoss: true,
  pauseOnHover: true,
  placement: 'bottomRight',
  role: 'alert',
  showProgress: true,
};

export function Toast({
  className = defaults.className,
  classNames = {},
  duration = defaults.duration,
  keepOnFocusLoss = defaults.keepOnFocusLoss,
  pauseOnHover = defaults.pauseOnHover,
  placement,
  role = defaults.role,
  showProgress = defaults.showProgress,
  ...props
}: ToastProps) {
  const item = useRdController();
  const timer = useCountdownTimer({
    duration,
    keepOnFocusLoss,
    onFinish: () => item?.destroy('timeout'),
  });
  const cssClass = cls('rd-toast', className);

  return (
    <Dialog
      lastChild={
        duration && showProgress ? (
          <Progress
            className={classNames?.progress}
            duration={duration}
            paused={timer.paused}
          />
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

Toast.defaults = defaults;

Toast.show = createShowFunction();
Toast.info = createShowFunction({ type: 'info' });
Toast.success = createShowFunction({ type: 'success' });
Toast.warning = createShowFunction({ type: 'warning' });
Toast.error = createShowFunction({ type: 'error' });

Toast.showCustom = <
  TResult extends Result = Result,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TComponent extends ComponentType<any> = ComponentType<any>,
  TProps extends ComponentProps<TComponent> = ComponentProps<TComponent>,
>(
  component: TComponent,
  props?: ComponentProps<TComponent>,
): RdController<TProps, TResult> => {
  return Toast.show<TResult, TProps>({
    component,
    ...props,
  });
};

Toast.getAll = () => {
  dialogues.internal.state.getControllersByType('toast');
};

Toast.destroyAll = (action = 'destroyAll', result?: unknown) => {
  for (const item of dialogues.internal.state.getControllersByType('toast')) {
    item.destroy(action, result);
  }
};

function createShowFunction(overrides: ToastProps = {}) {
  return <
    TResult extends Result = Result,
    TProps extends ToastProps = ToastProps,
  >(
    varContent: ToastProps | ReactNode,
    varProps: Partial<ToastProps> = {},
  ): RdController<TProps, TResult> => {
    const props = {
      placement: defaults.placement,
      ...overrides,
      ...separateContentAndProps(varContent, varProps),
    } as TProps;

    const element = dialogues.internal.state.add<TProps, TResult>({
      controllerType: 'toast',
      props: props as TProps,
      component: props.component || Toast,
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

export interface ToastProps extends DialogProps {
  classNames?: Partial<Record<ToastSlots, string>>;
  duration?: number;
  keepOnFocusLoss?: boolean;
  pauseOnHover?: boolean;
  placement?: ToastPlacement;
  showProgress?: boolean;
}

export type ToastSlots = DialogSlots | 'progress';

export type ToastPlacement =
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'topLeft'
  | 'topRight';
