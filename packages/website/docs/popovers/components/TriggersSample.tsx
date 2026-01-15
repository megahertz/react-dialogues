import { Button, Footer, Tooltip } from 'react-dialogues';

export function TriggersSample() {
  return (
    <Footer align="left">
      <Tooltip content="Hover or focus to show" triggers={['hover', 'focus']}>
        <Button>Hover/Focus</Button>
      </Tooltip>
      <Tooltip
        content="Click to show"
        triggers={['click']}
        closeTriggers={['clickOutside', 'keyEscape']}
      >
        <Button>Click</Button>
      </Tooltip>
    </Footer>
  );
}
