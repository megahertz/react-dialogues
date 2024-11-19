import {
  type ForwardedRef,
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  useState,
} from 'react';
import { useRdController } from '../core/controllerContext';
import { cls } from '../utils/string';
import { Spinner } from './Spinner';

export const Button = forwardRef(function Button(
  { children, className, loading, onClick, type, value, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const controller = useRdController();
  const [loadingState, setLoadingState] = useState(Boolean(loading));
  const isLoading = loading === undefined ? loadingState : loading;

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
          setLoadingState(true);
          Promise.resolve(result)
            .then((res) => {
              if (res !== undefined) {
                setResult(res);
              }
              setLoadingState(false);
            })
            .catch((promiseError) => {
              setLoadingState(false);
              setError(promiseError);
            });
        } else if (result !== undefined) {
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
    isLoading && 'rd-btn-loading',
    type && type !== 'primary' && `rd-btn-${type}`,
  );

  return (
    <button
      className={cssClasses}
      onClick={handleClick}
      ref={ref}
      type="button"
      {...(props as object)}
    >
      {isLoading && <Spinner bgColor="none" />}
      {children}
    </button>
  );
});

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
  type?: 'primary' | 'secondary' | 'text';
  value?: string;
}
