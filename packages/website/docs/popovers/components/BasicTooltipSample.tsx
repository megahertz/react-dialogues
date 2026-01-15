import { Button, Footer, Tooltip } from 'react-dialogues';

export function BasicTooltipSample() {
  return (
    <Footer align="left">
      <Tooltip content="This is a helpful tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </Footer>
  );
}
