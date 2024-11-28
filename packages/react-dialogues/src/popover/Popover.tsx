import {
  cloneElement,
  type FocusEventHandler,
  type HTMLAttributes,
  isValidElement,
  type MouseEventHandler,
  type MutableRefObject,
  type ReactNode,
  type UIEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRdController } from '../core/controllerContext';
import { dialogues } from '../core/dialogues';
import type { RdController } from '../core/RdState';
import type { DialogProps } from '../dialog/Dialog';
import { useClickOutside, useKey } from '../utils/hooks';
import { cls } from '../utils/string';
import type { AnyComponentType } from '../utils/types';
import defaultPositionFn from './defaultPositionFn';
import { getScrollableParents } from './getScrollableParents';

const defaults = {
  className: '',
  classNames: {},
  offset: 5,
  placement: 'top',
  triggers: ['click', 'focus'],
  closeTriggers: ['blur', 'clickOutside', 'keyEscape'],
  positionFn: defaultPositionFn,
} satisfies Partial<PopoverProps>;

export function Float({
  className,
  classNames,
  closeTriggers,
  color,
  content,
  offset,
  positionFn = defaultPositionFn,
  placement = defaults.placement,
  style = {},
  target,
  triggers,
  ...props
}: FloatProps) {
  const controller = useRdController();
  const ref = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const side = placement.split('-')[0];

  useEffect(() => {
    if (ref.current) {
      positionFn({
        arrowEl: arrowRef.current || undefined,
        getScrollableParents,
        floatEl: ref.current,
        offset,
        placement,
        targetEl: target,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKey((key) => closeTriggers.includes(key) && controller.destroy(key), [
    'keyEscape',
  ] as const);

  useClickOutside(
    () =>
      closeTriggers.includes('clickOutside') &&
      controller.destroy('clickOutside'),
    ref,
  );

  if (color) {
    Object.assign(style, { '--rd-float-bg': color });
  }

  return (
    <div
      style={style}
      className={cls('rd-float', className)}
      ref={ref}
      {...props}
    >
      <div
        className={cls('rd-float-content', classNames?.content)}
        role="tooltip"
      >
        {content}
      </div>
      <div
        className={cls(
          'rd-float-arrow',
          `rd-float-arrow-${side}`,
          classNames?.arrow,
        )}
        ref={arrowRef}
      />
    </div>
  );
}

export function Popover({
  children,
  className = defaults.className,
  classNames = defaults.classNames,
  ...props
}: PopoverProps) {
  const { open, ...handlers } = usePopover({
    ...props,
    className: cls('rd-popover', className),
    classNames,
  });

  const wrapped = isValidElement(children) ? (
    children
  ) : (
    <span className={cls('rd-popover-wrap', classNames?.wrap)}>{children}</span>
  );

  return cloneElement(wrapped, {
    ...handlers,
    ...wrapped.props,
  });
}

Popover.defaults = defaults;

export function usePopover(props: Partial<PopoverProps>): PopoverResult {
  const { closeTriggers, component, triggers } = props;

  const ref = useRef<HTMLElement | undefined>();
  const [controller, setController] = useState<RdController | undefined>();

  function showPopover(e: UIEvent, trigger: Trigger) {
    if (
      (controller && !controller.destroyed) ||
      !e.target ||
      !triggers?.includes(trigger)
    ) {
      return;
    }

    if (!ref.current) {
      ref.current = e.target as HTMLElement;
    }

    setController(
      dialogues.internal.state.add({
        actionMode: 'simplified',
        component: component || Float,
        props: {
          ...defaults,
          ...props,
          target: ref.current,
        } as unknown as DialogProps,
        controllerType: 'popover',
      }),
    );

    dialogues.internal.ensurePortalRendered();
  }

  function hidePopover(trigger: CloseTrigger) {
    if (!controller || !closeTriggers?.includes(trigger)) {
      return;
    }

    controller.destroy(trigger);
    setController(undefined);
  }

  return {
    onBlur() {
      hidePopover('blur');
    },
    onClick(e) {
      showPopover(e, 'click');
    },
    onFocus(e) {
      showPopover(e as unknown as UIEvent, 'focus');
    },
    onMouseEnter(e) {
      showPopover(e, 'hover');
    },
    onMouseLeave() {
      hidePopover('leave');
    },
    open: Boolean(controller),
    ref,
  };
}

export interface PopoverProps extends Partial<FloatProps> {
  children: ReactNode;
  component?: AnyComponentType;
}

export interface FloatProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  className?: string;
  classNames?: Partial<Record<PopoverSlot, string>>;
  closeTriggers: CloseTrigger[];
  color: string;
  content: ReactNode;
  offset: number;
  positionFn(input: PositionOptions): void;
  placement: Placement;
  target: HTMLElement;
  triggers?: Trigger[];
}

export interface PositionOptions {
  arrowEl?: HTMLElement;
  floatEl: HTMLElement;
  getScrollableParents(targetEl: HTMLElement): Array<Element | Document>;
  offset: number;
  placement: Placement;
  targetEl: HTMLElement;
}

export type PopoverSlot = 'arrow' | 'content' | 'wrap';

export type Trigger = 'click' | 'hover' | 'focus' | 'contextMenu';
export type CloseTrigger = 'blur' | 'clickOutside' | 'keyEscape' | 'leave';

export interface PopoverResult {
  onBlur?: FocusEventHandler<HTMLElement>;
  onClick?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  open: boolean;
  ref: MutableRefObject<HTMLElement | undefined>;
}

export type Placement =
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'top'
  | 'top-start'
  | 'top-end';
