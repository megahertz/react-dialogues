import { Button, Footer } from 'react-dialogues';

export function FooterSample() {
  return (
    <>
      <Footer align="left">
        <Button type="secondary">Left</Button>
        <Button type="secondary">Aligned</Button>
      </Footer>
      <Footer align="center">
        <Button type="secondary">Center</Button>
        <Button type="secondary">Aligned</Button>
      </Footer>
      <Footer>
        <Button type="secondary">Right</Button>
        <Button type="secondary">Aligned (default)</Button>
      </Footer>
    </>
  );
}
