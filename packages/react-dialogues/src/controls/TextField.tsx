import type { InputHTMLAttributes } from 'react';
import { cls } from '../utils/string';

export function TextField({
  className,
  classNames,
  label,
  ...props
}: TextFieldProps) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={cls('rd-textfield', classNames?.field)}>
      {Boolean(label) && (
        <div className={cls('rd-label', classNames?.label)}>{label}</div>
      )}
      <input
        className={cls('rd-input', classNames?.input, className)}
        {...props}
      />
    </label>
  );
}

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  classNames?: Partial<Record<TextFieldSlots, string>>;
  label?: string;
}

export type TextFieldSlots = 'field' | 'input' | 'label';
