import { HTMLAttributes } from 'react';
import { cls } from './string';

export function createDivComponent(name: string) {
  Div.displayName = name[0].toUpperCase() + name.slice(1);
  return Div;

  function Div({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
      <div className={cls(`am-${name}`, className)} {...(props as object)} />
    );
  }
}
