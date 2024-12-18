import type { CSSProperties, HTMLAttributes } from 'react';
import { cls } from '../utils/string';

export function Progress({
  className,
  duration,
  paused,
  style,
  ...props
}: ProgressProps) {
  const classNames = cls('rd-notification-progress', className);
  const styles: CSSProperties = {
    ...style,
    animationDuration: `${duration}ms`,
    animationPlayState: paused ? 'paused' : 'running',
  };
  return <div className={classNames} style={styles} {...props} />;
}

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  duration: number;
  paused?: boolean;
}
