import type { HTMLAttributes } from 'react';
import { cls } from '../utils/string';

/*
 * Based of https://github.com/adexin/spinners-react
 */

export function Spinner({
  className,
  color = 'currentColor',
  bgColor = 'rgba(0, 0, 0, 0.2)',
  size,
  speed,
  thickness = 4,
}: SpinnerProps) {
  const cssClass = cls('rd-spinner', className);

  return (
    <svg
      className={cssClass}
      fill="none"
      viewBox="0 0 66 66"
      style={{ width: size }}
    >
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke={bgColor}
        strokeWidth={thickness}
      />
      <circle
        cx="33"
        cy="33"
        className="rd-spinner-fg"
        fill="none"
        r="28"
        stroke={color}
        strokeDasharray="40, 134"
        strokeDashoffset="325"
        strokeLinecap="round"
        strokeWidth={thickness}
        style={{ animationDuration: speed }}
      />
    </svg>
  );
}

export interface SpinnerProps extends HTMLAttributes<HTMLOrSVGElement> {
  color?: string;
  bgColor?: string;
  size?: string | number;
  speed?: string;
  thickness?: number;
}
