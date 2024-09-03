import { ItemContext } from '../core/itemContext';
import type { RdItem } from '../core/RdState';

export function ModalContainer({ items }: { items: RdItem[] }) {
  return (
    <>
      {items.map((item) => {
        const { id, component: Component, props } = item;
        return (
          <ItemContext.Provider key={id} value={item}>
            <Component {...props} />
          </ItemContext.Provider>
        );
      })}
    </>
  );
}
