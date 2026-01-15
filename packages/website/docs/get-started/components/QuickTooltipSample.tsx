import { Button, Tooltip } from 'react-dialogues';

export function QuickTooltipSample() {
  return (
    <Tooltip content="Helpful information appears here">
      <Button>Hover me</Button>
    </Tooltip>
  );
}
