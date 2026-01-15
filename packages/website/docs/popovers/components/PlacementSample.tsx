import { Button, Footer, Tooltip } from 'react-dialogues';

export function PlacementSample() {
  return (
    <Footer align="left">
      <Tooltip content="Top" placement="top">
        <Button type="secondary">top</Button>
      </Tooltip>
      <Tooltip content="Right" placement="right">
        <Button type="secondary">right</Button>
      </Tooltip>
      <Tooltip content="Bottom" placement="bottom">
        <Button type="secondary">bottom</Button>
      </Tooltip>
      <Tooltip content="Left" placement="left">
        <Button type="secondary">left</Button>
      </Tooltip>
    </Footer>
  );
}
