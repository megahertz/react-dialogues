import { Button, Modal, OkButton, CancelButton } from 'react-dialogues';

export function ModalWithButtonsSample() {
  return (
    <Button
      onClick={() => {
        Modal.show({
          title: 'Confirm Action',
          content: 'Are you sure you want to proceed with this action?',
          buttons: [<CancelButton key="cancel" />, <OkButton key="ok" />],
        });
      }}
    >
      Show Confirm Modal
    </Button>
  );
}
