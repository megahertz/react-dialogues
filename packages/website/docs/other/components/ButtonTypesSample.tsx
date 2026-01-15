import { Button, Footer } from 'react-dialogues';

export function ButtonTypesSample() {
  return (
    <Footer align="left">
      <Button>Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="text">Text</Button>
      <Button icon="🗑">With Icon</Button>
    </Footer>
  );
}
