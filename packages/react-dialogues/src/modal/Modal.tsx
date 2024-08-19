import { amodal } from '../core/amodal';
import type { AmItem } from '../core/AmodalState';
import { Dialog, type DialogProps } from '../dialog/Dialog';
import './styles.css';

export function Modal({ className = '', ...props }: DialogProps) {
  return <Dialog className={`am-modal ${className}`} {...props} />;
}

Modal.show = <TResult = any,>(
  props: DialogProps,
): AmItem<DialogProps, TResult> => {
  const element = amodal.internal.state.add<DialogProps, TResult>({
    type: 'modal',
    props,
    component: Modal,
  });

  amodal.internal.ensurePortalRendered();

  return element;
};
