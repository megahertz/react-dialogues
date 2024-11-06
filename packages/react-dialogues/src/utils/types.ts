import type { ElementType, ForwardRefExoticComponent } from 'react';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export type ThemeName = 'light' | 'dark' | 'auto' | 'none';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyComponentType<P = any> =
  | ElementType<P>
  | ForwardRefExoticComponent<P>;
