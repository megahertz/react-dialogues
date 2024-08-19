import { Button, type ButtonProps } from './Button';

export function CancelButton(props: ButtonProps) {
  return <Button {...props} value="cancel" />;
}
