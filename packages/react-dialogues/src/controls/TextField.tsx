import type { InputHTMLAttributes } from 'react';
import { cls } from '../utils/string';

export function TextField({ className, label, ...props }: TextFieldProps) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="rd-textfield">
      {Boolean(label) && <div className="rd-label">{label}</div>}
      <input className={cls('rd-input', className)} {...props} />
    </label>
  );
}

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
