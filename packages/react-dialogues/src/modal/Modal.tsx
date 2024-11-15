/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  type ComponentProps,
  type ComponentType,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { OkButton } from '../controls/OkButton';
import { TextField, type TextFieldSlots } from '../controls/TextField';
import { dialogues } from '../core/dialogues';
import { useRdController } from '../core/controllerContext';
import type { ActionMode, RdController } from '../core/RdState';
import { Dialog, type DialogSlots, type DialogProps } from '../dialog/Dialog';
import { createDivComponent } from '../utils/constructors';
import { cls } from '../utils/string';
import { Result } from '../utils/types';

const Mask = createDivComponent('mask');

const defaults: ModalProps = {
  actionMode: 'simplified',
  buttons: ['OK'],
  centered: false,
  className: '',
  closeOthers: false,
  mask: true,
  maskClosable: true,
  role: 'dialog',
  size: 'normal',
};

export function Modal({
  centered = defaults.centered,
  className = defaults.className,
  classNames = {},
  closeOthers,
  buttons = defaults.buttons,
  footer,
  mask = defaults.mask,
  maskClosable = defaults.maskClosable,
  role = defaults.role,
  size = defaults.size,
  ...props
}: ModalProps) {
  const item = useRdController();
  const focusRootRef = useFocusLock();
  useScrollLock();
  useKey((key) => item?.destroy(key));

  function onMaskClick(e: MouseEvent<HTMLDivElement>) {
    if (
      maskClosable &&
      (e.target as HTMLDivElement)?.classList.contains('rd-modal-wrapper')
    ) {
      item.destroy('mask');
    }
  }

  const cssClass = cls('rd-modal', size && `rd-${size}`, className);
  const wrapCssClass = cls(
    'rd-modal-wrapper',
    centered && 'rd-centered',
    classNames?.wrap,
  );
  return (
    <>
      {mask && <Mask className={classNames?.mask} aria-hidden />}
      <div aria-hidden className={wrapCssClass} onClick={onMaskClick}>
        <Dialog
          aria-modal
          buttons={buttons}
          className={cssClass}
          classNames={classNames}
          footer={footer}
          ref={focusRootRef}
          role={role}
          {...props}
        />
      </div>
    </>
  );
}

Modal.defaults = defaults;

Modal.show = createShowFunction();
Modal.info = createShowFunction({ type: 'info' });
Modal.success = createShowFunction({ type: 'success' });
Modal.warning = createShowFunction({ type: 'warning' });
Modal.error = createShowFunction({ type: 'error' });

Modal.showCustom = <
  TResult extends Result,
  TComponent extends ComponentType<any> = ComponentType<any>,
  TProps extends ComponentProps<TComponent> = ComponentProps<TComponent>,
>(
  component: TComponent,
  props?: ComponentProps<TComponent> & ModalShowOptions,
): RdController<TProps, TResult> => {
  return Modal.show<TResult, TProps>({
    component,
    ...props,
  });
};

Modal.prompt = <TResult extends Result = ['ok' | 'close', string]>(
  props: PromptProps,
) => {
  return Modal.showCustom<TResult, typeof Prompt>(Prompt, {
    ...props,
    actionMode: 'okClose',
  });
};

Modal.getAll = () => dialogues.internal.state.getControllersByType('modal');

Modal.destroyAll = (action = 'destroyAll', result?: unknown) => {
  for (const item of dialogues.internal.state.getControllersByType('modal')) {
    item.destroy(action, result);
  }
};

function createShowFunction(overrides: ModalProps = {}) {
  return <
    TResult extends Result = Result,
    TProps extends ModalProps = ModalProps,
  >({
    actionMode = defaults.actionMode || 'simplified',
    closeOthers = defaults.closeOthers,
    ...props
  }: ModalProps & ModalShowOptions): RdController<TProps, TResult> => {
    const mergedProps = { ...overrides, ...props } as TProps;

    if (closeOthers) {
      dialogues.internal.state.getControllersByType('modal').forEach((item) => {
        item.destroy('closeOthers');
      });
    }

    const element = dialogues.internal.state.add<TProps, TResult>({
      actionMode,
      component: props.component || Modal,
      props: mergedProps,
      controllerType: 'modal',
    });

    dialogues.internal.ensurePortalRendered();

    return element;
  };
}

function useFocusLock() {
  const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null);
  const disabledElementsRef = useRef<Element[]>([]);

  useEffect(() => {
    if (!rootEl || typeof window === 'undefined') {
      return undefined;
    }

    disabledElementsRef.current = Array.from(
      document.querySelectorAll('body > *'),
    ).filter((el) => !el.contains(rootEl));

    disabledElementsRef.current.forEach((el) => el.setAttribute('inert', ''));

    return () =>
      disabledElementsRef.current.forEach((el) => el.removeAttribute('inert'));
  }, [rootEl]);

  return setRootEl;
}

function useScrollLock() {
  const oldOverflowRef = useRef<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    oldOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = oldOverflowRef.current;
    };
  }, []);
}

function useKey(onPress: (key: 'enter' | 'esc') => void) {
  useEffect(() => {
    const map = {
      Enter: 'enter',
      Escape: 'esc',
    } as Record<string, 'enter' | 'esc'>;

    function onKeyDown(e: KeyboardEvent) {
      if (map[e.key]) {
        onPress(e.key as 'enter' | 'esc');
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onPress]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ModalProps<P = any> extends DialogProps<P> {
  centered?: boolean;
  classNames?: Partial<Record<ModalSlots, string>>;
  closeOthers?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  size?: ModalSize;
}

export type ModalSlots = DialogSlots | 'mask' | 'wrap';

export type ModalSize = 'normal' | 'large' | 'full';

export interface ModalShowOptions {
  actionMode?: ActionMode;
  closeOthers?: boolean;
}

export function Prompt({
  buttons = ['Cancel', <OkButton autoFocus={false} />],
  classNames,
  label,
  placeholder,
  value = '',
  ...props
}: PromptProps) {
  const item = useRdController();
  const [inputValue, setInputValue] = useState(value);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => item.setResult(value), [value]);

  function onType(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setInputValue(text);
    item.setResult(text);
  }

  return (
    <Modal {...props} buttons={buttons}>
      <TextField
        autoFocus
        classNames={classNames}
        label={label}
        placeholder={placeholder}
        value={inputValue}
        onChange={onType}
      />
    </Modal>
  );
}

export interface PromptProps extends ModalProps {
  classNames?: Partial<Record<ModalSlots | TextFieldSlots, string>>;
  label?: string;
  placeholder?: string;
  value?: string;
}
