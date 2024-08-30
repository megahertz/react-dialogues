import { MouseEvent } from 'react';
import { ItemContext } from '../core/itemContext';
import { RdItem } from '../core/RdState';

export function ModalContainer({ items }: { items: RdItem[] }) {
  return (
    <div className="rd-modal-container">
      {items.map((item) => {
        const { id, component: Component, props } = item;
        return (
          <ItemContext.Provider key={id} value={item}>
            <Component {...props} />
          </ItemContext.Provider>
        );
      })}
    </div>
  );
}
