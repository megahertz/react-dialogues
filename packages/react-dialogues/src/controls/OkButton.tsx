import { Button, type ButtonProps } from './Button';

export function OkButton(props: ButtonProps) {
  return <Button {...props} value="ok" />;
}
