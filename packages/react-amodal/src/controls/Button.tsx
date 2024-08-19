import { HTMLAttributes, MouseEvent, useState } from 'react';
import './styles.css';
import { useUiItem } from '../core/itemContext';
import { cls } from '../utils/string';

export function Button({
  className,
  loading,
  onClick,
  type,
  value,
  ...props
}: ButtonProps) {
  const item = useUiItem();
  const [isLoading, setIsLoading] = useState(loading);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      try {
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
      } catch (error) {
        setError(error);
      }

      return;
    }

    setResult(value || 'ok');
  }

  function setResult(result: unknown) {
    item?.close(result);
  }

  function setError(error: unknown) {
    console.log(error);
  }

  const cssClasses = cls(
    'am-button',
    className,
    isLoading && 'loading',
    type && type !== 'primary' && `am-btn-${type}`,
  );

  return (
    <button
      className={cssClasses}
      onClick={handleClick}
      type="button"
      {...(props as object)}
    />
  );
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
  type?: 'primary' | 'secondary' | 'text';
  value?: unknown;
}
