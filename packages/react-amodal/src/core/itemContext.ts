import { createContext, useContext } from 'react';
import { AmItem } from './AmodalState';

export const ItemContext = createContext<AmItem>(
  undefined as unknown as AmItem,
);

export function useUiItem(): AmItem {
  return useContext(ItemContext);
}
