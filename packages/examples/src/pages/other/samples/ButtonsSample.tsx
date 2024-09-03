import { Button, Footer } from 'react-dialogues';

export function ButtonsSample() {
  return (
    <>
      <h3>Button types</h3>
      <Footer align="left">
        <Button>Primary button</Button>
        <Button type="secondary">Secondary button</Button>
        <Button type="text">Text button</Button>
      </Footer>

      <h3>Disabled</h3>
      <Footer align="left">
        <Button disabled>Primary button</Button>
        <Button disabled type="secondary">
          Secondary button
        </Button>
        <Button disabled type="text">
          Text button
        </Button>
      </Footer>
    </>
  );
}
