import { Button, Footer } from 'react-dialogues';

export function ButtonColorsSample() {
  return (
    <Footer align="left">
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
      <Button color="#b2c">Custom</Button>
    </Footer>
  );
}
