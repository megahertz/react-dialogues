import { Button, Modal } from 'react-dialogues';

export function BasicModalSample() {
  return (
    <Button
      onClick={() => {
        Modal.show('Hello! This is a basic modal with simple text content.', {
          title: 'Basic Modal',
        });
      }}
    >
      Show Basic Modal
    </Button>
  );
}
