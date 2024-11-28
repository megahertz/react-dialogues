import { cls } from '../utils/string';
import { Popover, type PopoverProps } from './Popover';

const defaults = {
  triggers: ['focus', 'hover'],
  closeTriggers: ['blur', 'keyEscape', 'leave'],
} satisfies Partial<PopoverProps>;

export function Tooltip({ className, ...props }: TooltipProps) {
  const mergedProps = { ...defaults, ...props };

  return <Popover className={cls('rd-tooltip', className)} {...mergedProps} />;
}

Tooltip.defaults = defaults;

export interface TooltipProps extends PopoverProps {}
