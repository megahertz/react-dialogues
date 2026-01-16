import { Button, Modal } from 'react-dialogues';

export function ModalWithButtonsSample() {
  return (
    <Button
      onClick={() => {
        Modal.show({
          title: 'Confirm Action',
          content: 'Are you sure you want to proceed with this action?',
          buttons: [
            'Cancel',
            { content: 'OK', color: 'success' },
            <Button>Help</Button>,
          ],
        });
      }}
    >
      Show Confirm Modal
    </Button>
  );
}
