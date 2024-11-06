import { Button, type ButtonProps } from './Button';

export function CancelButton({
  children = 'Cancel',
  type = 'secondary',
  ...props
}: ButtonProps) {
  return (
    <Button {...props} type={type} value="cancel">
      {children}
    </Button>
  );
}
