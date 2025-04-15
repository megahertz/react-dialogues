import { isValidElement, type ReactNode } from 'react';
import type { DialogProps } from '../dialog/Dialog';

export function separateContentAndProps<T extends DialogProps>(
  varContent: T | ReactNode,
  varProps: Partial<T> = {},
): T {
  if (typeof varContent !== 'object' || isValidElement(varContent)) {
    return { ...varProps, content: varContent } as T;
  }

  return { ...(varContent as T), ...varProps } as T;
}

export function renderContent(content: ReactNode): ReactNode {
  if (Array.isArray(content)) {
    return content.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={index}>{item}</div>
    ));
  }

  return content;
}
