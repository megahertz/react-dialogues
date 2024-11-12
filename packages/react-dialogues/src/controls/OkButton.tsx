import { useState } from 'react';
import { Button, type ButtonProps } from './Button';

export function OkButton({
  autoFocus = true,
  children = 'OK',
  ...props
}: ButtonProps) {
  const [alreadyFocused, setAlreadyFocused] = useState(false);

  return (
    <Button
      {...props}
      ref={(el) => {
        if (el && autoFocus && !alreadyFocused) {
          el.focus({ preventScroll: true });
          setAlreadyFocused(true);
        }
      }}
      value="ok"
    >
      {children}
    </Button>
  );
}
