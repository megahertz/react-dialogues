import { Button, type ButtonProps } from './Button';

export function OkButton({ children = 'OK', ...props }: ButtonProps) {
  return (
    <Button
      ref={(el) => el?.focus({ preventScroll: true })}
      {...props}
      value="ok"
    >
      {children}
    </Button>
  );
}
