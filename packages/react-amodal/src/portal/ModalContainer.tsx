import { MouseEvent } from 'react';
import { ItemContext } from '../core/itemContext';
import { AmItem } from '../core/AmodalState';

export default function ModalContainer({ items }: { items: AmItem[] }) {
  return (
    <div className="am-modal-container">
      {items.map((item) => {
        const { id, component: Component, props } = item;
        function onClick(e: MouseEvent<HTMLDivElement>) {
          if (
            (e.target as HTMLDivElement)?.classList.contains('am-modal-wrapper')
          ) {
            item.close('close');
          }
        }
        return (
          <ItemContext.Provider value={item}>
            <div key={id} className="am-modal-wrapper" onClick={onClick}>
              <Component {...props} />
            </div>
          </ItemContext.Provider>
        );
      })}
    </div>
  );
}
