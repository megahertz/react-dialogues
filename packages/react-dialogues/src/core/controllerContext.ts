import { createContext, useContext } from 'react';
import type { RdController } from './RdState';

export const ControllerContext = createContext<RdController>(
  undefined as unknown as RdController,
);

export function useRdController(): RdController {
  return useContext(ControllerContext);
}
