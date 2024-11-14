import type { HTMLAttributes } from 'react';
import { useRdController } from '../core/controllerContext';

export function DialogCloseButton({ ...props }: DialogCloseButtonProps) {
  const item = useRdController();

  return (
    <button
      aria-label="Close"
      className="rd-dialog-close"
      onClick={() => item?.destroy('close')}
      type="button"
      {...(props as object)}
    >
      🞨
    </button>
  );
}

export interface DialogCloseButtonProps
  extends HTMLAttributes<HTMLButtonElement> {}
