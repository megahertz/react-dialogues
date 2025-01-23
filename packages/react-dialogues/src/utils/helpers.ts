import { isValidElement, ReactNode } from 'react';
import { DialogProps } from '../dialog/Dialog';

export function separateContentAndProps<T extends DialogProps>(
  varContent: T | ReactNode,
  varProps: Partial<T> = {},
): T {
  if (typeof varContent !== 'object' || isValidElement(varContent)) {
    return { ...varProps, content: varContent } as T;
  }

  return { ...(varContent as T), ...varProps } as T;
}
