import { Button, type ButtonProps } from './Button';

export function CancelButton({ children = 'Cancel', ...props }: ButtonProps) {
  return (
    <Button {...props} value="cancel">
      {children}
    </Button>
  );
}
