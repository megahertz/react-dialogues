import {
  type ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  type HTMLAttributes,
  type MouseEvent,
  RefAttributes,
  useState,
} from 'react';
import { useRdController } from '../core/controllerContext';
import { stringifyError } from '../utils/errors';
import { cls } from '../utils/string';
import { Spinner } from './Spinner';

export const Button = forwardRef(function ButtonComponent(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const mergedProps = { ...Button.defaults, ...props };

  const {
    children,
    className,
    loading,
    onClick,
    errorAction,
    onErrorHandler,
    type,
    value,
    ...rest
  } = mergedProps;

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
              onError(promiseError);
            });
        } else if (result !== undefined) {
          setResult(result);
        }
      } catch (error) {
        onError(error);
      }

      return;
    }

    e.stopPropagation();

    setResult();
  }

  function onError(error: unknown) {
    const message = stringifyError(error);
    onErrorHandler?.(error, message, mergedProps);
  }

  function setResult(result?: unknown) {
    controller?.destroy(value || 'button', result);
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
      {...(rest as object)}
    >
      {isLoading && <Spinner bgColor="none" />}
      {children}
    </button>
  );
}) as ForwardRefExoticComponent<
  ButtonProps & RefAttributes<HTMLButtonElement>
> & { defaults: ButtonProps };

Button.defaults = {} as ButtonProps;

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  errorAction?: ButtonErrorAction;
  loading?: boolean;
  onErrorHandler?(error: unknown, message: string, props: ButtonProps): void;
  type?: 'primary' | 'secondary' | 'text';
  value?: string;
}

export type ButtonErrorAction = 'notification' | 'console' | 'none';
