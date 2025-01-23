/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  type ComponentProps,
  type ComponentType,
  type MouseEvent,
  ReactNode,
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
import { separateContentAndProps } from '../utils/helpers';
import { useKey } from '../utils/hooks';
import { cls } from '../utils/string';
import { Result } from '../utils/types';

const Mask = createDivComponent('mask');

const defaults: ModalProps = {
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
  useKey((key) => item?.destroy(key), ['keyEnter', 'keyEscape']);

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
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={wrapCssClass} onClick={onMaskClick}>
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
    actionMode: 'okClose',
    ...props,
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
  >(
    varContent: ModalInitOptions | ReactNode,
    varProps: Partial<ModalInitOptions> = {},
  ): RdController<TProps, TResult> => {
    const { closeOthers, ...props } = {
      ...overrides,
      ...separateContentAndProps(varContent, varProps),
    };

    if (closeOthers) {
      dialogues.internal.state.getControllersByType('modal').forEach((item) => {
        item.destroy('closeOthers');
      });
    }

    const controller = dialogues.internal.state.add<TProps, TResult>({
      component: props.component || Modal,
      props: { ...overrides, ...props } as TProps,
      controllerType: 'modal',
    });

    dialogues.internal.ensurePortalRendered();

    return controller;
  };
}

function useFocusLock() {
  const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null);
  const disabledElementsRef = useRef<Element[]>([]);

  useEffect(() => {
    if (!rootEl || typeof window === 'undefined') {
      return undefined;
    }

    disabledElementsRef.current = [
      ...Array.from(document.querySelectorAll('body > *')),
      ...Array.from(rootEl.parentNode?.parentNode?.children || []),
    ].filter((el) => !el.contains(rootEl));

    disabledElementsRef.current.forEach((el) => el.setAttribute('inert', ''));

    return () =>
      disabledElementsRef.current.forEach((el) => el.removeAttribute('inert'));
  }, [rootEl]);

  return setRootEl;
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

export interface ModalShowOptions {
  actionMode?: ActionMode;
  closeOthers?: boolean;
}

export interface ModalInitOptions<P = any>
  extends ModalProps<P>,
    ModalShowOptions {}

export type ModalSlots = DialogSlots | 'mask' | 'wrap';

export type ModalSize = 'normal' | 'large' | 'full';

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
