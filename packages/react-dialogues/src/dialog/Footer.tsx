import type { HTMLAttributes } from 'react';
import { cls } from '../utils/string';

export function Footer({ align, className, ...props }: FooterProps) {
  const classNames = cls('rd-footer', className, align && `rd-${align}`);
  return <div className={classNames} {...props} />;
}

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right';
}
