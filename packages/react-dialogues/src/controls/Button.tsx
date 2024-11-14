import {
  type ForwardedRef,
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  useState,
} from 'react';
import { useRdController } from '../core/controllerContext';
import { cls } from '../utils/string';

export const Button = forwardRef(function Button(
  { className, loading, onClick, type, value, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const controller = useRdController();
  const [isLoading, setIsLoading] = useState(loading);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      try {
        // noinspection JSVoidFunctionReturnValueUsed
        const result = onClick(e) as unknown;
        if (
          result &&
          typeof result === 'object' &&
          'then' in result &&
          typeof result.then === 'function'
        ) {
          setIsLoading(true);
          Promise.resolve(result)
            .then((res) => {
              if (res !== undefined) {
                setResult(res);
              }
              setIsLoading(false);
            })
            .catch((promiseError) => {
              setIsLoading(false);
              setError(promiseError);
            });
        }

        if (result !== undefined) {
          setResult(result);
        }
      } catch (error) {
        setError(error);
      }

      return;
    }

    e.stopPropagation();

    setResult();
  }

  function setResult(result?: unknown) {
    controller?.destroy(value || 'button', result);
  }

  function setError(error: unknown) {
    // TODO: Better error handling
    // eslint-disable-next-line no-console
    console.error('Error in button handler', error);
  }

  const cssClasses = cls(
    'rd-btn',
    className,
    isLoading && 'loading',
    type && type !== 'primary' && `rd-btn-${type}`,
  );

  return (
    <button
      className={cssClasses}
      onClick={handleClick}
      ref={ref}
      type="button"
      {...(props as object)}
    />
  );
});

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
  type?: 'primary' | 'secondary' | 'text';
  value?: string;
}
