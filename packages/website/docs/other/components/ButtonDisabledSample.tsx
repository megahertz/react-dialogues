import { Button, Footer } from 'react-dialogues';

export function ButtonDisabledSample() {
  return (
    <Footer align="left">
      <Button disabled>Primary</Button>
      <Button disabled type="secondary">Secondary</Button>
      <Button disabled type="text">Text</Button>
    </Footer>
  );
}
