import { Button, Modal } from 'react-dialogues';

export function QuickModalSample() {
  return (
    <Button
      onClick={() => {
        Modal.show('Welcome to react-dialogues!', { title: 'Hello' });
      }}
    >
      Show Modal
    </Button>
  );
}
