import { Button, Footer, Tooltip } from 'react-dialogues';

export function ColorSample() {
  return (
    <Footer align="left">
      <Tooltip content="Default color">
        <Button color="gray">Default</Button>
      </Tooltip>
      <Tooltip content="Green tooltip" color="#22c55e">
        <Button color="#22c55e">Green</Button>
      </Tooltip>
      <Tooltip content="Blue tooltip" color="#3b82f6">
        <Button color="#3b82f6">Blue</Button>
      </Tooltip>
      <Tooltip content="Red tooltip" color="#ef4444">
        <Button color="#ef4444">Red</Button>
      </Tooltip>
    </Footer>
  );
}
