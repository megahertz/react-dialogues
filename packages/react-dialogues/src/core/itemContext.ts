import { createContext, useContext } from 'react';
import { RdItem } from './RdState';

export const ItemContext = createContext<RdItem>(
  undefined as unknown as RdItem,
);

export function useUiItem(): RdItem {
  return useContext(ItemContext);
}
