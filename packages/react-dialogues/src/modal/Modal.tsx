/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  type ComponentProps,
  type ComponentType,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '../controls/Button';
import { CancelButton } from '../controls/CancelButton';
import { OkButton } from '../controls/OkButton';
import { TextField } from '../controls/TextField';
import { dialogues } from '../core/dialogues';
import { useUiItem } from '../core/itemContext';
import type { RdItem } from '../core/RdState';
import { Dialog, type DialogProps } from '../dialog/Dialog';
import { createDivComponent } from '../utils/constructors';
import { cls } from '../utils/string';

const Mask = createDivComponent('mask');

const defaults: ModalProps = {
  buttons: [<OkButton />],
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
  closeOthers,
  buttons = defaults.buttons,
  footer,
  mask = defaults.mask,
  maskClosable = defaults.maskClosable,
  role = defaults.role,
  size = defaults.size,
  ...props
}: ModalProps) {
  const item = useUiItem();
  const focusRootRef = useFocusLock();
  useScrollLock();
  useEsc(() => item?.destroy('close'));

  function onWrapClick(e: MouseEvent<HTMLDivElement>) {
    if (
      maskClosable &&
      (e.target as HTMLDivElement)?.classList.contains('rd-modal-wrapper')
    ) {
      item.destroy('close');
    }
  }

  const cssClass = cls('rd-modal', size && `rd-${size}`, className);
  const wrapCssClass = cls('rd-modal-wrapper', centered && 'rd-centered');
  return (
    <>
      {mask && <Mask aria-hidden />}
      <div aria-hidden className={wrapCssClass} onClick={onWrapClick}>
        <Dialog
          aria-modal
          buttons={buttons}
          className={cssClass}
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
  TResult,
  TComponent extends ComponentType<any> = ComponentType<any>,
  TProps extends ComponentProps<TComponent> = ComponentProps<TComponent>,
>(
  component: TComponent,
  props?: ComponentProps<TComponent> & ModalShowOptions,
): RdItem<TProps, TResult> => {
  return Modal.show<TResult, TProps>({
    component,
    ...props,
  });
};

Modal.prompt = (props: PromptProps) => {
  return Modal.showCustom(Prompt, props);
};

Modal.destroyAll = (result?: unknown) => {
  for (const item of dialogues.internal.state.getItemsByType('modal')) {
    item.destroy(result);
  }
};

function createShowFunction(overrides: ModalProps = {}) {
  return <TResult = any, TProps extends ModalProps = ModalProps>({
    closeOthers = defaults.closeOthers,
    ...props
  }: ModalProps & ModalShowOptions): RdItem<TProps, TResult> => {
    const mergedProps = { ...overrides, ...props } as TProps;

    if (closeOthers) {
      dialogues.internal.state.getItemsByType('modal').forEach((item) => {
        item.destroy('close');
      });
    }

    const element = dialogues.internal.state.add<TProps, TResult>({
      component: props.component || Modal,
      props: mergedProps,
      itemType: 'modal',
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

function useEsc(onPress: () => void) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onPress();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onPress]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ModalProps<P = any> extends DialogProps<P> {
  fullscreen?: boolean;
  centered?: boolean;
  closeOthers?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  size?: ModalSize;
}

export type ModalSize = 'normal' | 'large' | 'full';

export interface ModalShowOptions {
  closeOthers?: boolean;
}

export function Prompt({
  buttons,
  label,
  placeholder,
  value,
  ...props
}: PromptProps) {
  const item = useUiItem();
  const [inputValue, setInputValue] = useState(value);

  function onSubmit() {
    item.destroy(inputValue);
  }

  const actualButtons = buttons || [
    <CancelButton />,
    <Button onClick={onSubmit}>OK</Button>,
  ];

  return (
    <Modal {...props} buttons={actualButtons}>
      <form onSubmit={onSubmit}>
        <TextField
          autoFocus
          label={label}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </Modal>
  );
}

export interface PromptProps extends ModalProps {
  label?: string;
  placeholder?: string;
  value?: string;
}
