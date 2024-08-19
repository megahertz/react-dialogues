import { HTMLAttributes } from 'react';
import { cls } from '../utils/string';

export function Footer({ align, className, ...props }: FooterProps) {
  const classNames = cls('am-footer', className, align && `am-${align}`);
  return <div className={classNames} {...props} />;
}

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right';
}
