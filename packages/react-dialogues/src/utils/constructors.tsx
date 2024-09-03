import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';
import { cls } from './string';

export function createDivComponent(name: string) {
  const Div = forwardRef(
    (
      { className, ...props }: HTMLAttributes<HTMLDivElement>,
      ref: ForwardedRef<HTMLDivElement>,
    ) => {
      return (
        <div
          className={cls(`rd-${name}`, className)}
          ref={ref}
          {...(props as object)}
        />
      );
    },
  );

  Div.displayName = name[0].toUpperCase() + name.slice(1);
  return Div;
}
