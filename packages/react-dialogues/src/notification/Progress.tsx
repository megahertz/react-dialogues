import { CSSProperties, HTMLAttributes } from 'react';
import { cls } from '../utils/string';

export function Progress({
  className,
  duration,
  paused,
  style,
  ...props
}: ProgressProps) {
  // console.log('render', { className, duration, style, props });
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
