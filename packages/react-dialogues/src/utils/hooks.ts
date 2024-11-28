import { type RefObject, useEffect } from 'react';

export function useKey<T = string>(
  onPress: (key: T) => void,
  allowedKeys?: readonly T[],
) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const keyName = `key${e.key}` as T;
      if (!allowedKeys || allowedKeys.includes(keyName)) {
        onPress(keyName);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [allowedKeys, onPress]);
}

export function useClickOutside(
  onClickOutside: () => void,
  ref: RefObject<HTMLElement>,
) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        onClickOutside();
      }
    }

    setTimeout(() => document.addEventListener('click', onClick));
    return () => document.removeEventListener('click', onClick);
  }, [onClickOutside, ref]);
}
