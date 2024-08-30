import { HTMLAttributes } from 'react';
import { useUiItem } from '../core/itemContext';

export function DialogCloseButton({
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const ui = useUiItem();

  return (
    <button
      aria-label="Close"
      className="rd-dialog-close"
      onClick={() => ui.destroy('close')}
      type="button"
      {...(props as object)}
    >
      🞨
    </button>
  );
}
